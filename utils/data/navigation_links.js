import { useTranslations } from "next-intl";
import { GiBookshelf } from "react-icons/gi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import {
  LuLayoutDashboard,
  LuLayoutList,
  LuTv,
  LuClock4,
  LuGem,
  LuDiamond,
  LuUserCheck
} from "react-icons/lu";


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

// Hook to get teacher links with translations
export const useTeacherLinks = () => {
  const nbt = useTranslations("nav_links");

  return [
    {
      name: nbt("dashboard"),
      link: ".",
      icon: <LuLayoutDashboard strokeWidth={1.5} />,
    },
    {
      name: nbt("live_classes"),
      link: "live-classes",
      icon: <LuTv strokeWidth={1.5} />,
    },
    {
      name: nbt("chats"),
      link: "social",
      icon: <HiOutlineChatBubbleLeftRight strokeWidth={1.5} />,
    },
    {
      name: nbt("subscriptions"),
      link: "subscriptions",
      icon: <LuGem strokeWidth={1.5} />,
    },
    // {
    //   name: nbt("gala_ai"),
    //   link: "ai",
    //   icon: <LuDiamond strokeWidth={1.5} />,
    // },
    {
      name: nbt("library"),
      link: "library",
      icon: <GiBookshelf strokeWidth={1.5} />,
    },
    {
          name: nbt("attendance"),
          link: "attendance",
          icon: <LuUserCheck strokeWidth={1.5} />,
    },
  ];
};

// Hook to get student links with translations
export const useStudentLinks = () => {
  const nbt = useTranslations("nav_links");

  return [
    {
      name: nbt("dashboard"),
      link: ".",
      icon: <LuLayoutDashboard strokeWidth={1.5} />,
    },
    {
      name: nbt("live_classes"),
      link: "live-lessons",
      icon: <LuTv strokeWidth={1.5} />,
    },
    {
      name: nbt("classes"),
      link: "classes",
      icon: <LuLayoutList strokeWidth={1.5} />,
    },
    {
      name: nbt("chats"),
      link: "social",
      icon: <HiOutlineChatBubbleLeftRight strokeWidth={1.5} />,
    },
    {
      name: nbt("pending"),
      link: "payments",
      icon: <LuClock4 strokeWidth={1.5} />,
    },
    // {
      //   name: nbt("subscriptions"),
      //   link: "subscriptions",
      //   icon: <LuGem strokeWidth={1.5} />,
      // },
      // {
        //   name: nbt("gala_ai"),
        //   link: "ai",
        //   icon: <LuDiamond strokeWidth={1.5} />,
        // },
        {
          name: nbt("library"),
          link: "library",
          icon: <GiBookshelf strokeWidth={1.5} />,
        },
        {
          name: nbt("attendance"),
          link: "attendance",
          icon: <LuUserCheck strokeWidth={1.5} />,
        },
  ];
};
