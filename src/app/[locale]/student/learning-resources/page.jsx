'use client';
import { useGrade } from '@/hooks/data/useGrade';
import { useMaterials } from '@/hooks/data/useMaterials';
import { useSubject } from '@/hooks/data/useSubject';
import { RequestMaterialModal } from '@/src/components/student/RequestMaterialModal';
import { ResourceCard } from '@/src/components/student/ResourceCard';
import { Button, Input, Select } from 'antd';
import { useMemo, useState } from 'react';
import { FaFilter, FaPlus, FaSearch } from 'react-icons/fa';
import { FiBookOpen, FiFileText, FiVideo } from 'react-icons/fi';

const TABS = [
  { id: 'notes', label: 'Notes', icon: <FiBookOpen /> },
  { id: 'past_paper', label: 'Past Papers', icon: <FiFileText /> },
  { id: 'videos', label: 'Videos', icon: <FiVideo /> },
];

export default function StudentLearningPortal() {
  const [activeTab, setActiveTab] = useState('notes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch grades and subjects from API
  const { grades, isGradesPending } = useGrade();
  const { subjects, isLoading: isLoadingSubjects } = useSubject();

  // Find grade and subject IDs from selected names
  const selectedGradeId = useMemo(() => {
    if (selectedGrade === 'All Grades' || !grades || !Array.isArray(grades)) {
      return null;
    }
    const grade = grades.find((g) => g.name === selectedGrade);
    return grade?.id || null;
  }, [selectedGrade, grades]);

  const selectedSubjectId = useMemo(() => {
    if (selectedSubject === 'All Subjects' || !subjects || !Array.isArray(subjects)) {
      return null;
    }
    const subject = subjects.find((s) => s.name === selectedSubject);
    return subject?.id || null;
  }, [selectedSubject, subjects]);

  // Fetch materials based on active tab, grade, and subject (filtered on backend)
  const { materials, materialsLoading, isError } = useMaterials(
    activeTab,
    selectedGradeId,
    selectedSubjectId
  );

  // Prepare grade options for Select
  const gradeOptions = useMemo(() => {
    const options = [{ value: 'All Grades', label: 'All Grades' }];
    if (grades && Array.isArray(grades)) {
      grades.forEach((grade) => {
        options.push({
          value: grade.name,
          label: grade.name,
        });
      });
    }
    return options;
  }, [grades]);

  // Prepare subject options for Select
  const subjectOptions = useMemo(() => {
    const options = [{ value: 'All Subjects', label: 'All Subjects' }];
    if (subjects) {
      subjects.forEach((subject) => {
        options.push({
          value: subject.name,
          label: subject.name,
        });
      });
    }
    return options;
  }, [subjects]);

  // Filter materials by search query only (grade and subject are filtered on backend)
  const filteredResources = (materials || []).filter((resource) => {
    if (!searchQuery) return true;

    const matchesSearch =
      (resource.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.subject?.name || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
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
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-6 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-[#001840] shadow-sm scale-[1.02]'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
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
                loading={isLoadingSubjects}
                options={subjectOptions}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#001840]">Grade Level</label>
              <Select
                defaultValue="All Grades"
                className="w-full h-10"
                onChange={setSelectedGrade}
                loading={isGradesPending}
                options={gradeOptions}
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
                    description={resource.description || resource.topic?.title || 'No description'}
                    subject={resource.subject?.name || 'General'}
                    grade={resource.grade_level?.name || 'All Grades'}
                    date={new Date(resource.created_at).toLocaleDateString()}
                    pages_duration={
                      resource.file_size ? `${(resource.file_size / 1024).toFixed(1)} KB` : 'N/A'
                    }
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
                We couldn't find matches for your current filters. Try adjusting your search query
                or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
