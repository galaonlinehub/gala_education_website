import { FaChalkboardTeacher, FaDonate, FaUsers, FaBook } from "react-icons/fa";
import {
  MdNotes,
  MdLiveTv,
  MdSettings,
  MdAnalytics,
  MdDashboard,
  MdLibraryAdd,
  MdAssignment,
  MdListAlt,
} from "react-icons/md";
import { LuGift } from "react-icons/lu";

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
      link: "contact_us",
    },
  ],
};

export const teacher_links = [
  {
    name: "Dashboard",
    link: ".",
    icon: <FaChalkboardTeacher />,
  },
  // {
  //   name: "Notes",
  //   link: "notes",
  //   icon: <MdNotes />,
  // },
  {
    name: "Live Class",
    link: "live-class",
    icon: <MdLiveTv />,
  },
  ,
  // {
  //   "name": "Analytics",
  //   "link": "analytics",
  //   "icon": <MdAnalytics />

  // }
  {
    name: "Social",
    link: "social",
    icon: <FaUsers />,
  },

  // {
  //   "name": "Donate",
  //   "link": "donate",
  //   "icon": <FaDonate />

  // },
  // {
  //   "name": "Manage Class",
  //   "link": "manage-class",
  //   "icon": <MdSettings />

  // },
  // {
  //   "name": "Create Class",
  //   "link": "create-class",
  //   "icon": <MdLibraryAdd />

  // },
  {
    name: "Assignments",
    link: "assignments",
    icon: <MdAssignment />,
  },
];

export const student_links = [
  {
    name: "Dashboard",
    link: ".",
    icon: <MdDashboard />,
  },
  {
    name: "Live Lesson",
    link: "live-lesson",
    icon: <MdLiveTv />,
  },

  {
    name: "Classes",
    link: "classes",
    icon: <MdListAlt />,
  },

  // {
  //   name: "Assignments",
  //   link: "assignments",
  //   icon: <FaChalkboardTeacher />,
  // },
  {
    name: "Social",
    link: "social",
    icon: <FaUsers />,
  },

  // {
  //     "name":"Donate",
  //     "link":"donate",
  //     "icon":<LuGift />
  // },
];
