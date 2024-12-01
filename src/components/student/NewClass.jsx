import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useNewClass } from "@/src/store/student/class";
import StudentSearch from "./Search";

const { Option } = Select;
const { Search } = Input;

const NewClass = () => {
  const { openNewClass, setOpenNewClass } = useNewClass();
  const onClose = () => {
    setOpenNewClass(false);
  };

  const options = [];
  for (let i = 0; i < 100000; i++) {
    const value = `${i.toString(36)}${i}`;
    options.push({
      label: value,
      value,
      disabled: i === 10,
    });
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Drawer
        title="Create a new class"
        width={720}
        onClose={onClose}
        open={openNewClass}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button onClick={onClose} type="primary">
        //       Submit
        //     </Button>
        //   </Space>
        // }
      >
        {/* <Search
          className="!h-[32rem]"
          placeholder="Search subjects, teachers or topics "
          loading
        /> */}

        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder="Please select"
          defaultValue={["a10", "c12"]}
          onChange={handleChange}
          // options={<div className="bg-red-400 h-[32rem]">HERE</div>}
        />
      </Drawer>
    </>
  );
};
export default NewClass;
