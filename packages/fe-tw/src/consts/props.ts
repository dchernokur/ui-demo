import type {
	PaymentProposal,
	RecurringPaymentProposal,
	TextProposal,
} from "@/types/props";
import { PaymentProp, RecurringPaymentProp, TextProp } from "@/types/props";
export const activeProposals: (
	| TextProposal
	| PaymentProposal
	| RecurringPaymentProposal
)[] = [
	TextProp({
        id: 1,
		title: "Test Prop",
		description:
			"Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra tristique maecenas sociosqu vel varius pulvinar pretium potenti. In in et amet phasellus orci tristique dolor purus taciti. Egestas orci bibendum nulla ligula sit ipsum erat. Non euismod molestie inceptos proin enim. Ornare neque fermentum mi erat ligula eu.",
		started: new Date(),
		expiry: new Date(),
		votesYes: 10,
		votesNo: 20,
	}),
	PaymentProp({
        id: 2,
		title: "Payment Prop",
		description:
			"Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra tristique maecenas sociosqu vel varius pulvinar pretium potenti. In in et amet phasellus orci tristique dolor purus taciti. Egestas orci bibendum nulla ligula sit ipsum erat. Non euismod molestie inceptos proin enim. Ornare neque fermentum mi erat ligula eu.",
		started: new Date(),
		expiry: new Date(),
		votesYes: 10,
		votesNo: 20,
		amount: 200,
		to: "john",
	}),
	RecurringPaymentProp({
        id: 3,
		title: "Recurring Prop",
		description:
			"Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra tristique maecenas sociosqu vel varius pulvinar pretium potenti. In in et amet phasellus orci tristique dolor purus taciti. Egestas orci bibendum nulla ligula sit ipsum erat. Non euismod molestie inceptos proin enim. Ornare neque fermentum mi erat ligula eu.",
		started: new Date(),
		expiry: new Date(),
		votesYes: 10,
		votesNo: 20,
		amount: 200,
		to: "john", frequency: 7, numPayments: 5,  startPayment: new Date(),
	}),
	TextProp({
		id: 5,
		title: "Test Prop",
		description:
			"Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra tristique maecenas sociosqu vel varius pulvinar pretium potenti. In in et amet phasellus orci tristique dolor purus taciti. Egestas orci bibendum nulla ligula sit ipsum erat. Non euismod molestie inceptos proin enim. Ornare neque fermentum mi erat ligula eu.",
		started: new Date(),
		expiry: new Date(),
		votesYes: 10,
		votesNo: 20,
	}),
];
