"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPartnerSchool } from "@/src/features/admin";
import { message } from "antd";
import { useState } from "react";

export const useCreatePartnerSchool = () => {
    const [openModal, setOpenModal] = useState(false);
    const [fileList, setFileList] = useState([]);
    const queryClient = useQueryClient();
    const handleClose = () => {
        setOpenModal(false);
    };

    const handleOpen = () => {
        setOpenModal(true);
    };

    const beforeUpload = (file) => {
        const isImage = ["image/jpeg", "image/jpg", "image/png"].includes(
            file.type
        );
        const isValidSize = file.size / 1024 / 1024 < 2;

        if (!isImage) {
            message.error("Only valid picture is allowed");
            return Upload.LIST_IGNORE;
        }

        if (!isValidSize) {
            message.error("Picture must be smaller than 2MB");
            return Upload.LIST_IGNORE;
        }

        return true;
    };

    const handleFileChange = ({ fileList }) => {
        const validFileList = fileList.filter((file) => {
            const isImage = ["image/jpeg", "image/jpg", "image/png"].includes(
                file.type
            );
            const isNotError = file.status !== "error";
            const isUnder2MB = file.size && file.size / 1024 / 1024 < 2;

            return isImage && isNotError && isUnder2MB;
        });

        // Ensure only one file is retained
        setFileList({
            school_logo: validFileList.slice(0, 1),
        });
    };

    const mutation = useMutation({
        mutationFn: (data) => createPartnerSchool(data),
    });

    const handleOnFinish = (data) => {
        mutation.mutate(data, {
            onSuccess: (res) => {
                message.success(`${res.data.name} ${res.message}`);
                queryClient.invalidateQueries({
                    queryKey: ["partnerSchools"],
                });
                handleClose();
            },
            onError: (err) => {
                message.error("Error occurred could not create partner school");
            },
        });
    };

    return {
        handleOnFinish,
        openModal,
        handleClose,
        handleOpen,
        handleFileChange,
        fileList,
        beforeUpload,
    };
};
