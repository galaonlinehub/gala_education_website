"use client";
import React, { useEffect, useRef } from 'react';

const FilePreview = ({ fileUrl }) => {
    return (
        <div className="h-screen max-h-[80vh] w-full max-w-[80%] mx-auto">
            <iframe
                src={fileUrl}
                style={{width: '100%', height: '100%'}}

            />
        </div>
    );
};

export default FilePreview;
