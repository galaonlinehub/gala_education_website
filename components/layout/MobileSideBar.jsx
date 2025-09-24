import { Drawer, Avatar, Typography, Divider, Tooltip } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import { LuX, LuUser } from "react-icons/lu";

import { img_base_url } from "@/config/settings";
import { useUser } from "@/hooks/data/useUser";
import { useRoleLinks } from "@/utils/data/redirect";

import { Signout } from "../ui/auth/signup/Signout";

const { Text } = Typography;

const MobileSideBar = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const currentUrl = usePathname();
  const router = useRouter();

  const links = useRoleLinks(user?.role);
  const tdash = useTranslations('teacher_dashboard')
  const ht = useTranslations('home_page')
  const stproft = useTranslations('student_profile')
  const footer = useTranslations('footer')

  const getUserRole = (role) => {
    if (role == 'instructor') {
      return stproft('instructor')
    } else if (role == 'student') {
      return ht('student')
    }
  }

  return (
    <>
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className=" border-2 border-gray-500 rounded-full">
                <Avatar
                  size={54}
                  src={
                    user?.profile_picture &&
                    `${img_base_url + user?.profile_picture}`
                  }
                  icon={<LuUser className="text-black" />}
                  onClick={() => {
                    router.push(`/${user?.role}/profile`);
                    onClose();
                  }}
                />
              </div>
              <div className="flex flex-col">
                <Text className="text-base font-black">
                  {user?.first_name} {user?.last_name}
                </Text>
                <Text className="text-[10px] capitalize font-thin pl-1">
                  {getUserRole(user?.role)}
                </Text>
              </div>
            </div>
            <LuX
              className="text-3xl cursor-pointer hover:bg-gray-800 p-1 rounded-md hover:text-white"
              onClick={onClose}
            />
          </div>
        }
        placement="left"
        onClose={onClose}
        open={isOpen}
        width={380}
        closeIcon={null}
      >
        <ul className="space-y-4">
          {(links || []).map((item, i) => {
            const href = `/${user?.role}${item.link === "." ? "" : `/${item.link}`}`;

            const isActive =
              currentUrl.replace(/\/$/, "") === `/sw/${user?.role}${item.link === "." ? "" : `/${item.link}`}` ||
              currentUrl.replace(/\/$/, "") === `/en/${user?.role}${item.link === "." ? "" : `/${item.link}`}` ||
              // Handle dashboard case
              (item.link === "." && (currentUrl === `/sw/${user?.role}` || currentUrl === `/en/${user?.role}`));

            const hasFreeTrial = user?.has_free_trial;
            const isDashboard = item.link === ".";
            const isSubscriptions = item.link === "subscriptions";
            const isInstructor = user?.role === "instructor";

            const isDisabled =
              isInstructor && hasFreeTrial && !(isDashboard || isSubscriptions);

            return (
              <li key={i}>
                <Tooltip
                  color="#001840"
                  title={isDisabled ? tdash('only_in_premium') : ""}
                >
                  <Link
                    href={href}
                    onClick={(e) => {
                      if (isDisabled) {
                        e.preventDefault();
                      } else onClose();
                    }}
                    className={clsx(
                      "flex items-center gap-4 py-2 px-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-[#001840] text-white"
                        : "hover:bg-blue-950/20 hover:text-black",
                      isDisabled
                        ? "text-gray-400 cursor-not-allowed hover:bg-transparent hover:text-gray-400"
                        : ""
                    )}
                  >
                    <span>
                      {React.isValidElement(item.icon)
                        ? item.icon
                        : React.createElement(item.icon)
                      }
                    </span>
                    <span className="text-sm font-normal">{item.name}</span>
                  </Link>
                </Tooltip>
              </li>
            );
          })}
        </ul>

        <Divider style={{ margin: "12px 0" }} />

        {<Signout onCloseSidebar={onClose} />}

        <div className="pt-4 mt-auto">
          <Text type="secondary" className="text-xs">
            © {new Date().getFullYear()} {footer('all_rights_reserved')}
          </Text>
        </div>
      </Drawer>
    </>
  );
};

export default MobileSideBar;
