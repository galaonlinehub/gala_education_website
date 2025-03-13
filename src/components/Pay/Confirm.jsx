import { useEffect, useState } from "react";
import { PaymentStatus } from "@/src/config/settings";
import {
  RenderSuccessState,
  RenderLoadingState,
  RenderReferenceState,
  RenderFailureState,
} from "../ui/auth/signup/PaymentStatus";
import { useEnrollMe, useEnrollPay } from "@/src/store/student/useEnrollMe";
import { useUser } from "@/src/hooks/useUser";
import io from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

export const ConfirmEnrollPay = () => {
  const { setEnrollPayStatus, reference, enrollPayStatus } = useEnrollPay();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { enrollCohortId } = useEnrollMe();

  const handleClose = () => setEnrollPayStatus(null);

  const amount = queryClient.getQueryData(["enrollMeCohort", enrollCohortId])?.price;

  useEffect(() => {
    const socket = io("https://edusockets.galahub.org/payment");
    let isMounted = true;

    socket.on("connect", () => {
      socket.emit("join", { email: user?.email });
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
        {enrollPayStatus === PaymentStatus.SUCCESS && <RenderSuccessState onClose={handleClose} />}
        {enrollPayStatus === PaymentStatus.REFERENCE && (
          <RenderReferenceState reference={reference} amount={amount} onClose={handleClose} />
        )}
        {(enrollPayStatus === PaymentStatus.FAILURE || !enrollPayStatus) && (
          <RenderFailureState onClose={handleClose} setStatus={setEnrollPayStatus} />
        )}
      </div>
    </div>
  );
};