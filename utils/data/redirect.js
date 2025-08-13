import { useStudentLinks, useTeacherLinks } from "./navigation_links";

export const roleRedirects = {
  student: "/student",
  instructor: "/instructor",
  admin: "/admin",
  parent: "/parent",
};

// Custom hook to get links based on role
export const useRoleLinks = (role) => {
  const studentLinks = useStudentLinks();
  const teacherLinks = useTeacherLinks();
  
  const links = {
    student: studentLinks,
    instructor: teacherLinks,
    // admin: admin_links, // Add when available
    // parent: parent_links, // Add when available
  };
  
  return links[role] || [];
};

export const TRIAL_ALLOWED_PATHS = (role) => [
  `/${role}`,
  `/${role}/subscriptions`,
];