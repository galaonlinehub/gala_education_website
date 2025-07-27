"use client";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

import {
  ActivateAccount,
  ExpiredActivationLink,
  InvalidActivationLink,
  useActivation,
} from "@/src/features/activation";
import UsedActivationLInk from "@/src/features/activation/components/UsedActivationLink";


const ActivateAccountPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {
    verifyLink,
    verifyLinkIsError,
    verifyLinkError,
    verifyLinkIsPending,
  } = useActivation();

  const tokenParam = searchParams.get("token");
  const emailParam = searchParams.get("email");

  useEffect(() => {
    if (emailParam && tokenParam) {
      verifyLink(emailParam, tokenParam);
    } else {
      router.push("/signin");
    }
    setLoading(false);
  }, [emailParam, tokenParam, router, verifyLink]);

  const errorType = verifyLinkError?.response?.data?.type;

  return (
    <div className="flex items-center justify-center h-5/6 p-3 lg:p-0">
      {verifyLinkIsPending || loading ? (
        <div>Fetching activation details</div>
      ) : (
        <Card
          className="!w-full !max-w-xl !bg-white !rounded-lg  !border-0"
          title={
            <h1 className="text-center font-bold text-blue-800 text-2xl">
              Gala Education
            </h1>
          }
        >
          {verifyLinkIsError ? (
            <div className="items-center flex flex-col">
              <IoIosCloseCircleOutline className="text-red-600 text-5xl sm:text-7xl" />
              <span>
                {errorType === "invalid_link" ? (
                  <InvalidActivationLink />
                ) : errorType === "used" ? (
                  <UsedActivationLInk />
                ) : (
                  <ExpiredActivationLink />
                )}
              </span>
            </div>
          ) : emailParam && tokenParam ? (
            <ActivateAccount />
          ) : (
            <div>Loading...</div>
          )}
        </Card>
      )}
    </div>
  );
};

export default ActivateAccountPage;
