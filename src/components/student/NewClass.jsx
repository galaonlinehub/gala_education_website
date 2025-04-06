"use client";

import { Drawer } from "antd";
import { useNewClass } from "@/src/store/student/class";
import React, { useEffect } from "react";
import { createStyles, useTheme } from "antd-style";
import { TopicCard, TopicCardSkeleton } from "@/src/components/ui/TopicCard";
import { useSearch } from "@/src/hooks/useSearch";
import {
  InstructorSearchResult,
  InstructorSearchResultSkeleton,
} from "../ui/InstructorSearchResult";
import { useEnrollMe } from "@/src/store/student/useEnrollMe";
import { usePaySteps } from "@/src/store/pay";
import { Payment } from "../Pay/Payment";
import { useSearchResult } from "@/src/store/search_result";

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
  const { isFetchingResults, detailedResults } = useSearch();
  const { enrollMe, setEnrollMe, setEnrollCohort } = useEnrollMe();
  const { currentStep, setCurrentStep } = usePaySteps();
  const { selectedItemId } = useSearchResult();

  const onClose = () => {
    setOpenNewClass(false);
    setEnrollMe(false);
    setCurrentStep(0);
    setEnrollCohort(null);
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
        {selectedItemId.type === "topic" && !enrollMe && (
          <>
            {isFetchingResults
              ? [1, 2, 3].map((i) => <TopicCardSkeleton key={i} />)
              : detailedResults.map((c, idx) => (
                  <TopicCard key={idx} classInfo={c} />
                ))}
          </>
        )}

        {selectedItemId.type === "instructor" && !enrollMe && (
          <>
            {isFetchingResults ? (
              <InstructorSearchResultSkeleton />
            ) : (
              <InstructorSearchResult details={detailedResults} />
            )}
          </>
        )}

        {enrollMe && <Payment />}
      </Drawer>
    </>
  );
};

export default NewClass;
