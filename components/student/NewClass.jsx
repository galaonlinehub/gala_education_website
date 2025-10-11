"use client";

import { Drawer } from "antd";
import {  useTheme } from "antd-style";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

import { TopicCard, TopicCardSkeleton } from "@/components/ui/TopicCard";
import { useSearch } from "@/hooks/data/useSearch";
import { usePaySteps } from "@/store/pay";
import { useSearchResult } from "@/store/search_result";
import { useNewClass } from "@/store/student/class";
import { useEnrollMe } from "@/store/student/useEnrollMe";

import { Payment } from "../pay/Payment";
import {
  InstructorSearchResult,
  InstructorSearchResultSkeleton,
} from "../ui/InstructorSearchResult";

// const useStyle = createStyles(({ token }) => ({
//   "my-drawer-body": {
//     background: token.blue1,
//   },
//   "my-drawer-mask": {
//     boxShadow: `inset 0 0 15px #fff`,
//   },
//   "my-drawer-header": {
//     background: token.green1,
//   },
//   "my-drawer-footer": {
//     color: token.colorPrimary,
//   },
//   "my-drawer-content": {
//     borderLeft: "2px dotted #333",
//   },
// }));

const NewClass = () => {
  const { openNewClass, setOpenNewClass } = useNewClass();
  const { isFetchingResults, detailedResults } = useSearch();
  const { enrollMe, setEnrollMe, setEnrollCohort } = useEnrollMe();
  const { setCurrentStep } = usePaySteps();
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

  // const { styles } = useStyle();
  const token = useTheme();

  // const classNames = {
  //   body: styles["my-drawer-body"],
  //   mask: styles["my-drawer-mask"],
  //   header: styles["my-drawer-header"],
  //   footer: styles["my-drawer-footer"],
  //   content: styles["my-drawer-content"],
  // };

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

  const navt = useTranslations('navbar');

  return (
    <>
      <Drawer
        title={navt('explore_variety')}
        width={enrollMe ? 2220 : 824}
        onClose={onClose}
        open={openNewClass}
        styles={drawerStyles}
        bodyStyle={{ padding: 0 }}
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
