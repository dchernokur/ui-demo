import type { Links, NavbarHeading } from "@/types/nav";

const adminLayout: NavbarHeading = {
	title: "Buildings",
	entries: [
		{ title: "Sample Building", url: "/dash", icon: "fa-tv" },
		/*{ title: "Settings", url: "/dash/settings", icon: "fa-tools" },
		{ title: "Tables", url: "/dash/tables", icon: "fa-table" },
		{ title: "Maps", url: "/dash/maps", icon: "fa-map-marked" },*/
	],
};
const authLayout: NavbarHeading = {
	title: "Auth layout",
	entries: [
		{ title: "Login", url: "/auth/login", icon: "fa-fingerprint" },
		{ title: "Register", url: "/auth/register", icon: "fa-clipboard-list" },
	],
};
const noLayout: NavbarHeading = {
	title: "No Layout",
	entries: [
		{ title: "Landing Page", url: "/landing", icon: "fa-newspaper" },
		{ title: "Profile", url: "/profile", icon: "fa-user-circle" },
	],
};
export const links: Links = {
	headers: [adminLayout, authLayout, noLayout],
};
