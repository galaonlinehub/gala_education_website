"use client";

import { useState, useRef, useEffect } from "react";
import ReadMoreContainer from "@/components/layout/ui/ReadMore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { theme, Spin, Empty, Modal, Form, Input, Button, Row, Col, Select } from "antd";
import "react-calendar/dist/Calendar.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { apiGet, apiPost } from "@/src/services/api_service";

export default function TeacherClasses() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Initialize states without localStorage
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const [specials, setSpecials] = useState([]);
  const [gradeLevels, setLevels] = useState([]);
  const [subjectsData, setSubjects] = useState([]);

  // Move localStorage operations to useEffect to ensure browser environment
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const fetchData = async () => {
        try {
          // Async operations here
          const response = await apiGet("/user");
          const levels = await apiGet("/grade_levels");
          const subjectsData = await apiGet("/subjects");
          const specialNeeds = await apiGet("/special_needs");

          setLevels(levels.data);
          setSubjects(subjectsData.data);
          setSpecials(specialNeeds.data);

          if (!response.data["completed_profile"]) {
            setIsModalVisible(true);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
      // Initialize OTP modal state from localStorage
      const savedOtpModal = localStorage.getItem("showOtpModal") === "true";
      setShowOtpModal(savedOtpModal);
    }
  }, []); // Empty dependency array for initial load only

  // Separate useEffect for updating localStorage when showOtpModal changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("showOtpModal", showOtpModal);
    }
  }, [showOtpModal]);

  const handleFormSubmit = async (values) => {
    console.log("Form values:", values);

    var response = await apiPost("/complete-instructor-profile", values);

    setIsModalVisible(false);
    setShowOtpModal(true);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join("");
    console.log("Verifying OTP:", otpValue);

    // After successful verification:
    if (typeof window !== "undefined") {
      localStorage.removeItem("showOtpModal");
      localStorage.removeItem("hasSubmittedForm");
    }
    setShowOtpModal(false);
  };

  const handleResendCode = () => {
    setOtp(["", "", "", "", "", ""]);
  };

  const mainFormVisible = isModalVisible && !showOtpModal;

  const [date, setDate] = useState(new Date());

  const [seeAll, setSeeAll] = useState(false);

  const queryClient = useQueryClient();

  const router = useRouter();

  const gotoCreateClass = () => {
    router.push("/teacher/create-class");
  };

  const handleSeeAll = () => {
    setSeeAll(!seeAll);
  };

  const {
    data: subtopicData,
    isLoading: isSubtopicLoading,
    error: subtopicError,
  } = useQuery({
    queryKey: ["subtopics"],
    queryFn: async () => {
      const response = await fetch("https://galaweb.galahub.org/api/subtopics");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  const reminders = [
    {
      name: "Eng - Speaking Test",
      time: "10.06.2026",
      day: "Friday",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.9391 0.763359H17.2533C17.271 0.706565 17.2893 0.649771 17.2893 0.58687C17.2893 0.263206 17.0255 0 16.7012 0C16.377 0 16.1144 0.263206 16.1144 0.58687C16.1144 0.649771 16.1315 0.706565 16.1504 0.763359H13.9031C13.9208 0.706565 13.9391 0.649771 13.9391 0.58687C13.9379 0.263206 13.6753 0 13.3504 0C13.0267 0 12.7635 0.263206 12.7635 0.58687C12.7635 0.649771 12.7812 0.706565 12.7995 0.763359H10.5516C10.5693 0.706565 10.587 0.649771 10.587 0.58687C10.587 0.263206 10.3244 0 10.0002 0C9.67588 0 9.41329 0.263206 9.41329 0.58687C9.41329 0.649771 9.43039 0.706565 9.44871 0.763359H7.20077C7.21848 0.706565 7.2368 0.649771 7.2368 0.58687C7.2368 0.263206 6.97359 0 6.64993 0C6.32565 0 6.06245 0.263206 6.06245 0.58687C6.06245 0.649771 6.07955 0.706565 6.09787 0.763359H3.85054C3.86886 0.706565 3.88657 0.649771 3.88657 0.58687C3.88657 0.262595 3.62397 0 3.2997 0C2.97542 0 2.71222 0.263206 2.71222 0.58687C2.71222 0.649771 2.72932 0.706565 2.74764 0.763359H2.06123C1.1342 0.763359 0.381836 1.51634 0.381836 2.44275V18.3206C0.381836 19.2476 1.1342 20 2.06123 20H16.0429L19.6185 16.4244V2.44275C19.6185 1.51695 18.8661 0.763359 17.9391 0.763359ZM18.7024 16.0446L18.5125 16.2345H17.0744C16.4014 16.2345 15.853 16.7841 15.853 17.4559V18.894L15.6631 19.084H2.06123C1.64046 19.084 1.29787 18.7414 1.29787 18.3206V3.05344H18.7024V16.0446Z"
            fill="white"
          />
          <path d="M3.89869 7.19387H4.72067V6.58379H5.08587V5.94074H4.72067V4.26807H3.91579L2.55029 5.89066V6.58379H3.89869V7.19387ZM3.20129 5.94074L3.89869 5.04852V5.94074H3.20129Z" fill="white" />
          <path d="M4.63281 9.2843C4.63281 9.2843 5.69419 11.1487 7.85052 13.3051C7.99587 13.4492 8.13938 13.589 8.28106 13.724C8.24197 13.7551 8.20106 13.7826 8.16442 13.8186C7.72167 14.262 7.72167 14.9802 8.16442 15.4235C8.609 15.8675 9.32655 15.8675 9.76991 15.4235C9.84503 15.3484 9.90243 15.2629 9.9519 15.1756C11.0841 16.0703 11.8633 16.5142 11.8633 16.5142C11.4615 14.5081 13.4395 12.011 14.3006 10.8666C15.6179 9.11575 14.9681 7.58353 14.2701 6.88552C13.5708 6.18689 12.0411 5.53895 10.289 6.85437C9.14335 7.71483 6.64808 9.69407 4.63281 9.2843ZM9.68808 8.27666C10.8221 7.14201 12.1589 6.64063 12.5192 7.00155C12.8801 7.36246 11.2997 7.62078 10.1656 8.75483C9.03159 9.88888 7.30152 10.0104 6.48075 9.72643C7.30457 9.68857 8.55342 9.41132 9.68808 8.27666Z" fill="white" />
        </svg>
      ),
    },
    {
      name: "Eng - Vocabulary Test",
      time: "10.06.2026",
      day: "Friday",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.9391 0.763359H17.2533C17.271 0.706565 17.2893 0.649771 17.2893 0.58687C17.2893 0.263206 17.0255 0 16.7012 0C16.377 0 16.1144 0.263206 16.1144 0.58687C16.1144 0.649771 16.1315 0.706565 16.1504 0.763359H13.9031C13.9208 0.706565 13.9391 0.649771 13.9391 0.58687C13.9379 0.263206 13.6753 0 13.3504 0C13.0267 0 12.7635 0.263206 12.7635 0.58687C12.7635 0.649771 12.7812 0.706565 12.7995 0.763359H10.5516C10.5693 0.706565 10.587 0.649771 10.587 0.58687C10.587 0.263206 10.3244 0 10.0002 0C9.67588 0 9.41329 0.263206 9.41329 0.58687C9.41329 0.649771 9.43039 0.706565 9.44871 0.763359H7.20077C7.21848 0.706565 7.2368 0.649771 7.2368 0.58687C7.2368 0.263206 6.97359 0 6.64993 0C6.32565 0 6.06245 0.263206 6.06245 0.58687C6.06245 0.649771 6.07955 0.706565 6.09787 0.763359H3.85054C3.86886 0.706565 3.88657 0.649771 3.88657 0.58687C3.88657 0.262595 3.62397 0 3.2997 0C2.97542 0 2.71222 0.263206 2.71222 0.58687C2.71222 0.649771 2.72932 0.706565 2.74764 0.763359H2.06123C1.1342 0.763359 0.381836 1.51634 0.381836 2.44275V18.3206C0.381836 19.2476 1.1342 20 2.06123 20H16.0429L19.6185 16.4244V2.44275C19.6185 1.51695 18.8661 0.763359 17.9391 0.763359ZM18.7024 16.0446L18.5125 16.2345H17.0744C16.4014 16.2345 15.853 16.7841 15.853 17.4559V18.894L15.6631 19.084H2.06123C1.64046 19.084 1.29787 18.7414 1.29787 18.3206V3.05344H18.7024V16.0446Z"
            fill="white"
          />
          <path d="M3.89869 7.19387H4.72067V6.58379H5.08587V5.94074H4.72067V4.26807H3.91579L2.55029 5.89066V6.58379H3.89869V7.19387ZM3.20129 5.94074L3.89869 5.04852V5.94074H3.20129Z" fill="white" />
          <path d="M4.63281 9.2843C4.63281 9.2843 5.69419 11.1487 7.85052 13.3051C7.99587 13.4492 8.13938 13.589 8.28106 13.724C8.24197 13.7551 8.20106 13.7826 8.16442 13.8186C7.72167 14.262 7.72167 14.9802 8.16442 15.4235C8.609 15.8675 9.32655 15.8675 9.76991 15.4235C9.84503 15.3484 9.90243 15.2629 9.9519 15.1756C11.0841 16.0703 11.8633 16.5142 11.8633 16.5142C11.4615 14.5081 13.4395 12.011 14.3006 10.8666C15.6179 9.11575 14.9681 7.58353 14.2701 6.88552C13.5708 6.18689 12.0411 5.53895 10.289 6.85437C9.14335 7.71483 6.64808 9.69407 4.63281 9.2843ZM9.68808 8.27666C10.8221 7.14201 12.1589 6.64063 12.5192 7.00155C12.8801 7.36246 11.2997 7.62078 10.1656 8.75483C9.03159 9.88888 7.30152 10.0104 6.48075 9.72643C7.30457 9.68857 8.55342 9.41132 9.68808 8.27666Z" fill="white" />
        </svg>
      ),
    },
    {
      name: "Eng Test",
      time: "10.06.2026",
      day: "Friday",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.9391 0.763359H17.2533C17.271 0.706565 17.2893 0.649771 17.2893 0.58687C17.2893 0.263206 17.0255 0 16.7012 0C16.377 0 16.1144 0.263206 16.1144 0.58687C16.1144 0.649771 16.1315 0.706565 16.1504 0.763359H13.9031C13.9208 0.706565 13.9391 0.649771 13.9391 0.58687C13.9379 0.263206 13.6753 0 13.3504 0C13.0267 0 12.7635 0.263206 12.7635 0.58687C12.7635 0.649771 12.7812 0.706565 12.7995 0.763359H10.5516C10.5693 0.706565 10.587 0.649771 10.587 0.58687C10.587 0.263206 10.3244 0 10.0002 0C9.67588 0 9.41329 0.263206 9.41329 0.58687C9.41329 0.649771 9.43039 0.706565 9.44871 0.763359H7.20077C7.21848 0.706565 7.2368 0.649771 7.2368 0.58687C7.2368 0.263206 6.97359 0 6.64993 0C6.32565 0 6.06245 0.263206 6.06245 0.58687C6.06245 0.649771 6.07955 0.706565 6.09787 0.763359H3.85054C3.86886 0.706565 3.88657 0.649771 3.88657 0.58687C3.88657 0.262595 3.62397 0 3.2997 0C2.97542 0 2.71222 0.263206 2.71222 0.58687C2.71222 0.649771 2.72932 0.706565 2.74764 0.763359H2.06123C1.1342 0.763359 0.381836 1.51634 0.381836 2.44275V18.3206C0.381836 19.2476 1.1342 20 2.06123 20H16.0429L19.6185 16.4244V2.44275C19.6185 1.51695 18.8661 0.763359 17.9391 0.763359ZM18.7024 16.0446L18.5125  16.2345H17.0744C16.4014  16.2345 15.853 16.7841 15.853 17.4559V18.894L15.6631 19.084H2.06123C1.64046 19.084 1.29787 18.7414 1.29787 18.3206V3.05344H18.7024V16.0446Z"
            fill="white"
          />
          <path d="M3.89869 7.19387H4.72067V6.58379H5.08587V5.94074H4.72067V4.26807H3.91579L2.55029 5.89066V6.58379H3.89869V7.19387ZM3.20129 5.94074L3.89869 5.04852V5.94074H3.20129Z" fill="white" />
          <path d="M4.63281 9.2843C4.63281 9.2843 5.69419 11.1487 7.85052 13.3051C7.99587 13.4492 8.13938 13.589 8.28106 13.724C8.24197 13.7551 8.20106 13.7826 8.16442 13.8186C7.72167 14.262 7.72167 14.9802 8.16442 15.4235C8.609 15.8675 9.32655 15.8675 9.76991 15.4235C9.84503 15.3484 9.90243 15.2629 9.9519 15.1756C11.0841 16.0703 11.8633 16.5142 11.8633 16.5142C11.4615 14.5081 13.4395 12.011 14.3006 10.8666C15.6179 9.11575 14.9681 7.58353 14.2701 6.88552C13.5708 6.18689 12.0411 5.53895 10.289 6.85437C9.14335 7.71483 6.64808 9.69407 4.63281 9.2843ZM9.68808 8.27666C10.8221 7.14201 12.1589 6.64063 12.5192 7.00155C12.8801 7.36246 11.2997 7.62078 10.1656 8.75483C9.03159 9.88888 7.30152 10.0104 6.48075 9.72643C7.30457 9.68857 8.55342 9.41132 9.68808 8.27666Z" fill="white" />
        </svg>
      ),
    },
  ];

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: "100%",
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const scrollRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <>
      <Modal title="Just a few more questions before you start your journey." open={isModalVisible} closable={false} maskClosable={false} width={1000} footer={null} keyboard={false} className="persistent-modal">
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <span className="block mb-4">This process ensures that only qualified and experienced teachers gain access to our online community, maintaining the quality and integrity of the platform. It also confirms that teachers are prepared to work with students, including those with disabilities, fostering an inclusive learning environment. Lastly, it verifies background checks to ensure student safety.</span>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                  {
                    validator: async (_, value) => {
                      const phoneRegex = /^\+255[67]\d{8}$/;
                      if (!value) {
                        return Promise.resolve();
                      }
                      if (!phoneRegex.test(value)) {
                        return Promise.reject(new Error("Phone number must start with +255 and be followed by 9 digits starting with 6 or 7"));
                      }
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="language" label="Language(s)" rules={[{ required: true }]} validateStatus={form.getFieldError("language").length > 0 ? "error" : ""} help={form.getFieldError("language")[0]}>
                {/* <Select mode="multiple" placeholder="Select language" options={languages} optionFilterProp="label" allowClear showSearch maxTagCount={3} maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} more`} /> */}
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* <Col span={12}>
              <Form.Item name="experience" label="Years of experience" rules={[{ required: true, message: "Please fill your experience" }]} validateStatus={form.getFieldError("experience").length > 0 ? "error" : ""} help={form.getFieldError("experience")[0]}>
                <Input />
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item name="subjects" label="Subject(s)" rules={[{ required: true }]} validateStatus={form.getFieldError("subject").length > 0 ? "error" : ""} help={form.getFieldError("subject")[0]}>
                {/* <Select mode="multiple" placeholder="Select subjects you can teach" options={subjectOptions} optionFilterProp="label" allowClear showSearch maxTagCount={3} maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} more`} /> */}
                <Select mode="multiple" placeholder="Select special groups you can teach">
                  {subjectsData &&
                    subjectsData.map((subject) => (
                      <Select.Option key={subject.id} value={subject.id}>
                        {subject.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="grade_levels" label="Level(s)" rules={[{ required: true }]} validateStatus={form.getFieldError("level").length > 0 ? "error" : ""} help={form.getFieldError("level")[0]}>
                {/* <Select mode="multiple" placeholder="Select levels you can teach" options={levelOptions} optionFilterProp="label" allowClear showSearch maxTagCount={3} maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} more`} /> */}
                <Select mode="multiple" placeholder="Select levels you can teach">
                  {gradeLevels &&
                    gradeLevels.map((level) => (
                      <Select.Option key={level.id} value={level.id}>
                        {level.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="special_needs" label="Special" rules={[{ required: true }]} validateStatus={form.getFieldError("special").length > 0 ? "error" : ""} help={form.getFieldError("special")[0]}>
                {/* <Select mode="multiple" placeholder="Select special groups you can teach" options={specialGroups} optionFilterProp="label" allowClear showSearch maxTagCount={3} maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} more`} /> */}
                <Select mode="multiple" placeholder="Select special groups you can teach">
                  {specials &&
                    specials.map((special) => (
                      <Select.Option key={special.id} value={special.id}>
                        {special.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Verify OTP" open={showOtpModal} footer={null} closable={false} maskClosable={false} centered width={400}>
        <div className="text-center mb-4">Please enter the verification code sent to your phone number</div>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <Input key={index} ref={(el) => (inputRefs.current[index] = el)} value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} className="w-12 h-12 text-center text-lg" maxLength={1} />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Button type="link" size="small">
            Resend Code
          </Button>
          <Button type="primary" onClick={handleVerifyOtp} disabled={otp.some((digit) => !digit)}>
            Verify
          </Button>
        </div>
      </Modal>

      <div className="flex flex-col lg:flex-row w-full gap-12 justify-between p-6 ">
        <div className="flex flex-col w-full">
          <div className="p-4 z-10 h-fit mt-10 w-full border-blue-600 border-2 rounded-xl flex flex-col relative">
            <div>
              <div className="flex flex-col">
                <div className="font-bold text-sm">Welcome back, Diana Malle!</div>
                <div>
                  <ReadMoreContainer />
                </div>
              </div>
              <div className="absolute -top-16 right-4">
                <Image className="h-auto w-auto" src="/sitting_on_books.png" alt="An image of a character sitting on books" width={130} height={130} />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-4 mt-10">
            <div className="p-4 w-1/2   ">
              <div className="flex flex-col justify-between">
                <h2 className="text-xs font-bold mb-2">Your Subjects</h2>
                <div className="h-80 rounded-lg bg-gray-50 border shadow-xl p-3 overflow-scroll scrollbar-hide">
                  <div className=" text-xs grid grid-cols-2 gap-3">
                    <div className="bg-[#001840] text-white p-2 h-8 items-center flex rounded-md">
                      <span>Mathematics</span>
                    </div>
                    <div className="bg-[#001840] text-white p-2 h-8 items-center flex rounded-md">
                      <span>English</span>
                    </div>
                    <div className="bg-[#001840] text-white p-2 h-8 items-center flex rounded-md">
                      <span>Chemistry</span>
                    </div>
                    <div className="bg-[#001840] text-white p-2 h-8 items-center flex rounded-md">
                      <span>Mathematics</span>
                    </div>
                    <div className="bg-[#001840] text-white p-2 h-8 items-center flex rounded-md">
                      <span>English</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 mb-20 w-1/2">
              <div className="flex justify-between">
                <span className="text-xs font-bold mb-2">Your Classes</span>
                <button onClick={handleSeeAll} className="text-blue-700 font-bold text-xs">
                  See All
                </button>
              </div>
              <div className="overflow-x-auto bg-gray-50 border shadow-xl p-3 rounded-lg h-80">
                <div className="w-full flex flex-col gap-3">
                  <div className="bg-[#001840] w-full flex justify-between items-center font-bold text-xs text-white rounded-md p-1">
                    {["Class", "Start Date", "End Date", "View More"].map((header, index) => (
                      <span key={index} className="text-center py-2 flex-1">
                        {header}
                      </span>
                    ))}
                  </div>
                  {["Math", "English"].map((subject, index) => (
                    <div key={index} className="border-2 border-blue-600 flex items-center justify-between font-bold text-xs rounded-md w-full p-1">
                      <span className="text-center overflow-auto py-1 flex-1">{subject}</span>
                      <span className="text-center overflow-auto py-1 flex-1">10.05.2026</span>
                      <span className="text-center overflow-auto py-1 flex-1">10.06.2026</span>
                      <span className="text-center overflow-auto py-1 flex-1">View</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => setShowSidebar(!showSidebar)} className="fixed bottom-4 right-4 lg:hidden bg-[#001840] text-white p-2 rounded-full z-10" aria-label={showSidebar ? "Hide Sidebar" : "Show Sidebar"}>
          {showSidebar ? "Hide" : "Show"} Sidebar
        </button>
      </div>
    </>
  );
}
