"use client";

import Link from "next/link";
import { useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoRefreshOutline } from "react-icons/io5";

export default function Error({ error }) {

  return (
    <main className="flex flex-col items-center justify-center h-full overflow-hidden">
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
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <IoRefreshOutline className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <IoHomeOutline className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* {process.env.NODE_ENV === "development" && (
          <div className="mt-8">
            <details className="text-left bg-white p-4 rounded-lg border border-gray-200">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Error Details
              </summary>
              <pre className="mt-2 text-xs text-gray-600 overflow-auto p-2 bg-gray-50 rounded">
                {error.stack || error.message}
              </pre>
            </details>
          </div>
        )} */}

        <div className="text-sm text-gray-500">
          <p>
            Need help?{" "}
            <a href="/contact" className="text-blue-600 hover:underline ml-1">
              Contact Support
            </a>
          </p>
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
