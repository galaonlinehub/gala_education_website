"use client";
import { Collapse } from "antd";
import clsx from "clsx";
import { IoIosArrowDropdownCircle } from "react-icons/io";


const { Panel } = Collapse;

export const FaqCard = ({ faqQn, faqAns }) => {
  const customExpandIcon = ({ isActive }) => (
    <IoIosArrowDropdownCircle
      color="#fff"
      className={clsx(
        'text-[16px] text-white transition-transform ease-in-out duration-300',
        isActive ? 'rotate-180' : 'rotate-0'
      )}
    />
  );

  const items = [
    {
      key: '1',
      label: <span className="text-[12px] font-bold text-white">{faqQn}</span>,
      children: <div className="panel-content font-semibold text-xs">{faqAns}</div>,
      className: 'bg-[#001840]',
    },
  ];

  return (
    <Collapse
      defaultActiveKey={[]}
      expandIcon={customExpandIcon}
      expandIconPosition={'end'}
      className="my-3"
      items={items}
    />
  );
};
``