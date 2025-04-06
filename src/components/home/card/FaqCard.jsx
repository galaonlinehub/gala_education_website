import React, { useState } from "react";
import { Collapse, Select } from "antd";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import "../../../../app/globals.css";

const { Panel } = Collapse;
const { Option } = Select;

const FaqCard = ({ faqQn, faqAns, bgColor, iconColor, headerColor }) => {
  const [expandIconPosition, setExpandIconPosition] = useState("right");

  const handlePositionChange = (position) => {
    setExpandIconPosition(position);
  };

  const handleCollapseChange = (key) => {
    console.log(key);
  };

  const customExpandIcon = ({ isActive }) => (
    <IoIosArrowDropdownCircle
      style={{
        fontSize: "16px",
        color: iconColor, // Make the icon white
        transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s",
      }}
    />
  );

  return (
    <div className="collapse-container">
      <Collapse
        defaultActiveKey={[]}
        onChange={handleCollapseChange}
        expandIcon={customExpandIcon}
        expandIconPosition={expandIconPosition}
      >
        <Panel
          key="1"
          style={{ backgroundColor: bgColor }}
          header={<span style={{ color: headerColor, fontSize:"12px", fontWeight:"bold" }}>{faqQn}</span>} // Style the header text
        >
          <div className="panel-content font-semibold text-xs">{faqAns}</div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FaqCard;
