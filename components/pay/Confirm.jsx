import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { socket_base_url } from "@/config/settings";

import { PaymentStatus } from "@/config/settings";
import { useUser } from "@/hooks/data/useUser";
import { useEnrollMe, useEnrollPay } from "@/store/student/useEnrollMe";

import {
  RenderSuccessState,
  RenderLoadingState,
  RenderReferenceState,
  RenderFailureState,
} from "../ui/auth/signup/PaymentStatus";

export const ConfirmEnrollPay = () => {
  const { setEnrollPayStatus, reference, enrollPayStatus } = useEnrollPay();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { enrollCohortId } = useEnrollMe();

  const handleClose = () => setEnrollPayStatus(null);

  const amount = queryClient.getQueryData([
    "enrollMeCohort",
    enrollCohortId,
  ])?.price;

  useEffect(() => {
    const socket = io(`${socket_base_url}/payment`);
    let isMounted = true;

    socket.on("connect", () => {
      socket.emit("join", { id: user?.email });
      console.log("connected successfully");
    });

    socket.on("paymentResponse", (msg) => {
      if (isMounted) {
        if (msg.status === "success") {
          setEnrollPayStatus(PaymentStatus.SUCCESS);
        } else {
          setEnrollPayStatus(PaymentStatus.REFERENCE);
        }
      }
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      isMounted = false;
      socket.close();
    };
  }, [user?.email, setEnrollPayStatus]);

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-20rem)]">
      <div className="lg:w-1/2 w-full mx-auto">
        {enrollPayStatus === PaymentStatus.LOADING && <RenderLoadingState />}
        {enrollPayStatus === PaymentStatus.SUCCESS && (
          <RenderSuccessState onClose={handleClose} />
        )}
        {enrollPayStatus === PaymentStatus.REFERENCE && (
          <RenderReferenceState
            reference={reference}
            amount={amount}
            onClose={handleClose}
          />
        )}
        {(enrollPayStatus === PaymentStatus.FAILURE || !enrollPayStatus) && (
          <RenderFailureState
            onClose={handleClose}
            setStatus={setEnrollPayStatus}
          />
        )}
      </div>
    </div>
  );
};
