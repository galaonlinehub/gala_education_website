import { useQuery } from '@tanstack/react-query';

import { apiGet } from '@/services/api/api_service';

const getMaterials = async (type = 'notes', gradeId = null, subjectId = null) => {
  try {
    let url = `/study-materials?type=${type}`;

    if (gradeId) {
      url += `&grade_level_id=${gradeId}`;
    }

    if (subjectId) {
      url += `&subject_id=${subjectId}`;
    }

    const response = await apiGet(url);
    return response?.data || [];
  } catch (error) {
    console.error('Error fetching materials:', error);
    return [];
  }
};

export const useMaterials = (type = 'notes', gradeId = null, subjectId = null) => {
  const { data, isError, isPending } = useQuery({
    queryKey: ['get-materials', type, gradeId, subjectId],
    queryFn: () => getMaterials(type, gradeId, subjectId),
    // ...globalOptions,
  });

  return {
    materials: data?.data || [],
    meta: data?.meta || {},
    materialsLoading: isPending,
    isError,
  };
};

export default useMaterials;
