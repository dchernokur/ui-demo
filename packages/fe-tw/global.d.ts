import { providers } from "ethers";
declare global {
	interface Window {
		ethereum?: EthereumProvider;
	}
}

interface EthereumProvider extends providers.ExternalProvider {
	// _state: {
	//     accounts: string[]
	// }
	on(
		event: "close" | "accountsChanged" | "chainChanged" | "networkChanged",
		callback: (payload: any) => void,
	): void;
	// once(event: 'close' | 'accountsChanged' | 'chainChanged' | 'networkChanged', callback: (payload: any) => void): void
	removeAllListeners(): void;
	// sendAsync: AbstractProvider['sendAsync']
}
