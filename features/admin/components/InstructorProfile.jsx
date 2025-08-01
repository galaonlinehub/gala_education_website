"use client";
import { Card, message, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import { CiFileOff } from "react-icons/ci";

import PdfViewer from "./PdfViewer";

function InstructorProfile({ user }) {
    const [isModalOpen, setIsOpenModal] = React.useState(false);
    const [pdfPath, setSelectedPdfPath] = React.useState(null);
    const [profileSection, setProfileSection] = useState("profile");

    const handleSection = (section) => {
        setProfileSection(section);
    };

    const handleCancel = () => {
        setIsOpenModal(false);
        setSelectedPdfPath(null);
    };

    const handleOpenModal = (pdfPath) => {
        if (pdfPath === null) return message.error("No PDF available", 4);

        setIsOpenModal(true);
        setSelectedPdfPath(pdfPath);
    };

    const CardContent = ({ itemKey, value }) => {
        return (
            <div className="flex gap-x-2">
                <span className="text-[#5d5c5f] w-28">{itemKey}</span>
                <span className="text-[#acabae]">{value}</span>
            </div>
        );
    };

    const MiniPdfViewer = React.memo(({ name, miniPdfPath }) => {
        return (
            <Card
                onClick={() => handleOpenModal(miniPdfPath)}
                className="space-y-2 flex cursor-pointer flex-col bg-gray-50 justify-between "
            >
                {miniPdfPath ? (
                    // <PdfViewer width={70} pdfPath={miniPdfPath} />
                    <iframe
                        src={`https://galaweb.galahub.org/api/documents/${miniPdfPath}`}
                        width={70}
                        height={90}
                        className="border rounded cursor-pointer"
                    />
                ) : (
                    <CiFileOff className="text-gray-400 w-32 h-32" />
                )}
                <Meta description={name} />
            </Card>
        );
    });
    
    MiniPdfViewer.displayName = 'MiniPdfViewer';

    return (
        <div className="flex flex-col  px-2 py-4 gap-y-4">
            <div className="flex">
                <div className="basis-3/12 grid grid-cols-3">
                    <div
                        onClick={() => handleSection("profile")}
                        className={` border-b-2 p-2 text-xs  ${
                            profileSection === "profile"
                                ? "text-blue-500 border-blue-500"
                                : "border-gray-200"
                        } text-center cursor-pointer`}
                    >
                        Profile
                    </div>
                    <div
                        onClick={() => handleSection("attachments")}
                        className={` border-b-2 p-2 text-xs ${
                            profileSection === "attachments"
                                ? "text-blue-500 border-blue-500"
                                : "border-gray-200"
                        } text-center cursor-pointer`}
                    >
                        Attachments
                    </div>
                    <div
                        onClick={() => handleSection("cohorts")}
                        className={` border-b-2 p-2 text-xs ${
                            profileSection === "cohorts"
                                ? "text-blue-500 border-blue-500"
                                : "border-gray-200"
                        } text-center cursor-pointer`}
                    >
                        Cohorts
                    </div>
                </div>
                <div className="border-b-2 basis-9/12  border-gray-200" />
            </div>

            {profileSection === "profile" ? (
                <Card
                    className="basis-1/2"
                    variant="borderless"
                    title="Basic Details"
                >
                    <section className="flex flex-col justify-between gap-y-3">
                        <CardContent itemKey={"Fullname"} value={user?.name} />
                        <CardContent itemKey={"Email"} value={user?.email} />
                        <CardContent
                            itemKey={"Phone Number"}
                            value={user?.phone_number}
                        />
                        <CardContent
                            itemKey={"Nida Number"}
                            value={user?.instructor?.nida}
                        />
                        <CardContent
                            itemKey={"Subjects"}
                            value={user?.instructor?.subjects}
                        />
                        <CardContent
                            itemKey={"Grade Levels"}
                            value={user?.instructor?.grade_levels}
                        />
                        <CardContent
                            itemKey={"Special Needs"}
                            value={user?.instructor?.special_needs}
                        />
                    </section>
                </Card>
            ) : profileSection === "attachments" ? (
                <Card className="basis-1/2">
                    <section className="grid  sm:grid-cols-2 grid-cols-1 gap-3 w-full ">
                        <MiniPdfViewer
                            name={"Curriculum Vitae"}
                            miniPdfPath={user?.curriculum_vitae}
                        />
                        <MiniPdfViewer
                            name={"Transcripts"}
                            miniPdfPath={user?.transcript}
                        />
                        <MiniPdfViewer
                            name={"O Level Certificate"}
                            miniPdfPath={user?.o_level_certificate}
                        />
                        <MiniPdfViewer
                            name={"A Level Certificate"}
                            miniPdfPath={user?.a_level_certificate}
                        />
                    </section>
                </Card>
            ) : profileSection === "cohorts" ? (
                <Card>Cohorts section</Card>
            ) : (
                <Card>Ooops wrong section</Card>
            )}

            <Modal
                className="w-full  flex justify-center"
                open={isModalOpen}
                onCancel={handleCancel}
                centered
                width={500}
                footer={null}
            >
                <section className="flex justify-between ml-[10rem] items-center w-full">
                    <PdfViewer width={320} pdfPath={pdfPath} />
                </section>
            </Modal>
        </div>
    );
}

export default InstructorProfile;
