"use client";

import { Drawer, Input, Avatar, Badge, Card, Button, Skeleton } from "antd";
import { useNewClass } from "@/src/store/student/class";
import React, { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { CloseOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { FaUsers, FaStar, FaClock } from "react-icons/fa";
import { GoVerified, GoBook } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { FaRegMessage, FaRegClock } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";
import { BsGlobe } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { createStyles, useTheme } from "antd-style";
import Pay from "../pay/Pay";
import { TopicCard, TopicCardSkeleton } from "@/src/components/ui/TopicCard";
import { useSearch } from "@/src/hooks/useSearch";
import {
  InstructorSearchResult,
  InstructorSearchResultSkeleton,
} from "../ui/InstructorSearchResult";
import { useEnrollMe } from "@/src/store/student/useEnrollMe";
import { usePaySteps } from "@/src/store/pay";

const useStyle = createStyles(({ token }) => ({
  "my-drawer-body": {
    background: token.blue1,
  },
  "my-drawer-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
  "my-drawer-header": {
    background: token.green1,
  },
  "my-drawer-footer": {
    color: token.colorPrimary,
  },
  "my-drawer-content": {
    borderLeft: "2px dotted #333",
  },
}));

const NewClass = () => {
  const { openNewClass, setOpenNewClass } = useNewClass();
  const { classResults, isFetchingClasses, clearSearch, refetchClasses } =
    useSearch();
  const { enrollMe, setEnrollMe } = useEnrollMe();
  const { currentStep, setCurrentStep } = usePaySteps();

  const onClose = () => {
    setOpenNewClass(false);
    setEnrollMe(false);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (openNewClass) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.filter = "none";
    };
  }, [openNewClass]);

  const { styles } = useStyle();
  const token = useTheme();

  const classNames = {
    body: styles["my-drawer-body"],
    mask: styles["my-drawer-mask"],
    header: styles["my-drawer-header"],
    footer: styles["my-drawer-footer"],
    content: styles["my-drawer-content"],
  };

  const drawerStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
    content: {
      boxShadow: "-10px 0 10px #666",
    },
    header: {
      borderBottom: `1px solid ${token.colorPrimary}`,
    },
    body: {
      fontSize: token.fontSizeLG,
    },
    footer: {
      borderTop: `1px solid ${token.colorBorder}`,
    },
  };

  return (
    <>
      <Drawer
        title="Explore Classes, Topics, Subtopics and Instructors..."
        width={enrollMe ? 2220 : 824}
        onClose={onClose}
        open={openNewClass}
        styles={drawerStyles}
      >
        {!enrollMe && (
          <>
            {isFetchingClasses
              ? [1, 2, 3].map((i) => <TopicCardSkeleton key={i} />)
              : classResults.map((c, idx) => (
                  <TopicCard key={idx} classInfo={c} />
                ))}
          </>
        )}
        {enrollMe && <Pay />}

        {!true && (
          <>
            {true ? (
              <InstructorSearchResult />
            ) : (
              <InstructorSearchResultSkeleton />
            )}
          </>
        )}
      </Drawer>
    </>
  );
};

export default NewClass;
