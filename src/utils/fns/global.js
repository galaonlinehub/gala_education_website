import { apiGet, apiPost } from "@/src/services/api_service";
import useUser from "@/src/store/auth/user";
import { useSearchResult } from "@/src/store/search_result";
import { useEnrolledTopics } from "@/src/store/student/class";
import { useUserTopcs } from "@/src/store/user_topics";

// src/utils/fns/global.js
export const getUser = async () => {
  const { setUser, setLoading } = useUser.getState();
  
  try {
    setLoading(true); // Start loading
    const response = await apiGet("/user");

    if (response.status === 200) {
      setUser(response.data); // This sets loading to false
      return true;
    } else {
      // Explicitly set loading to false when there's no user
      setUser(null);
      setLoading(false);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    setUser(null);
    setLoading(false); // Make sure to set loading to false on error
  } finally{
    setLoading(false);
    }
    return false;
  }
  
 

export const getUserSubject = async () => {
  const { setEnrolledTopics, setLoading, enrolledTopics } =
    useEnrolledTopics.getState();

  try {
    setLoading(true);
    const response = await apiGet("/enrolled_topics");

    if (response.status === 200 && response.data !== enrolledTopics) {
      setEnrolledTopics(response.data);
    }
  } catch (error) {
    console.error("Error fetching enrolled topics:", error);
  } finally {
    setLoading(false);
  }
};

export const getUserTopics = async () => {
  const { setTopicsLoading, setUserTopics } = useUserTopcs.getState();
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

export const logout = async () => {
  try {
    const response = await apiPost("logout");
    if (response.status === 200) {
    }
  } catch (e) {}
};
