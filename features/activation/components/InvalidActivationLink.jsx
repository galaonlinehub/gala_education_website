import { Divider } from "antd";
import Link from "next/link";
import React from "react";
import { MdMarkEmailUnread } from "react-icons/md";

function InvalidActivationLink() {
    return (
        <div className="text-center flex flex-col gap-5 items-center">
            <h1 className="font-bold text-2xl">Invalid Activation Link</h1>
            <p>
                This link is not valid, please use the activation link sent to
                your email
            </p>
            <MdMarkEmailUnread className="text-5xl sm:text-7xl text-blue-900" />
            <div className="gap-x-12 flex items-center">
              <Link href="/signin" className="text-blue-900">Back to Login</Link>
             <Divider type="vertical" />
              <Link href="/signup" className="text-blue-900">To signup</Link>
            </div>
        </div>
    );
}

export default InvalidActivationLink;
