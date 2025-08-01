"use client";
import { Button, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Card1({ image, title, desc, details }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal} className="flex-col cursor-pointer flex md:w-56 lg:min-w-[15rem] md:max-w-[15rem] h-[20rem]  md:h-[12rem] 2xl:w-[400px]  shadow-[0px_2px_2px_rgba(0,0,0,0.3)]">
        <div className="w-full h-[10rem] md:h-[4rem] ">
          <Image alt="image Data" src={image} className="w-full h-full border-white border-[1px] object-cover" width={100} height={100} />
        </div>

        <div className="sm:h-[8rem] h-[10rem] md:h-[10rem] 2xl:h-[10rem]  bg-[#001840] flex flex-col px-4 md:py-4">
          <span className="text-white font-black">{title}</span>
          <span className="text-white text-[12px]">{desc}</span>
        </div>
      </div>

      <Modal title={<div className="text-center font-black">{title}</div>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
       {details}
      </Modal>
    </>
  );
}

export default Card1;
