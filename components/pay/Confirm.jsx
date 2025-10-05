import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { PaymentStatus } from "@/config/settings";
import { useUser } from "@/hooks/data/useUser";
import { useEnrollMe, useEnrollPay } from "@/store/student/useEnrollMe";

import {
  RenderSuccessState,
  RenderLoadingState,
  RenderReferenceState,
  RenderFailureState,
} from "../ui/auth/signup/PaymentStatus";
import { useSocketConnection } from "@/hooks/sockets/useSocketConnection";
import { useSocketEmit } from "@/hooks/sockets/useSocketEmit";
import { NAMESPACES } from "@/utils/data/namespaces";
import { useSocketEvent } from "@/hooks/sockets/useSocketEvent";

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


  const { isConnected, socketId } = useSocketConnection({
    namespace: NAMESPACES.PAYMENT,
    useInternalToken: true,
    user
  });


  const { emit, isEmitting, lastEmit, error } = useSocketEmit(NAMESPACES.PAYMENT);

  useEffect(() => {
    if (isConnected && reference && amount) {
      emit("join", {
        id: user?.email,
      });
    }
  }, [isConnected, reference, amount, user, emit]);

  const handlePaymentResponse = (data) => {
    console.log("Payment response:", data);

    if (data.status === "success") {
      setEnrollPayStatus(PaymentStatus.SUCCESS);
    } else {
      setEnrollPayStatus(PaymentStatus.REFERENCE);
    }
  };

  useSocketEvent(
    NAMESPACES.PAYMENT,
    "paymentResponse",
    handlePaymentResponse,
    [setEnrollPayStatus]
  );


  if (!isConnected) return null;

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-20rem)]">
      <div className="lg:w-1/2 w-full mx-auto">
        {enrollPayStatus === PaymentStatus.LOADING && <RenderLoadingState setStatus={setEnrollPayStatus} />}
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
