'use client'
import React, {useState} from "react";
import Link from "next/link";
import {usePathname} from 'next/navigation';
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown";
import UserDropdown from "@/components/Dropdowns/UserDropdown";

import type {Links} from "@/types/nav";

export default function Sidebar({links}:{links:Links}) {

    const [collapseShow, setCollapseShow] = useState("hidden");

    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Toggle */}
                  <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
                    >
                        <i className="fas fa-bars" />
                    </button>
                    {/* Brand */}
                    <Link
                        className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                        href="/"
                    >
                       BRU
                    </Link>
                    {/* User */}
                    <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            <NotificationDropdown />
                        </li>
                        <li className="inline-block relative">
                            <UserDropdown />
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={
                            `md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${collapseShow}`
                        }
                    >
                        {/* Collapse header */}
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link
                                        className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                        href="/"
                                    >
                                        BRU
                                    </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onClick={() => setCollapseShow("hidden")}
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="px-3 py-2 h-12 border border-solid  border-slate-500 placeholder-slate-300 text-slate-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                                />
                            </div>
                        </form>
                        {/* <NoSSR/> */}
                        {links.headers.map( part =>
                            <div key={part.title}>
                                {/* Divider */}
                                <hr className="my-4 md:min-w-full"/>

                                {/* Heading */}
                                <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                                    {part.title}
                                </h6>

                                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                                    {part.entries.map(entry =>
                                    <li key={entry.title} className="items-center">
                                       <Link className={`text-xs uppercase py-3 font-bold block ${usePathname().endsWith(entry.url) 
                                           ? "text-lightBlue-500 hover:text-lightBlue-600"
                                           : "text-slate-700 hover:text-slate-500"}`
                                        }
                                       href={entry.url}>
                                           {entry.icon && (
                                               <i
                                                   className={
                                                       `fas ${entry.icon} mr-2 text-sm ${ usePathname().endsWith(entry.url) 
                                                           ? "opacity-75"
                                                           : "text-slate-400"}`
                                                   }
                                               />
                                           )}
                                           {!entry.icon && (
                                               <i
                                                   className={
                                                       `fas fa-ticket mr-2 text-sm ${usePathname().endsWith(entry.url) 
                                                           ? "opacity-75"
                                                           : "text-slate-400"}`
                                                   }
                                               />
                                           )}
                                           {" "}

                                           {entry.title}
                                       </Link>
                                    </li>
                                    )}
                                </ul>
                            </div>
                            )}


                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            Documentation
                        </h6>
                        {/* Navigation */}
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/react/colors/notus"
                                    target="_blank"
                                    className="text-slate-700 hover:text-slate-500 text-sm block mb-4 no-underline font-semibold" rel="noreferrer"
                                >
                                    <i className="fas fa-paint-brush mr-2 text-slate-300 text-base" />
                                    Styles
                                </a>
                            </li>

                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus"
                                    target="_blank"
                                    className="text-slate-700 hover:text-slate-500 text-sm block mb-4 no-underline font-semibold" rel="noreferrer"
                                >
                                    <i className="fab fa-css3-alt mr-2 text-slate-300 text-base" />
                                    CSS Components
                                </a>
                            </li>

                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
                                    target="_blank"
                                    className="text-slate-700 hover:text-slate-500 text-sm block mb-4 no-underline font-semibold" rel="noreferrer"
                                >
                                    <i className="fab fa-react mr-2 text-slate-300 text-base" />
                                    NextJS
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
