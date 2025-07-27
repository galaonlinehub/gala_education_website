import { CommentOutlined, RobotFilled } from "@ant-design/icons";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
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
  LuGem,
  LuHexagon,
  LuDiamond,
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
    icon: <LuLayoutDashboard strokeWidth={1.5}  />,
  },

  {
    name: "Live Classes",
    link: "live-classes",
    icon: <LuTv  strokeWidth={1.5} />,
  },

  {
    name: "Chats",
    link: "social",
    icon: <HiOutlineChatBubbleLeftRight strokeWidth={1.5}  />,
  },

  {
    name: "Subscriptions",
    link: "subscriptions",
    icon: <LuGem strokeWidth={1.5}  />,
  },
  {
    name: "GalaAI",
    link: "ai",
    icon: <LuDiamond strokeWidth={1.5} />,
  },
  {
    name: "Library",
    link: "library",
    icon: <LuBook strokeWidth={1.5}  />,
  },
];

export const student_links = [
  {
    name: "Dashboard",
    link: ".",
    icon: <LuLayoutDashboard strokeWidth={1.5}  />,
  },
  {
    name: "Live Lessons",
    link: "live-lessons",
    icon: <LuTv strokeWidth={1.5}  />,
  },

  {
    name: "Classes",
    link: "classes",
    icon: <LuLayoutList strokeWidth={1.5} />,
  },

  {
    name: "Chats",
    link: "social",
    icon: <HiOutlineChatBubbleLeftRight strokeWidth={1.5} />,
  },
  {
    name: "Pending",
    link: "payments",
    icon: <LuClock4 strokeWidth={1.5}  />,
  },

  {
    name: "Subscriptions",
    link: "subscriptions",
    icon: <LuGem strokeWidth={1.5}  />,
  },

  {
    name: "GalaAI",
    link: "ai",
    icon: <LuDiamond strokeWidth={1.5}  />,
  },
  // {
  //   name: "My Reviews",
  //   link: "my-reviews",
  //   icon: <MdOutlineInsertComment />,
  // },
  {
    name: "Library",
    link: "library",
    icon: <LuBook strokeWidth={1.5}  />,
  },
];
