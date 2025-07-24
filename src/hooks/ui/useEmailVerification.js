import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useEmailVerificationModalOpen } from "@/src/store/auth/signup";
import { useTabNavigator } from "@/src/store/auth/signup";
import { decrypt } from "@/src/utils/fns/encryption";
import { useRouter } from "next/navigation";
import { apiPost } from "@/src/services/api/api_service";
import { sessionStorageFn } from "@/src/utils/fns/client";
import { EMAIL_VERIFICATION_KEY } from "@/src/config/settings";
import { useMutation } from "@tanstack/react-query";

export const useEmailVerification = () => {
    const openEmailVerificationModal = useEmailVerificationModalOpen(
        (state) => state.openEmailVerificationModal
    );
    const setOpenEmailVerificationModal = useEmailVerificationModalOpen(
        (state) => state.setOpenEmailVerificationModal
    );
    const setActiveTab = useTabNavigator((state) => state.setActiveTab);
    const inputs = React.useRef([]);
    const [values, setValues] = useState(Array(6).fill(""));
    const [email, setEmail] = useState("");
    const [resendCounter, setResendCounter] = useState(0);
    const router = useRouter();


    useEffect(() => {
        const getEmail = () => {
            const encryptedEmail = sessionStorageFn.get(EMAIL_VERIFICATION_KEY);
            if (encryptedEmail) {
                const decryptedEmail = decrypt(encryptedEmail);
                setEmail(decryptedEmail);
            } else {
                message.error("Unexpected Error Occurred, Try Again Later!");
                router.push("/");
            }
        };

        if (openEmailVerificationModal) {
            getEmail();
            setResendCounter(30);
        }
    }, [openEmailVerificationModal, router]);




    const handleChange = async (value, index) => {
        if (isNaN(value) || value.length > 1) return;
        verifyMutate.reset()

        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }

        if (newValues.length === 6 && newValues.every((val) => val !== "")) {
            const code = Number(newValues.join(""));

            const formData = new FormData();
            formData.append("otp", code);
            formData.append("email", email);

            verifyMutate.mutate(formData)

        }
    };

    const verifyMutate = useMutation({
        mutationFn: (data) => verifyOtp(data),
        onSuccess: () => {
            setTimeout(() => {
                setActiveTab(1);
                setOpenEmailVerificationModal(false);
            }, 5000);
        },
        onError: (e) => {
            console.error(e.response?.data?.message || e.message);
        }

    })

    const verifyOtp = (formData) => apiPost("/verify-otp", formData);


    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !values[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    }

    useEffect(() => {
        let timer;
        if (resendCounter > 0) {
            timer = setInterval(() => {
                setResendCounter((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCounter]);

    const handleResendOtp = async () => {
        if (resendCounter > 0) return;
        handleResendMutation.mutate()
    };

    const handleResendMutation = useMutation({
        mutationFn: () => apiPost("/request-otp", {
            email,
        }),
        onSuccess: () => {
            setResendCounter(30);
        },
        onError: () => { }
    })

    const handleCancel = () => {
        Modal.confirm({
            title: "Warning: Cancel Email Verification",
            content: (
                <div className="text-xs">
                    <strong>Caution:</strong> If you cancel now, you will not be able to
                    verify your email address. This will result in the permanent deletion
                    of your account, and you will lose access to all associated data.
                </div>
            ),
            okText: "Yes, Cancel",
            okType: "danger",
            cancelText: "No, Continue Verifying",
            onOk: () => {
                setOpenEmailVerificationModal(false);
                setValues(Array(6).fill(""));
                verifyMutate.reset();
                handleResendMutation.reset();
                inputs.current.forEach((input) => {
                    if (input) input.value = "";
                });
            },
            onCancel: () => {

            },
        });
    };




    return {
        verifyMutate,
        handleResendMutation,
        handleResendOtp,
        handleKeyDown,
        handleChange,
        openEmailVerificationModal,
        handleCancel,
        email,
        resendCounter,
        inputs
    }
}