export type Proposal = {
	id: number,
	title: string;
	description: string;
	started: Date;
	expiry: Date;
	votesYes: number;
	votesNo: number;
	propType?: string;
};

export type TextProposal = Proposal;
export type RecurringPaymentProposal = PaymentProposal & {
	startPayment: Date;
	numPayments: number;
	frequency: number; // in days
};
export type PaymentProposal = Proposal & {
	amount: number;
	to: string;
};

export function TextProp(prop: TextProposal): TextProposal {
	return { propType: "text", ...prop };
}
export function PaymentProp(prop: PaymentProposal): PaymentProposal {
	return { propType: "payment", ...prop };
}
export function RecurringPaymentProp(
	prop: RecurringPaymentProposal,
): RecurringPaymentProposal {
	return { propType: "recurring", ...prop };
}
