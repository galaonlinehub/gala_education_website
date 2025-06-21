import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "@/src/services/api/api_service";
import { DAYS_MAP } from "../utils/data/days_of_the_week";

export const useCohort = () => {
  const queryClient = useQueryClient();

  const { data: cohorts, isFetching } = useQuery({
    queryKey: ["cohorts"],
    queryFn: getCohortsFn,
    staleTime: 5000,
  });

  const createCohort = useMutation({
    mutationFn: (formData) => postCohortFn(transformFormDataForAPI(formData)),
    onSuccess: (newCohort) => {
      queryClient.invalidateQueries({ queryKey: ["cohorts"] });

      queryClient.setQueryData(["cohorts"], (oldCohorts) => {
        return oldCohorts ? [...oldCohorts, newCohort] : [newCohort];
      });
    },
  });

  return {
    createCohort,
    isFetching,
    cohorts,
  };
};

export const postCohortFn = async (data) => {
  try {
    const r = await apiPost("/cohorts", data);
    if (r.status === 201) {
      return r.data;
    }
    throw new Error("Failed to create cohort");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getCohortsFn = async () => {
  try {
    const r = await apiGet("/cohorts");
    if (r.status === 200) {
      return r.data;
    }
    throw new Error("Failed to fetch cohorts");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getSpecificCohortFn = async (cohortId) => {
  try {
    const r = await apiGet(`cohorts/${cohortId}`);
    if (r.status === 200) {
      return r.data.data;
    }
    throw new Error("Failed to fetch cohorts");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const transformFormDataForAPI = (formData) => {
  const daily_slots = formData.days.map((day, index) => ({
    day_of_week: DAYS_MAP[day],
    start_time: formData.times[index],
    duration: formData.durations[index],
  }));

  return {
    topic_id: formData.topic,
    start_date: formData.startDate,
    end_date: formData.endDate,
    daily_slots,
    description: formData.description,
    price: formData.price,
    subtopics: formData.subtopics
  };
};