import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import FooterAdmin from "@/components/Footers/FooterAdmin";
import HeaderStats from "@/components/Headers/HeaderStats";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { links } from "@/consts/nav";
import type React from "react";

export const metadata: Metadata = {
	title: "B.R.U",
	description: "Generated with love",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Sidebar links={links} />
			<div className="relative md:ml-64 bg-slate-100">
				<AdminNavbar title="500 James Street" />
				{/* Header */}
				<HeaderStats />
				<div className="px-4 md:px-10 mx-auto w-full -m-24">
					{children}
					<FooterAdmin />
				</div>
			</div>
		</>
	);
}
