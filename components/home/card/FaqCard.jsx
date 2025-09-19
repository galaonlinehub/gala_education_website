"use client";
import { Collapse } from "antd";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import clsx from "clsx";

const { Panel } = Collapse;

const FaqCard = ({ faqQn, faqAns }) => {
  const customExpandIcon = ({ isActive }) => (
    <IoIosArrowDropdownCircle
      color="#fff"
      className={clsx(
        "text-[16px] text-white transition-transform ease-in-out duration-300",
        isActive ? "rotate-180" : "rotate-0"
      )}
    />
  );

  return (
      <Collapse
        defaultActiveKey={[]}
        expandIcon={customExpandIcon}
        expandIconPosition={"end"}
        className="my-3"
      >
        <Panel
          key="1"
          className="bg-[#001840]"
          header={
            <span className={"text-[12px] font-bold text-white"}>{faqQn}</span>
          }
        >
          <div className="panel-content font-semibold text-xs">{faqAns}</div>
        </Panel>
      </Collapse>
  );
};

export default FaqCard;