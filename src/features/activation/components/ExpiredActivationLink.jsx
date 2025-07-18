import { Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MdMarkEmailUnread } from "react-icons/md";
import { resendActivationLink } from "@/src/features/activation";

function ExpiredActivationLink() {
    const email = "frankndagula12@gmail.com";

    const submitResend = () => {
        resendActivationLink(email);
    };

    return (
        <div className="text-center flex flex-col gap-5 items-center">
            <h1 className="font-bold text-2xl">Expired Activation Link</h1>
            <p>
                This link is expired, please request new activation link to your
                email.
            </p>
            <MdMarkEmailUnread className="text-5xl sm:text-7xl text-blue-900" />
            <div className="gap-x-12 flex items-center">
                <button onClick={submitResend} className="text-blue-900">
                    Resend Activation Link
                </button>
                <Divider type="vertical" />
                <Link href="/signin" className="text-blue-900">
                    Back to Login
                </Link>
                <Divider type="vertical" />
                <Link href="/signup" className="text-blue-900">
                    To signup
                </Link>
            </div>
        </div>
    );
}

export default ExpiredActivationLink;
