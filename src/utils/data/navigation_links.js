import { CommentOutlined, RobotFilled } from "@ant-design/icons";
import {
  LuBox,
  LuLayoutDashboard,
  LuLayoutList,
  LuListChecks,
  LuTv,
  LuUsers,
  LuClock4,
  LuBrain,
  LuBook,
} from "react-icons/lu";
import { MdOutlineInsertComment } from "react-icons/md";
import { TbHexagon } from "react-icons/tb";

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
    icon: <LuLayoutDashboard />,
  },

  {
    name: "Live Classes",
    link: "live-classes",
    icon: <LuTv />,
  },

  {
    name: "Social",
    link: "social",
    icon: <LuUsers />,
  },

  {
    name: "Subscriptions",
    link: "subscriptions",
    icon: <TbHexagon />,
  },
  {
    name: "GalaAI",
    link: "ai",
    icon: <LuBrain />,
  },
  {
    name: "Library",
    link: "library",
    icon: <LuBook />,
  },
];

export const student_links = [
  {
    name: "Dashboard",
    link: ".",
    icon: <LuLayoutDashboard />,
  },
  {
    name: "Live Lessons",
    link: "live-lessons",
    icon: <LuTv />,
  },

  {
    name: "Classes",
    link: "classes",
    icon: <LuLayoutList />,
  },

  {
    name: "Social",
    link: "social",
    icon: <LuUsers/>
  },
  {
    name: "Awaiting",
    link: "payments",
    icon: <LuClock4 />,
  },

  {
    name: "Subscriptions",
    link: "subscriptions",
    icon: <TbHexagon />,
  },

  {
    name: "GalaAI",
    link: "ai",
    icon: <LuBrain />,
  },
  {
    name: "My Reviews",
    link: "my-reviews",
    icon: <MdOutlineInsertComment />,
  },
  {
    name: "Library",
    link: "library",
    icon: <LuBook />,
  },
];
