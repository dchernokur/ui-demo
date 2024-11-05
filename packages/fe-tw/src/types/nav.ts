export interface NavbarEntry {
	title: string;
	url: string;
	icon?: string;
}
export interface NavbarHeading {
	title: string;
	entries: NavbarEntry[];
}
export interface Links {
	headers: NavbarHeading[];
}
