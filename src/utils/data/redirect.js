import { student_links, teacher_links } from "./navigation_links";

export const roleRedirects = {
  student: "/student",
  instructor: "/instructor",
  admin: "/admin",
  parent: "/parent",
};

export const links = {
  student: student_links,
  instructor: teacher_links,
  // admin: admin_links,
  // parent: parent_links,
};


export const TRIAL_ALLOWED_PATHS = (role) => [
  `/${role}/`,
  `/${role}/subscriptions`,
];
