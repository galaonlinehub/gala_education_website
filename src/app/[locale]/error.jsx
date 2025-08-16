"use client";

import Link from "next/link";
import { LuHouse, LuRotateCcw } from "react-icons/lu";

import { Contact } from "@/components/layout/Contact";

export default function Error({ error }) {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden">
      <div className="space-y-8 text-center">
        <div className="relative">
          <div className="w-24 h-24 bg-red-100 rounded-full mx-auto flex items-center justify-center">
            <span className="text-red-600 text-4xl font-bold">!</span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-base lg:text-3xl font-bold text-gray-900">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            {error.message ||
              "We're having trouble processing your request. Please try again."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center w-44 gap-2 px-2 py-2 cursor-pointer hover:scale-105 transition-transform ease-in-out duration-300 bg-[#001840] text-white rounded-lg hover:bg-[#00840]/50 overflow-hidden"
          >
            <LuRotateCcw className="w-4 h-4" />
            <> Try Again</>
          </button>

          <Link
            href="/"
            className="flex items-center justify-center w-44 gap-2 px-2 py-2 cursor-pointer hover:scale-105 transition-transform ease-in-out duration-300 text-[#001840] rounded-lg border border-[#001840] overflow-hidden"
          >
            <LuHouse className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="text-sm">
          <Contact />
          {error.digest && (
            <p className="mt-2">
              Error ID:{" "}
              <code className="text-xs bg-gray-100 p-1 rounded">
                {error.digest}
              </code>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
