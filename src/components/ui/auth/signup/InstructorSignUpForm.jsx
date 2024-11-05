// import {Button, Input, Upload} from "antd";
// import InstructorSignUpPageSvg from "@/src/utils/vector-svg/sign-up/InstructorSignUpPageSvg";
// import { useForm } from "react-hook-form";

// // import { UploadOutlined } from '@ant-design/icons';


// const InstructorSignUpForm = () => {
//     const { register, handleSubmit, watch, formState: { errors } } = useForm();

//     const onSubmit = data => {
//     console.log(data)

//     const formData = new FormData();
    
//     formData.append('fullName', data.first_name);
//     formData.append('email', data.email);
//     formData.append('password', data.password);
//     formData.append('nidaNumber', data.nidaNumber);
    
//     if (data.cv?.[0]) formData.append('cv', data.cv[0]);
//     if (data.transcript?.[0]) formData.append('transcript', data.transcript[0]);
//     if (data.aLevelCert?.[0]) formData.append('aLevelCertificate', data.aLevelCert[0]);
//     if (data.oLevelCert?.[0]) formData.append('oLevelCertificate', data.oLevelCert[0]);
//     }

//     const props = {
//         name: 'file',
//         action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
//         headers: {
//             authorization: 'authorization-text',
//         },
//         onChange(info) {
//             if (info.file.status !== 'uploading') {
//                 console.log(info.file, info.fileList);
//             }
//             if (info.file.status === 'done') {
//                 message.success(`${info.file.name} file uploaded successfully`);
//             } else if (info.file.status === 'error') {
//                 message.error(`${info.file.name} file upload failed.`);
//             }
//         },
//     };
//     return (
//         <main className="flex justify-center items-center w-full pt-6 pb-24">
//             <div className="flex flex-col gap-12 w-full mx-2 lg:mx-24 z-10">
//                 <div className="flex flex-col gap-6 justify-center items-center w-full">
//                     <span className="font-black text-[16px]">Sign Up</span>
//                     <span className="font-medium text-[12px] w-4/6 text-center">
//                         When registering with Gala, teachers undergo a vetting process to ensure only qualified candidates are selected, maintaining service quality. The first payment, which is non-refundable, serves as an application fee. Applications are processed within 2-3 business days and may be approved or denied.
//                     </span>
//                 </div>
//                 <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full">
//                     <div className="flex flex-col gap-4 w-full">
//                         <div className="flex flex-col gap-2 items-start justify-center">
//                             <span className="font-black text-[16px]">
//                                 Full Name *
//                             </span>
//                             <Input 
//                                 placeholder="Enter Your Full Name" 
//                                 className="!border-[1.5px] !rounded-[1.5px] !border-[#030DFE] !h-[41.54px] !placeholder:font-semibold !placeholder:text-[14px] !placeholder:text-red-900"
//                                 {...register("first_name", {required:"THIS FIELD IS REQUIRED"})}
//                                    />
//                              {errors.first_name &&
//                                 <span>{errors.first_name.message}</span>
//                              }      
//                         </div>
//                         {/* <div className="flex flex-col gap-2 justify-center items-start">
//                             <span className="font-black text-[16px]">
//                                 Email *
//                             </span>
//                             <Input placeholder="Enter Your Full Name"
//                                    className="!border-[1.5px] !rounded-[1.5px] !border-[#030DFE] !h-[41.54px] !placeholder:font-semibold !placeholder:text-[14px] !placeholder:text-red-900"/>
//                         </div>
//                         <div className="flex flex-col gap-2 justify-center items-start">
//                             <span className="font-black text-[16px]">
//                                 Password *
//                             </span>
//                             <Input placeholder="Enter Your Full Name"
//                                    className="!border-[1.5px] !rounded-[1.5px] !border-[#030DFE] !h-[41.54px] !placeholder:font-semibold !placeholder:text-[14px] !placeholder:text-red-900"/>
//                         </div>
//                         <div className="flex flex-col gap-2 justify-center items-start">
//                             <span className="font-black text-[16px]">
//                                 National ID Number (NIDA) *
//                             </span>
//                             <Input placeholder="Enter Your Full Name"
//                                    className="!border-[1.5px] !rounded-[1.5px] !border-[#030DFE] !h-[41.54px] !placeholder:font-semibold !placeholder:text-[14px] !placeholder:text-red-900"/>
//                         </div>
//                     </div>

//                     <div className="flex flex-col mx-auto items-center justify-center gap-4 w-full">
//                         <div className="flex flex-col gap-2 justify-center items-start">
//                             <span className="font-black text-[16px]">
//                                 Curriculum Vitae (CV)
//                             </span>
//                             <Upload {...props} className="!w-full">
//                                 <Button
//                                     className="!h-[41.54px] !w-[200px] sm:!w-[300px] lg:!w-[398.44px] !bg-[#001840] !rounded-[1.5px] !text-[14px] !font-semibold !text-[#D9D9D9] "
//                                     // icon={<UploadOutlined />}
//                                 >
//                                     Upload CV</Button>
//                             </Upload>
//                         </div>
//                         <div className="flex flex-col gap-2 justify-center items-start">
//                             <span className="font-black text-[16px]">
//                                 Transcript *
//                             </span>
//                             <Button
//                                 className="!h-[41.54px] !w-[200px] sm:!w-[300px] lg:!w-[398.44px] !bg-[#001840] !rounded-[1.5px] !text-[14px] !font-semibold !text-[#D9D9D9] "
//                                 // icon={<UploadOutlined />}
//                             >
//                                 Upload Transcript</Button>
//                         </div>
//                         <div className="flex flex-col gap-2 justify-center items-start">
//                             <span className="font-black text-[16px]">
//                                A-Level Certificate *
//                             </span>
//                             <Button
//                                 className="!h-[41.54px] !w-[200px] sm:!w-[300px] lg:!w-[398.44px] !bg-[#001840] !rounded-[1.5px] !text-[14px] !font-semibold !text-[#D9D9D9] "
//                                 // icon={<UploadOutlined />}
//                             >
//                                 Upload Certificate</Button>
//                         </div>
//                         <div className="flex flex-col gap-2 justify-center items-start">
//                             <span className="font-black text-[16px]">
//                                O-Level Certificate *
//                             </span>
//                             <Button
//                                 className="!h-[41.54px] !w-[200px] sm:!w-[300px] lg:!w-[398.44px] !bg-[#001840] !rounded-[1.5px] !text-[14px] !font-semibold !text-[#D9D9D9] "
//                                 // icon={<UploadOutlined />}
//                             >
//                                 Upload Certificate</Button>
//                         </div>
//                      */}
//                      </div>
//                     <div className="flex items-center">
//                         <Button type="submit" className="!h-[42.27px] !w-[117.46px] !bg-[#030DFE] !text-white !font-black">
//                             Apply
//                         </Button>
//                     </div>
//                 </form>
//             </div>

//             {/* <InstructorSignUpPageSvg/> */}
//         </main>
//     )
// }

// export default InstructorSignUpForm


import React, { useState } from 'react';
import { Button, Input, message } from "antd";
import { useForm } from "react-hook-form";

const InstructorSignUpForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [files, setFiles] = useState({
        cv: null,
        transcript: null,
        aLevelCert: null,
        oLevelCert: null
    });

    const onSubmit = data => {
        console.log("Form Data:", data);
        console.log("Files:", files);

        const formData = new FormData();
        
        // Add text fields
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('nidaNumber', data.nidaNumber);
        
        // Add files
        if (files.cv) formData.append('cv', files.cv);
        if (files.transcript) formData.append('transcript', files.transcript);
        if (files.aLevelCert) formData.append('aLevelCertificate', files.aLevelCert);
        if (files.oLevelCert) formData.append('oLevelCertificate', files.oLevelCert);

        // Log the FormData contents
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        // Here you would typically send the formData to your API
    };

    const handleFileUpload = (fileType, e) => {
        console.log("WE TOGETHER")
        const file = e.target.files[0];
        if (file) {
            setFiles(prev => ({
                ...prev,
                [fileType]: file
            }));
            message.success(`${file.name} selected successfully`);
        }
    };

    const FileUploadButton = ({ fileType, label, required = false }) => (
        <div className="flex flex-col gap-2 justify-center items-start w-full">
            <span className="font-black text-[16px]">
                {label} {required && '*'}
            </span>
            <label className="cursor-pointer w-full">
                <div className="!h-[41.54px] w-full sm:w-[300px] lg:w-[398.44px] bg-[#001840] rounded-[1.5px] text-[14px] font-semibold text-[#D9D9D9] flex items-center justify-center">
                    {files[fileType] ? files[fileType].name : `Upload ${label}`}
                </div>
                <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(fileType, e)}
                    {...(required && register(fileType, { required: "This field is required" }))}
                />
            </label>
            {errors[fileType] && (
                <span className="text-red-500 text-sm">{errors[fileType].message}</span>
            )}
        </div>
    );

    return (
        <main className="flex justify-center items-center w-full pt-6 pb-24">
            <div className="flex flex-col gap-12 w-full mx-2 lg:mx-24 z-10">
                <div className="flex flex-col gap-6 justify-center items-center w-full">
                    <span className="font-black text-[16px]">Sign Up</span>
                    <span className="font-medium text-[12px] w-4/6 text-center">
                        When registering with Gala, teachers undergo a vetting process to ensure only qualified candidates are selected, maintaining service quality. The first payment, which is non-refundable, serves as an application fee. Applications are processed within 2-3 business days and may be approved or denied.
                    </span>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-2 items-start justify-center">
                            <span className="font-black text-[16px]">Full Name *</span>
                            <Input 
                                placeholder="Enter Your Full Name" 
                                className="!border-[1.5px] !rounded-[1.5px] !border-[#030DFE] !h-[41.54px] !placeholder:font-semibold !placeholder:text-[14px]"
                                {...register("fullName", { required: "Full name is required" })}
                            />
                            {errors.fullName && (
                                <span className="text-red-500 text-sm">{errors.fullName.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 justify-center items-start">
                            <span className="font-black text-[16px]">Email *</span>
                            <Input 
                                placeholder="Enter Your Email"
                                className="!border-[1.5px] !rounded-[1.5px] !border-[#030DFE] !h-[41.54px] !placeholder:font-semibold !placeholder:text-[14px]"
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 justify-center items-start">
                            <span className="font-black text-[16px]">Password *</span>
                            <Input.Password 
                                placeholder="Enter Your Password"
                                className="!border-[1.5px] !rounded-[1.5px] !border-[#030DFE] !h-[41.54px] !placeholder:font-semibold !placeholder:text-[14px]"
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters"
                                    }
                                })}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">{errors.password.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 justify-center items-start">
                            <span className="font-black text-[16px]">National ID Number (NIDA) *</span>
                            <Input 
                                placeholder="Enter Your NIDA Number"
                                className="!border-[1.5px] !rounded-[1.5px] !border-[#030DFE] !h-[41.54px] !placeholder:font-semibold !placeholder:text-[14px]"
                                {...register("nidaNumber", { required: "NIDA number is required" })}
                            />
                            {errors.nidaNumber && (
                                <span className="text-red-500 text-sm">{errors.nidaNumber.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col mx-auto items-center justify-center gap-4 w-full">
                        <FileUploadButton fileType="cv" label="Curriculum Vitae (CV)" />
                        <FileUploadButton fileType="transcript" label="Transcript" required />
                        <FileUploadButton fileType="aLevelCert" label="A-Level Certificate" required />
                        <FileUploadButton fileType="oLevelCert" label="O-Level Certificate" required />
                    </div>

                    <div className="flex items-center">
                        <Button 
                            type="submit" 
                            className="!h-[42.27px] !w-[117.46px] !bg-[#030DFE] !text-white !font-black"
                        >
                            Apply
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default InstructorSignUpForm;