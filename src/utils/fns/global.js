import { apiGet, apiPost } from "@/src/services/api_service";
import { useSearchResult } from "@/src/store/search_result";
import { useEnrolledTopics } from "@/src/store/student/class";
import { useUserTopics } from "@/src/store/user_topics";

export const getUser = async () => {
  try {
    const response = await apiGet("/user");
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.error(`Error has occured, ${e}`);
    throw new Error("Something went wrong, Please try again later");
  }
};

export const getEnrolledTopics = async () => {
  try {
    const response = await apiGet("/enrolled_cohorts");

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching enrolled topics:", error);
  } finally {
  }
};

export const getUserSubTopics = async () => {
  const { setTopicsLoading, setUserTopics } = useUserTopics.getState();
  try {
    setTopicsLoading(true);
    const r = await apiGet("/subtopics");

    if (r.status === 200) {
      setUserTopics(r.data);
    }
  } catch (e) {
    console.log(e, e.message);
  } finally {
    setTopicsLoading(false);
  }
};

export const getInstructorDetails = async (idx) => {
  const { setSearchLoading, setSearchResult } = useSearchResult.getState();
  try {
    setSearchLoading(true);
    const r = await apiGet(`instructor/${idx}`);
    if (r.status === 200) {
      setSearchResult(r.data);
    }
  } catch (e) {
    console.log(e);
  } finally {
    setSearchLoading(false);
  }
};
