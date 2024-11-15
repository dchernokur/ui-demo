import {
	AccountId,
	Client,
	ContractExecuteTransaction,
	type ContractId,
	LedgerId,
	PrivateKey,
	TokenAssociateTransaction,
	TokenCreateTransaction,
	TokenId,
	TokenInfoQuery,
	TokenMintTransaction,
	TokenType,
	TokenUpdateNftsTransaction,
	type TopicId,
	TopicMessageSubmitTransaction,
	TransactionId,
	TransferTransaction,
} from "@hashgraph/sdk";
import type { SignClientTypes } from "@walletconnect/types";
import {
	DAppConnector,
	HederaChainId,
	HederaJsonRpcMethod,
	HederaSessionEvent,
} from "@hashgraph/hedera-wallet-connect";
import EventEmitter from "events";
import type { WalletInterface } from "@/services/wallets/WalletInterface";
import { useCallback, useContext, useEffect } from "react";
import { WalletConnectContext } from "@/context/WalletConnectContext";
import type { ContractFunctionParameterBuilder } from "@/services/wallets/contractFunctionParameterBuilder";
import { appConfig } from "@/consts/config";

// Created refreshEvent because `dappConnector.walletConnectClient.on(eventName, syncWithWalletConnectContext)` would not call syncWithWalletConnectContext
// Reference usage from walletconnect implementation https://github.com/hashgraph/hedera-wallet-connect/blob/main/src/lib/dapp/index.ts#L120C1-L124C9
const refreshEvent = new EventEmitter();

// Create a new project in walletconnect cloud to generate a project id
const walletConnectProjectId =
	process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
const hederaNetwork = appConfig.currentNetwork.network;
const hederaClient = Client.forName(hederaNetwork);

const metadata: SignClientTypes.Metadata = {
	name: "RWA Demo UI",
	description: "RWA Demo UI",
	url: "http://localhost:3000/",
	icons: ["http://localhost:3000/logo192.png"],
};

const dappConnector = new DAppConnector(
	metadata,
	LedgerId.fromString(hederaNetwork),
	walletConnectProjectId,
	Object.values(HederaJsonRpcMethod),
	[HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
	[HederaChainId.Testnet],
);

// ensure walletconnect is initialized only once
let walletConnectInitPromise: Promise<void> | undefined = undefined;
const initializeWalletConnect = async () => {
	if (walletConnectInitPromise === undefined) {
		walletConnectInitPromise = dappConnector.init();
	}
	await walletConnectInitPromise;
};

export const openWalletConnectModal = async () => {
	await initializeWalletConnect();
	await dappConnector.openModal().then((x) => {
		refreshEvent.emit("sync");
	});
};

class WalletConnectWallet implements WalletInterface {
	private getSigner() {
		if (dappConnector.signers.length === 0) {
			throw new Error("No signers found!");
		}
		return dappConnector.signers[0];
	}

	private getAccountId() {
		// Need to convert from walletconnect's AccountId to hashgraph/sdk's AccountId
		// because walletconnect's AccountId and hashgraph/sdk's AccountId are not the same!
		return AccountId.fromString(this.getSigner().getAccountId().toString());
	}

	async transferHBAR(toAddress: AccountId, amount: number) {
		const transferHBARTransaction = new TransferTransaction()
			.addHbarTransfer(this.getAccountId(), -amount)
			.addHbarTransfer(toAddress, amount);

		const signer = this.getSigner();
		await transferHBARTransaction.freezeWithSigner(signer);
		const txResult = await transferHBARTransaction.executeWithSigner(signer);
		return txResult ? txResult.transactionId : null;
	}

	async transferFungibleToken(
		toAddress: AccountId,
		tokenId: TokenId,
		amount: number,
	) {
		const transferTokenTransaction = new TransferTransaction()
			.addTokenTransfer(tokenId, this.getAccountId(), -amount)
			.addTokenTransfer(tokenId, toAddress.toString(), amount);

		const signer = this.getSigner();
		await transferTokenTransaction.freezeWithSigner(signer);
		const txResult = await transferTokenTransaction.executeWithSigner(signer);

		return txResult ? txResult.transactionId : null;
	}

	async transferNonFungibleToken(
		toAddress: AccountId,
		tokenId: TokenId,
		serialNumber: number,
	) {
		const transferTokenTransaction = new TransferTransaction().addNftTransfer(
			tokenId,
			serialNumber,
			this.getAccountId(),
			toAddress,
		);

		const signer = this.getSigner();
		await transferTokenTransaction.freezeWithSigner(signer);
		const txResult = await transferTokenTransaction.executeWithSigner(signer);

		return txResult ? txResult.transactionId : null;
	}

	async associateToken(tokenId: TokenId) {
		const associateTokenTransaction = new TokenAssociateTransaction()
			.setAccountId(this.getAccountId())
			.setTokenIds([tokenId]);

		const signer = this.getSigner();
		await associateTokenTransaction.freezeWithSigner(signer);
		const txResult = await associateTokenTransaction.executeWithSigner(signer);
		console.log(`Associated user with token ${tokenId}`);

		return txResult ? txResult.transactionId : null;
	}

	async sendMessage(topicId: TopicId, message: string) {
		const topicMessageTransaction = new TopicMessageSubmitTransaction()
			.setTopicId(topicId)
			.setMessage(message);

		const signer = this.getSigner();
		await topicMessageTransaction.freezeWithSigner(signer);
		const txResult = await topicMessageTransaction.executeWithSigner(signer);
		return txResult ? txResult.transactionId : null;
	}

	async fetchTokenInfo(tokenId: string) {
		const tokenInfoQuery = new TokenInfoQuery().setTokenId(
			TokenId.fromString(tokenId),
		);

		const signer = this.getSigner();
		const txResult = await tokenInfoQuery.executeWithSigner(signer);

		if (txResult?.metadata) {
			const decodedMetadata = new TextDecoder().decode(txResult.metadata);
			console.log(decodedMetadata);
			return decodedMetadata;
		} else {
			console.log("No metadata available for this token.");
			return null;
		}
	}

	//
	// Purpose: build contract execute transaction and send to wallet for signing and execution
	// Returns: Promise<TransactionId | null>
	async executeContractFunction(
		contractId: ContractId,
		functionName: string,
		functionParameters: ContractFunctionParameterBuilder,
		gasLimit: number,
	) {
		const tx = new ContractExecuteTransaction()
			.setContractId(contractId)
			.setGas(gasLimit)
			.setFunction(functionName, functionParameters.buildHAPIParams());

		const signer = this.getSigner();
		await tx.freezeWithSigner(signer);
		const txResult = await tx.executeWithSigner(signer);

		// in order to read the contract call results, you will need to query the contract call's results form a mirror node using the transaction id
		// after getting the contract call results, use ethers and abi.decode to decode the call_result
		return txResult ? txResult.transactionId : null;
	}
	disconnect() {
		dappConnector.disconnectAll().then(() => {
			refreshEvent.emit("sync");
		});
	}
}
export const walletConnectWallet = new WalletConnectWallet();

// this component will sync the walletconnect state with the context
export const WalletConnectClient = () => {
	// use the HashpackContext to keep track of the hashpack account and connection
	const { setAccountId, setIsConnected } = useContext(WalletConnectContext);

	// sync the walletconnect state with the context
	const syncWithWalletConnectContext = useCallback(() => {
		const accountId = dappConnector.signers[0]?.getAccountId()?.toString();
		if (accountId) {
			setAccountId(accountId);
			setIsConnected(true);
		} else {
			setAccountId("");
			setIsConnected(false);
		}
	}, [setAccountId, setIsConnected]);

	useEffect(() => {
		// Sync after walletconnect finishes initializing
		refreshEvent.addListener("sync", syncWithWalletConnectContext);

		initializeWalletConnect().then(() => {
			syncWithWalletConnectContext();
		});

		return () => {
			refreshEvent.removeListener("sync", syncWithWalletConnectContext);
		};
	}, [syncWithWalletConnectContext]);
	return null;
};
