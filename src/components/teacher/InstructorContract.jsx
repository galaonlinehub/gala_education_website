import { INSTRUCTOR_CONTRACT_KEY } from "@/src/config/settings";
import { sessionStorageFn } from "@/src/utils/fns/client";
import { decrypt, encrypt } from "@/src/utils/fns/encryption";
import { Modal, Typography, Checkbox } from "antd";
import React, { useEffect, useState } from "react";

const { Text, Paragraph } = Typography;

const InstructorContract = () => {
  const [openInstructorContract, setOpenInstructorContract] = useState(false);
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    const contractStatus = sessionStorageFn.get(INSTRUCTOR_CONTRACT_KEY);

    if (contractStatus != null) {
      const isAccepted = decrypt(contractStatus) === "instuctor-accepted";
      if (isAccepted) {
        setOpenInstructorContract(false);
        console.log("accept value is false");
      } else {
        setOpenInstructorContract(true);
        console.log("accept value is true");
      }
    } else {
      setOpenInstructorContract(true);
    }
  }, []);

  const handleAcceptContract = () => {
    const encryptedValue = encrypt("instuctor-accepted");
    sessionStorageFn.set(INSTRUCTOR_CONTRACT_KEY, encryptedValue);
    setOpenInstructorContract(false);
  };

  return (
    <Modal
      title={
        <span className="flex justify-center items-center text-center text-[10px] lg:text-sm font-black">
          GALA HUB COMPANY LIMITED – DIGITAL TEACHER AGREEMENT
        </span>
      }
      centered
      open={openInstructorContract}
      onOk={handleAcceptContract}
      closable={false}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{
        style: checked ? {} : { opacity: 0.7 },
        disabled: !checked,
      }}
      okText={"Continue"}
      styles={{
        body: {
          maxHeight: "80vh",
          overflow: "auto",
          backgroundColor: "#f8f8ff",
          paddingRight: "10px",
          padding: "20px",
        },
      }}
    >
      <Text className="text-[10px] lg:text-xs  self-center flex justify-center mb-5 text-center font-light italic text-blue-400">
        Read and scroll to the bottom to accept the agreement
      </Text>
      <Paragraph className="text-[10px] lg:text-xs text-justify">
        This Digital Teacher Agreement (&quot;Agreement&quot;) is entered into
        and made effective as of the date of electronic acceptance
        (&quot;Effective Date&quot;) by and between:
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        <b>Gala Hub via Gala Education</b>, an online educational platform
        registered under applicable laws, hereinafter referred to as the{" "}
        <b>&quot;Company&quot;</b>, and the individual registering as a student
        on the Gala Education platform, hereinafter referred to as the{" "}
        <b>&quot;Teacher&quot;</b> (collectively, the “Parties”).
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        <b>WHEREAS</b>, Gala Education provides a platform that connects
        teachers with students for live video learning sessions across a variety
        of disciplines;
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        <b>WHEREAS</b>, the Teacher desires to offer instructional services via
        the Gala Education platform and agrees to be bound by the terms and
        conditions herein set forth;
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        <b>NOW, THEREFORE</b>, in consideration of the mutual covenants and
        promises contained herein, the Parties agree as follows:
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        1. Scope of Engagement
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        1.1 The Teacher agrees to provide live video teaching sessions to
        students who enroll in their listed classes on the Gala Education
        platform.
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        1.2 The Teacher retains full control over the content, structure,
        scheduling, and delivery of their classes, subject to compliance with
        Gala Education’s community guidelines and educational standards.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        2. Compensation and Fees
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        2.1 Students shall make full payment for classes directly to the Gala
        Education platform.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify">
        2.2 Following the completion of the scheduled class duration (as
        initially indicated and created by the Teacher), the Teacher shall
        receive payment from Gala Education within{" "}
        <b>twenty-four (24) to forty-eight (48) hours</b> via the mobile{" "}
        <b>money number provided by the Teacher.</b>
      </Text>

      <Text className="text-[10px] lg:text-xs text-justify">
        2.3 A <b>seventeen percent (17%) platform fee</b> shall be deducted by
        the Company from each student payment per class, prior to the
        disbursement of payment to the Teacher.
      </Text>

      <Text className="text-[10px] lg:text-xs text-justify">
        2.4 In cases where a class is canceled due to the Teacher’s absence from
        one or more scheduled sessions, the Company reserves the right to:
      </Text>

      <div className="flex flex-col">
        <Text className="text-[10px] lg:text-xs text-justify">
          {" "}
          - Issue a full refund to all affected students; and
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          {" "}
          - Deduct the equivalent of the 17% platform fee from the Teacher’s
          future earnings as compensation for administrative and operational
          loss.
        </Text>
      </div>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        3. Prohibited Conduct
      </Text>

      <Typography className="flex flex-col text-[10px] lg:text-xs text-justify">
        <Text className="text-[10px] lg:text-xs text-justify font-bold">
          3.1 The Teacher shall not:
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          i. Solicit or attempt to solicit students for private lessons outside
          the Gala Education platform;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          ii. Request or collect personal contact information from students
          including, but not limited to, phone numbers, email addresses, or
          social media handles;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          iii. Create or distribute unauthorized links, groups, or platforms for
          continuing engagement with students beyond Gala Education;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          iv. Share, distribute, or store student personal information in
          violation of data privacy and protection laws.
        </Text>
      </Typography>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        3.2 Any such violation shall constitute a <b>material breach</b> of this
        Agreement and may result in:
      </Text>
      <Typography className="flex flex-col text-[10px] lg:text-xs text-justify">
        <Text className="text-[10px] lg:text-xs text-justify">
          i. <b>Immediate termination</b> of the Teacher’s subscription and
          access to the Gala Education platform;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          ii. <b>Forfeiture of any pending payments;</b>;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          iii. <b>Civil legal action</b> initiated by the Company, including but
          not limited to claims of tortious interference, breach of contract,
          and misappropriation of confidential information;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          iv. <b>Criminal reporting</b> to relevant authorities under applicable
          cybercrime, data protection, and intellectual property laws.
        </Text>
      </Typography>
      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        4. Intellectual Property
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        4.1 The Teacher retains ownership of original teaching content they
        produce. However, by offering such content on the platform, the Teacher
        grants Gala Education a{" "}
        <b>non-exclusive, royalty-free, worldwide license</b> to use, promote,
        display, and host the content for platform functionality and marketing
        purposes.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        5. Limitation of Liability
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        5.1 The Company shall not be liable for any indirect, incidental, or
        consequential damages arising from the Teacher’s use of the platform.
      </Paragraph>
      <Paragraph className="text-[10px] lg:text-xs text-justify">
        5.2 The Teacher shall indemnify and hold harmless Gala Education from
        any claims, losses, damages, liabilities, or legal fees arising from
        their misconduct, content, or interaction with students.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        6. Confidentiality and Data Protection
      </Text>

      <Typography className="flex text-[10px] lg:text-xs text-justify flex-col">
        <Text className="text-[10px] lg:text-xs text-justify font-bold">
          6.1 The Teacher acknowledges that they may have access to confidential
          information including student data and platform analytics. The Teacher
          agrees not to disclose or misuse any such information and to comply
          with all applicable data protection laws.
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          6.2 Breach of confidentiality shall be treated as a serious violation
          and may subject the Teacher to legal action under national and
          international data privacy regulations.
        </Text>
      </Typography>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        7. Termination
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        7.1 Either party may terminate this Agreement with or without cause by
        providing written (or electronic) notice.
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        7.2 Upon termination, all pending payments will be settled within the
        next payment cycle, minus any fees, penalties, or deductions resulting
        from breach or non-performance.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        8. Governing Law and Dispute Resolution
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        8.1 This Agreement shall be governed by and construed in accordance with
        the laws of the United Republic of Tanzania.
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        8.2 Any disputes arising under or in connection with this Agreement
        shall first be attempted to be resolved amicably. Failing such
        resolution, the matter shall be submitted to binding arbitration under
        Tanzanian law.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        9. Entire Agreement
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        9.1 This Agreement constitutes the entire understanding between the
        Parties and supersedes all prior or contemporaneous understandings,
        representations, warranties, or agreements, whether written or oral.
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        9.2 Gala Hub reserves the right to update or amend the terms of this
        Agreement. Continued use of the platform by the Teacher after such
        changes constitutes acceptance of the revised terms.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        10. Electronic Acceptance
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        By checking the box below and clicking “Accept & Continue,” the Teacher
        acknowledges that they have read, understood, and agreed to be legally
        bound by the terms and conditions of this Agreement.
      </Paragraph>

      <div className="mt-8">
        <Paragraph className="text-[10px] lg:text-xs text-justify">
          <b>
            I hereby confirm that I have read, understood, and accept the above
            Agreement and agree to be legally bound by its terms.
          </b>
        </Paragraph>
        <Checkbox
          className="text-[10px] lg:text-xs text-justify flex items-center"
          checked={checked}
          onChange={onChange}
        >
          Accept
        </Checkbox>
      </div>
    </Modal>
  );
};

export default InstructorContract;
