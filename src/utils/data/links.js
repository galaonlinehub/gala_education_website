import { LiaSchoolSolid } from "react-icons/lia";
import { FaBook, FaNewspaper, FaPeopleRoof, FaUsers } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import {  MdEventAvailable, MdPayment } from "react-icons/md";
import { IoDiamond } from "react-icons/io5";

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
    icon: GoHome,
    link: "/admin",
  },
  {
    name: "Students",
    icon: FaUsers,
    link: "/admin/students",
  },
  {
    name: "Instructors",
    icon: FaPeopleRoof,
    link: "/admin/instructors",
  },
  {
    name: "Partner Schools",
    icon: LiaSchoolSolid,
    link: "/admin/partner-schools",
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
    name: "Subscription",
    icon: IoDiamond,
    link: "/admin/subscriptions",
  },
  {
    name: "Payments",
    icon: MdPayment,
    link: "/admin/payments",
  },
  {
    name: "Logs",
    icon: GrDocumentStore,
    link: "/admin/logs",
  },
];


