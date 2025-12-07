"use client";
import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { FiBookOpen, FiFileText, FiVideo } from "react-icons/fi";
import { ResourceCard } from "@/src/components/student/ResourceCard";
import { RequestMaterialModal } from "@/src/components/student/RequestMaterialModal";
import { useMaterials } from "@/hooks/data/useMaterials";

const TABS = [
    { id: "notes", label: "Notes", icon: <FiBookOpen /> },
    { id: "past_paper", label: "Past Papers", icon: <FiFileText /> },
    { id: "videos", label: "Videos", icon: <FiVideo /> },
];


export default function StudentLearningPortal() {
    const [activeTab, setActiveTab] = useState("notes");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All Subjects");
    const [selectedGrade, setSelectedGrade] = useState("All Grades");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch materials based on active tab
    const { materials, materialsLoading, isError } = useMaterials(activeTab);

    // Filter the fetched materials
    const filteredResources = (materials || []).filter((resource) => {
        const matchesSearch =
            (resource.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (resource.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (resource.subject?.name || "").toLowerCase().includes(searchQuery.toLowerCase());

        const subjectName = resource.subject?.name || "";
        const matchesSubject = selectedSubject === "All Subjects" || subjectName === selectedSubject;

        const gradeName = resource.grade_level?.name || "Grade not specified";
        const matchesGrade = selectedGrade === "All Grades" || (resource.grade_level?.name === selectedGrade);

        return matchesSearch && matchesSubject && matchesGrade;
    });

    return (
        <div className="min-h-screen bg-[#F0F4FA] p-4 lg:p-8 font-sans">
            <RequestMaterialModal open={isModalOpen} onCancel={() => setIsModalOpen(false)} />
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-[#001840] mb-1">
                            Student Learning Portal
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base">
                            Access your study materials, past papers, and video lectures
                        </p>
                    </div>
                    <Button
                        type="primary"
                        icon={<FaPlus />}
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#001840] hover:bg-[#002a6e] border-none h-10 px-6 font-bold rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20"
                    >
                        Request Material
                    </Button>
                </div>

    
                <div className="bg-gray-200 p-1 rounded-full flex overflow-x-auto">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-6 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === tab.id
                                ? "bg-white text-[#001840] shadow-sm scale-[1.02]"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                                }`}
                        >
                            {tab.icon}
                            <span className="whitespace-nowrap">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Filters & Search Card */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 text-[#001840] font-bold text-sm mb-2">
                        <FaFilter />
                        <span>Filters</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-[#001840]">Subject</label>
                            <Select
                                defaultValue="All Subjects"
                                className="w-full h-10"
                                onChange={setSelectedSubject}
                                options={[
                                    { value: "All Subjects", label: "All Subjects" },
                                    { value: "Mathematics", label: "Mathematics" },
                                    { value: "Chemistry", label: "Chemistry" },
                                    { value: "Physics", label: "Physics" },
                                    { value: "Biology", label: "Biology" },
                                    { value: "History", label: "History" },
                                    { value: "English", label: "English" },
                                ]}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-[#001840]">Grade Level</label>
                            <Select
                                defaultValue="All Grades"
                                className="w-full h-10"
                                onChange={setSelectedGrade}
                                options={[
                                    { value: "All Grades", label: "All Grades" },
                                    { value: "Grade 9", label: "Grade 9" },
                                    { value: "Grade 10", label: "Grade 10" },
                                    { value: "Grade 11", label: "Grade 11" },
                                    { value: "Grade 12", label: "Grade 12" },
                                ]}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-[#001840]">Search</label>
                            <Input
                                placeholder="Search..."
                                prefix={<FaSearch className="text-gray-300" />}
                                className="w-full h-10 rounded-lg"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Resources Grid */}
                <div className="min-h-[400px]">
                    {filteredResources.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredResources.map((resource) => (
                                <div key={resource.id} className="h-full">
                                    <ResourceCard
                                        title={resource.title || resource.file_name}
                                        description={resource.description || resource.topic?.title || "No description"}
                                        subject={resource.subject?.name || "General"}
                                        grade={resource.grade_level?.name || "All Grades"}
                                        date={new Date(resource.created_at).toLocaleDateString()}
                                        pages_duration={resource.file_size ? `${(resource.file_size / 1024).toFixed(1)} KB` : "N/A"}
                                        link={resource.file_url}
                                        download_link={resource.file_url}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="bg-gray-100 p-6 rounded-full mb-4">
                                <FaSearch className="text-4xl text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-[#001840] mb-2">No resources found</h3>
                            <p className="text-gray-500 text-sm max-w-md">
                                We couldn't find matches for your current filters. Try adjusting your search query or filters.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
