// "use client";
// import  CreateClass1  from "./CreateClass";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
// import { MdCheckCircle } from "react-icons/md";
// import { notification } from "antd";
// import { SmileOutlined } from "@ant-design/icons";
// import { apiGet } from "@/src/services/api_service";

// const queryClient = new QueryClient();

// const LoadingSpinner = () => (
//   <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
// );

// const Notification = ({ message }) => (
//   <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg flex items-center space-x-2">
//     <MdCheckCircle className="h-5 w-5" />
//     <span>{message}</span>
//   </div>
// );

// const RedirectingOverlay = () => (
//   <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
//     <div className="bg-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-4 animate-fade-in border-2 border-blue-700">
//       <div className="inline-block animate-spin rounded-full h-6 w-6 border-4 border-blue-700 border-b-transparent" />
//       <p className="text-base text-blue-700 font-semibold whitespace-nowrap">
//         Redirecting to sub-topic creation...
//       </p>
//     </div>
//   </div>
// );

// export default function CreateClass() {
//   const router = useRouter();
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [isRedirecting, setIsRedirecting] = useState(false);

//   const [formData, setFormData] = useState({
//     className: "",
//     topic: "",
//     subject: "",
//     price: "",
//     availableTo: "",
//     startDate: "",
//     endDate: "",
//     description: "",
//   });

//   const [errors, setErrors] = useState({
//     className: "",
//     topic: "",
//     subject: "",
//     price: "",
//     availableTo: "",
//     startDate: "",
//     endDate: "",
//     description: "",
//   });

//   const [touched, setTouched] = useState({
//     className: false,
//     topic: false,
//     subject: false,
//     price: false,
//     availableTo: false,
//     startDate: false,
//     endDate: false,
//     description: false,
//   });

//   const openNotification = () => {
//     notification.open({
//       message: "Success",
//       description: "Topic added successfully!",
//       icon: <SmileOutlined style={{ color: "#90EE90" }} />,
//     });
//   };

//   const validateField = (name, value) => {
//     switch (name) {
//       case "className":
//         if (!value.trim()) return "Class name is required";
//         if (value.length < 3) return "Class name must be at least 3 characters";
//         if (value.length > 50)
//           return "Class name must be less than 50 characters";
//         return "";

//       case "subject":
//         return !value ? "Please select a subject" : "";

//       case "topic":
//         return !value ? "Please select a topic" : "";

//       case "price":
//         if (!value) return "Price is required";
//         if (isNaN(value) || value < 0) return "Price must be a positive number";
//         if (value > 1000000) return "Price cannot exceed 1,000,000";
//         return "";

//       case "availableTo":
//         return !value ? "Please select a grade level" : "";

//       case "startDate":
//         if (!value) return "Start date is required";
//         if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
//           return "Start date cannot be in the past";
//         }
//         return "";

//       case "endDate":
//         if (!value) return "End date is required";
//         if (
//           formData.startDate &&
//           new Date(value) <= new Date(formData.startDate)
//         ) {
//           return "End date must be after start date";
//         }
//         return "";

//       case "description":
//         if (!value.trim()) return "Description is required";
//         if (value.trim().length < 20)
//           return "Description must be at least 20 characters";
//         if (value.trim().length > 500)
//           return "Description must be less than 500 characters";
//         return "";

//       default:
//         return "";
//     }
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched({ ...touched, [name]: true });
//     setErrors({
//       ...errors,
//       [name]: validateField(name, formData[name]),
//     });
//   };

//   useEffect(() => {
//     if (showSuccess) {
//       openNotification();
//     }
//   }, [showSuccess]);

//   const {
//     data: gradeData,
//     isLoading: isGradesLoading,
//     error: gradesError,
//   } = useQuery({
//     queryKey: ["grades"],
//     queryFn: async () => {
//       const response = await fetch(
//         "https://galaweb.galahub.org/api/grade_levels"
//       );
//       if (!response.ok) throw new Error("Network response was not ok");
//       return response.json();
//     },
//   });

//   const {
//     data: subjectData,
//     isLoading: isSubjectLoading,
//     error: subjectError,
//   } = useQuery({
//     queryKey: ["subjects"],
//     queryFn: async () => {
//       const response = await fetch("https://galaweb.galahub.org/api/subjects");
//       if (!response.ok) throw new Error("Network response was not ok");
//       return response.json();
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: async (newClass) => {
//       const response = await fetch("https://galaweb.galahub.org/api/topics", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newClass),
//       });

//       if (!response.ok) throw new Error("Failed to add class");
//       return response.json();
//     },
//     onSuccess: (data) => {
//       setFormData({
//         className: "",
//         topic: "",
//         subject: "",
//         price: "",
//         availableTo: "",
//         startDate: "",
//         endDate: "",
//         description: "",
//       });
//       queryClient.invalidateQueries(["grades"]);
//       setShowSuccess(true);

//       setTimeout(() => {
//         setIsRedirecting(true);
//         setTimeout(() => {
//           router.push(`/teacher/manage-class/${data.id}`);
//         }, 2000);
//       }, 2000);
//     },
//   });

//   const {
//     data: topicData,
//     isLoading: isTopicLoading,
//     error: topicError,
//   } = useQuery({
//     queryKey: ["topics"],
//     queryFn: async () => {
//       const response = await apiGet(`/topics/subject/${formData.subject}`);
//       if (!response.ok) throw new Error("Network response was not ok");
//       return response.json();
//       // const response = await fetch(`https://galaweb.galahub.org/api/topics/subject/${formData.subject}`);
//       // if (!response.ok) throw new Error("Network response was not ok");
//       // return response.json();
//     },
//     enabled: !!formData.subject,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (touched[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: validateField(name, value),
//       }));
//     }

//     // Special validation for dependent fields
//     if (name === "startDate" && formData.endDate) {
//       setErrors((prev) => ({
//         ...prev,
//         endDate: validateField("endDate", formData.endDate),
//       }));
//     }

//     // Log values for subject and availableTo
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Mark all fields as touched
//     const newTouched = Object.keys(formData).reduce(
//       (acc, key) => ({
//         ...acc,
//         [key]: true,
//       }),
//       {}
//     );
//     setTouched(newTouched);

//     // Validate all fields
//     const newErrors = Object.keys(formData).reduce(
//       (acc, key) => ({
//         ...acc,
//         [key]: validateField(key, formData[key]),
//       }),
//       {}
//     );
//     setErrors(newErrors);

//     // Check if there are any errors
//     if (Object.values(newErrors).some((error) => error !== "")) {
//       return;
//     }

//     const formattedData = {
//       instructor_id: 2,
//       subject_id: formData.subject,
//       grade_level_id: formData.availableTo,
//       title: formData.className,
//       price: Number(formData.price),
//       start_date: formData.startDate,
//       end_date: formData.endDate,
//       description: formData.description,
//     };

//     mutation.mutate(formattedData);
//   };

//   const isLoading = mutation.isPending;

//   return (
//     <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
//       {isRedirecting && <RedirectingOverlay />}
//       <CreateClass1 />
//       <div className="max-w-2xl mx-auto p-6 border-2 border-blue-700 shadow-md relative">
//         <h3 className="text-center mb-4 font-bold">Create a Class</h3>
//         <p className="text-center text-xs mb-6">
//           Welcome! Create a new class by entering a topic or subject name. This
//           makes it easier for students to find and connect with you when they
//           are searching for specific subjects or topics.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4 text-xs">
//           {/* <div className="mb-4">
//             <label className="block mb-2 font-bold">Class Name</label>
//             <input
//               type="text"
//               name="className"
//               value={formData.className}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="Enter a class name"
//               className={`w-full border-2 ${touched.className && errors.className ? 'border-red-500' : 'border-blue-700'} p-2`}
//               disabled={isLoading || isRedirecting}
//             />
//             {touched.className && errors.className && (
//               <p className="mt-1 text-xs text-red-500">{errors.className}</p>
//             )}
//           </div> */}

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Subject</label>
//             <select
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className={`w-full border-2 ${
//                 touched.subject && errors.subject
//                   ? "border-red-500"
//                   : "border-blue-700"
//               } p-2`}
//               disabled={isLoading || isRedirecting}
//             >
//               <option value="">Select a Subject</option>
//               {subjectData?.map((subject) => (
//                 <option key={subject.id} value={subject.id}>
//                   {subject.name}
//                 </option>
//               ))}
//             </select>
//             {touched.subject && errors.subject && (
//               <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Available to</label>
//             <select
//               name="availableTo"
//               value={formData.availableTo}
//               onChange={(e) => {
//                 handleChange(e);
//                 // handleTopicFetch(e); // Call this on change
//               }}
//               onBlur={handleBlur}
//               className={`w-full border-2 ${
//                 touched.availableTo && errors.availableTo
//                   ? "border-red-500"
//                   : "border-blue-700"
//               } p-2`}
//               disabled={isLoading || isRedirecting}
//             >
//               <option value="">Select a Class</option>
//               {gradeData?.map((grade) => (
//                 <option key={grade.id} value={grade.id}>
//                   {grade.name}
//                 </option>
//               ))}
//             </select>
//             {touched.availableTo && errors.availableTo && (
//               <p className="mt-1 text-xs text-red-500">{errors.availableTo}</p>
//             )}
//           </div>

//           <div
//             className={`mb-4 ${
//               formData.availableTo && formData.subject ? "block" : "hidden"
//             }`}
//           >
//             <label className="block mb-2 font-bold">Topic</label>
//             <select
//               name="topic"
//               value={formData.topic}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className={`w-full border-2 ${
//                 touched.topic && errors.topic
//                   ? "border-red-500"
//                   : "border-blue-700"
//               } p-2`}
//               disabled={isLoading || isRedirecting}
//             >
//               <option value="">Select a Topic</option>
//               {topicData?.map((topic) => (
//                 <option key={topic.id} value={topic.id}>
//                   {topic.title}
//                 </option>
//               ))}
//             </select>
//             {touched.topic && errors.topic && (
//               <p className="mt-1 text-xs text-red-500">{errors.topic}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Enter Price</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="Enter price"
//               className={`w-full border-2 ${
//                 touched.price && errors.price
//                   ? "border-red-500"
//                   : "border-blue-700"
//               } p-2`}
//               disabled={isLoading || isRedirecting}
//             />
//             {touched.price && errors.price && (
//               <p className="mt-1 text-xs text-red-500">{errors.price}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Start Date</label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className={`w-full border-2 ${
//                 touched.startDate && errors.startDate
//                   ? "border-red-500"
//                   : "border-blue-700"
//               } p-2`}
//               disabled={isLoading || isRedirecting}
//             />
//             {touched.startDate && errors.startDate && (
//               <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">End Date</label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className={`w-full border-2 ${
//                 touched.endDate && errors.endDate
//                   ? "border-red-500"
//                   : "border-blue-700"
//               } p-2`}
//               disabled={isLoading || isRedirecting}
//             />
//             {touched.endDate && errors.endDate && (
//               <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               rows="4"
//               placeholder="Enter class description"
//               className={`w-full border-2 ${
//                 touched.description && errors.description
//                   ? "border-red-500"
//                   : "border-blue-700"
//               } p-2`}
//               disabled={isLoading || isRedirecting}
//             />
//             {touched.description && errors.description && (
//               <p className="mt-1 text-xs text-red-500">{errors.description}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <button
//               type="submit"
//               className="w-fit bg-blue-700 font-bold text-white p-2 flex items-center gap-2 disabled:opacity-50"
//               disabled={isLoading || isRedirecting}
//             >
//               {isLoading ? (
//                 <>
//                   <LoadingSpinner />
//                   Creating...
//                 </>
//               ) : (
//                 "Create"
//               )}
//             </button>
//           </div>
//         </form>

//         {mutation.isError && (
//           <p className="text-red-500">Error: {mutation.error.message}</p>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';
import  CreateClass  from "./CreateClass";


 const Class = () => {
  return <>
  <CreateClass/>
  </>
 }

 export default Class;