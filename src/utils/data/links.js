import { FaBook, FaNewspaper, FaUsers } from "react-icons/fa6";

import { MdDashboard, MdEventAvailable, MdPayment } from "react-icons/md";

export const footer_links = {
  Services: [
    {
      name: "Tutoring",
      link: "tutoring",
    },
    {
      name: "Workshops",
      link: "Workshops",
    },
    {
      name: "Resources",
      link: "Resources",
    },
    {
      name: "Assesments",
      link: "Assesments",
    },
    {
      name: "Mentoring",
      link: "Mentoring",
    },
    {
      name: "Scholarships",
      link: "Scholarships",
    },
    {
      name: "Tutoring",
      link: "tutoring",
    },
    {
      name: "Community",
      link: "Community",
    },
    {
      name: "Support",
      link: "Support",
    },
  ],
  Community: [
    {
      name: "Forums",
      link: "Forums",
    },
    {
      name: "Resources",
      link: "Resources",
    },
    {
      name: "Events",
      link: "Events",
    },
    {
      name: "Mentorship",
      link: "Mentorship",
    },
    {
      name: "Support",
      link: "Support",
    },
    {
      name: "Feedback",
      link: "Feedback",
    },
    {
      name: "Collaboration",
      link: "Collaboration",
    },
  ],
  Help: [
    {
      name: "Support",
      link: "Support",
    },
    {
      name: "Troubleshooting",
      link: "Troubleshooting",
    },
    {
      name: "Contact Us",
      link: `mailto`,
    },
  ],
};



export const adminLinks = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    link: "/admin",
  },
  {
    name: "Users",
    icon: FaUsers,
    link: "/admin/users",
  },
  {
    name: "Subjects",
    icon: FaBook,
    link: "/admin/subjects",
  },
  {
    name: "News",
    icon: FaNewspaper,
    link: "/admin/news",
  },
  {
    name: "Events",
    icon: MdEventAvailable,
    link: "/admin/events",
  },
  {
    name: "Payments",
    icon: MdPayment,
    link: "/admin/payments",
  },
];


