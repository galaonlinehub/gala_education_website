import { FaBook, FaNewspaper, FaPeopleRoof, FaUsers } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoDiamond } from "react-icons/io5";
import { LiaSchoolSolid } from "react-icons/lia";
import { MdEventAvailable, MdPayment } from "react-icons/md";

export function getFooterLinks(t) {
  return {
    [t("services")]: [
      { name: t("tutoring"), link: "tutoring" },
      { name: t("workshops"), link: "workshops" },
      { name: t("resources"), link: "resources" },
      { name: t("assessments"), link: "assessments" },
      { name: t("mentoring"), link: "mentoring" },
      { name: t("scholarships"), link: "scholarships" },
      { name: t("community"), link: "community" },
      { name: t("support"), link: "support" }
    ],
    [t("community")]: [
      { name: t("forums"), link: "forums" },
      { name: t("resources"), link: "resources" },
      { name: t("events"), link: "events" },
      { name: t("mentorship"), link: "mentorship" },
      { name: t("support"), link: "support" },
      { name: t("feedback"), link: "feedback" },
      { name: t("collaboration"), link: "collaboration" }
    ],
    [t("help")]: [
      { name: t("support"), link: "support" },
      { name: t("troubleshooting"), link: "troubleshooting" },
      { name: t("contact_us"), link: `mailto` }
    ]
  };
}


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


