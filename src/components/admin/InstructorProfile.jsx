import React from "react";
import PdfViewer from "./PdfViewer";
import { useDevice } from "@/src/hooks/useDevice";

function InstructorProfile({ user }) {
    
    return (
        <div className="flex flex-col gap-y-3 px-2 py-4">
    
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2">
            <div className="space-y-2 flex flex-col jusitfy-start ">
                <div className='border-gray-500 border-b-2 w-full'>Curriculum Vitae</div>
                <PdfViewer pdfPath={user?.instructor?.curriculum_vitae} />
            </div>
            <div className="space-y-2  flex flex-col">
                <div className='border-gray-500 border-b-2 w-full'>Transcripts</div>
                <PdfViewer pdfPath={user?.instructor?.transcript} />
            </div>
            <div className="space-y-2  flex flex-col">
                <div className='border-gray-500 border-b-2 w-full'>O level Certificate</div>
                <PdfViewer pdfPath={user?.instructor?.o_level_certificate} />
            </div>
            <div className="space-y-2">
                <div className='border-gray-500 border-b-2 w-full'>A level Certificate</div>
                <PdfViewer pdfPath={user?.instructor?.a_level_certificate} />
            </div>
            </div>
        </div>
    );
}

export default InstructorProfile;
