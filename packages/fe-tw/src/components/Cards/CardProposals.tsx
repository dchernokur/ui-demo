'use client'
import React from "react";
//import PropTypes from "prop-types";
import type {
  TextProposal,
} from "@/types/props";
// components

import TableDropdown from "@/components/Dropdowns/TableDropdown";
import {activeProposals} from "@/consts/props";

export default function CardProposals(props:PropTypes) {
 const {color} = {...defaultProps, ...props};
 for (const pr of activeProposals) {
     console.log("type",pr.propType,pr)
 }
  return (
    <>
      <div
        className={
          `relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${color === "light" ? "bg-white" : "bg-lightBlue-900 text-white"}`
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  `font-semibold text-lg ${color === "light" ? "text-slate-700" : "text-white"}`
                }
              >
                Proposals
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}

          <ul>
              {activeProposals.map( (prop)=>(
                  <li key={prop.id} >{prop.id} {prop.title}</li>
              ) )}

          </ul>
        </div>
      </div>
    </>
  );
}

const defaultProps: PropTypes = {
  color: "light",
};

interface PropTypes  {
  color?: "light"| "dark"
};
