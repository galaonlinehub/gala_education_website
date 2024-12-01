import { api } from "@/src/config/settings";
import { useEnrolledTopics } from "@/src/store/student/class";

export const getUserSubject = async () => {
  const fallbackSubjects = [
    { name: "English Grade 1", classSize: 10, days: 30 },
    { name: "Mathematics Grade 7", classSize: 10, days: 30 },
    { name: "Physics Form 1", classSize: 10, days: 30 },
    { name: "Chemistry Form 4", classSize: 10, days: 30 },
  ];

  const { setEnrolledTopics, setLoading, enrolledTopics } =
    useEnrolledTopics.getState();

  try {
    setLoading(true);

    const response = await api.get("/enrolled_topics");

    if (response.status === 200 && response.data !== enrolledTopics) {
      setEnrolledTopics(response.data || fallbackSubjects);
    }
  } catch (error) {
    console.error("Error fetching enrolled topics:", error);
    if (enrolledTopics.length === 0) {
      setEnrolledTopics(fallbackSubjects);
    }
  } finally {
    setLoading(false);
  }
};
