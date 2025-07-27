import { Modal, Typography, Checkbox } from "antd";
import React, { useEffect, useState } from "react";

import { STUDENT_CONTRACT_KEY } from "@/src/config/settings";
import { sessionStorageFn } from "@/src/utils/fns/client";
import { decrypt, encrypt } from "@/src/utils/fns/encryption";

const { Text, Paragraph } = Typography;

const StudentContract = () => {
  const [openStudentContract, setOpenStudentContract] = useState(false);
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  useEffect(() => {
    const contractStatus = sessionStorageFn.get(STUDENT_CONTRACT_KEY);

    if (contractStatus != null) {
      const isAccepted = decrypt(contractStatus) === "student-accepted";
      if (isAccepted) {
        setOpenStudentContract(false);
        console.log("accept value is false");
      } else {
        setOpenStudentContract(true);
        console.log("accept value is true");
      }
    } else {
      setOpenStudentContract(true);
    }
  },[]);

  const handleStudentAcceptContract = () => {
    const encryptedValue = encrypt("student-accepted");
    sessionStorageFn.set(STUDENT_CONTRACT_KEY, encryptedValue);
    setOpenStudentContract(false);
  };

  return (
    <Modal
      title={
        <span className="flex justify-center items-center text-center text-[10px] lg:text-sm font-black">
          GALA HUB COMPANY LIMITED – DIGITAL STUDENT USER AGREEMENT
        </span>
      }
      centered
      open={openStudentContract}
      onOk={handleStudentAcceptContract}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{
        style: checked ? {} : { opacity: 0.7 },
        disabled: !checked,
      }}
      okText={"Continue"}
      closable={false}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      styles={{
        body: {
          maxHeight: "80vh",
          overflow: "auto",
          paddingRight: "10px",
          padding: "20px",
        },
      }}
    >
      <Text className="text-xs lg:text-sm text-justify self-center flex justify-center mb-5 font-light italic text-blue-700">
        Read and scroll to the bottom to accept the agreement
      </Text>
      <Paragraph className="text-[10px] lg:text-xs text-justify">
        This Digital Student User Agreement (“Agreement”) is entered into and
        made effective as of the date of electronic acceptance (“Effective
        Date”) by and between:
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        <b>Gala Hub via Gala Education</b>, an online educational platform
        registered under applicable laws, hereinafter referred to as the{" "}
        <b>&quot;Company&quot;</b>, and the individual registering as a student
        on the Gala Education platform, hereinafter referred to as the{" "}
        <b>&quot;Student&quot;</b> (collectively referred to as the “Parties”).
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        <b>WHEREAS</b>, Gala Education facilitates live online learning by
        connecting qualified Teachers with Students across diverse subjects;
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        <b>WHEREAS</b>, the Student seeks to engage in learning sessions
        provided via the Gala Education platform and agrees to adhere to all
        rules, policies, and obligations set forth;
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        <b>NOW, THEREFORE</b>, in consideration of the mutual covenants and
        promises contained herein, the Parties agree as follows:
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        1. Enrollment and Access
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        1.1 The Student may enroll in live video-based classes offered by
        Teachers on the Gala Education platform, subject to payment and
        availability.
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        1.2 Access to classes is granted upon full payment through the Gala
        Education platform. No class participation will be permitted without
        prior payment.
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        1.3 Students are required to attend classes on time, remain respectful,
        and use proper etiquette and conduct during all sessions.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        2. Payments, Refunds, and Cancellations
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        2.1 All payments for classes shall be made directly to the Gala
        Education platform through the available payment methods.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify">
        2.2 Refunds are <b>only applicable</b> under the following conditions:
      </Text>
      <Typography className="flex flex-col text-[10px] lg:text-xs text-justify">
        <Text className="text-[10px] lg:text-xs text-justify">
          i. If a class is canceled by the Teacher;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          ii. If the Teacher fails to attend the scheduled session(s);
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          iii. If technical issues on the platform prevent class delivery (as
          verified by Gala Education support).
        </Text>
      </Typography>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        2.3 In such cases, a <b>full or partial refund</b> may be processed back
        to the Student’s original payment method within{" "}
        <b>7–14 business days</b>, subject to platform verification.
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        2.4 No refunds shall be issued for dissatisfaction with the Teacher’s
        teaching style, misunderstanding of the course outline, or failure to
        attend by the Student.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        3. Prohibited Conduct by Students
      </Text>

      <Typography className="flex flex-col text-[10px] lg:text-xs text-justify">
        <Text className="text-[10px] lg:text-xs text-justify font-bold">
          3.1 Students shall not:
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          i. Request or attempt to communicate with Teachers outside the Gala
          Education platform;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          ii. Share personal contact information with Teachers or request such
          from them (including but not limited to phone numbers, emails, or
          social media handles);
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          iii. Engage in any activity aimed at bypassing the platform for direct
          classes, payment, or collaboration;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          iv. Record, reproduce, or distribute any part of the class without
          written permission from both the Teacher and Gala Education;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          v. Use offensive, disrespectful, or disruptive language during
          sessions.
        </Text>
      </Typography>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        3.2 Violations of any of the above provisions may result in:
      </Text>
      <Typography className="flex flex-col text-[10px] lg:text-xs text-justify">
        <Text className="text-[10px] lg:text-xs text-justify">
          i. <b>Immediate suspension or permanent removal</b> from the Gala
          Education platform;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          ii. <b>Forfeiture of any paid class fees</b>;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          iii. <b>Reporting to legal authorities</b> in the case of criminal
          behavior, harassment, or violation of data protection laws.
        </Text>
      </Typography>
      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        4. Platform Usage and Account Security
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        4.1 Students are responsible for maintaining the confidentiality of
        their login credentials and for all activities conducted through their
        account.
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        4.2 The Student shall not impersonate another user, create fraudulent
        accounts, or attempt to gain unauthorized access to any part of the
        platform.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        5. Intellectual Property
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        5.1 All class content, materials, recordings, and intellectual property
        offered through Gala Education are protected under copyright law.
      </Paragraph>
      <Paragraph className="text-[10px] lg:text-xs text-justify">
        5.2 Students <b>shall not</b> reproduce, sell, or publicly share any
        content without prior written consent from the Teacher and Gala
        Education.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        6. Limitation of Liability
      </Text>

      <Typography className="flex text-[10px] lg:text-xs text-justify flex-col">
        <Text className="text-[10px] lg:text-xs text-justify font-bold">
          6.1 Gala Education shall not be liable for:
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          i. Teacher performance or teaching outcomes;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          ii. Internet or device malfunctions on the Student’s side;
        </Text>
        <Text className="text-[10px] lg:text-xs text-justify">
          iii. Indirect or consequential damages resulting from platform use.
        </Text>
      </Typography>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        6.2 The Student uses the platform at their own risk, and all services
        are provided &quot;as is&quot; without warranties of any kind.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        7. Data Protection and Privacy
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        7.1 The Student’s data shall be collected, stored, and used in
        accordance with Gala Education’s Privacy Policy, which complies with
        applicable data protection laws.
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        7.2 Students must not attempt to extract or misuse information about
        other students or Teachers.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        8. Termination
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        8.1 Gala Education reserves the right to terminate a Student’s access to
        the platform at any time due to violation of any terms outlined herein,
        with or without prior notice.
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        8.2 Upon termination, the Student shall have no entitlement to refunds
        for unused class time or subscriptions.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        9. Governing Law and Dispute Resolution
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        9.1 This Agreement shall be governed and interpreted under the laws of
        the <b>United Republic of Tanzania.</b>
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        9.2 Any disputes or claims shall first be resolved through negotiation
        or mediation. If unresolved, the matter shall be referred to binding
        arbitration in accordance with Tanzanian legal procedures.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        10. Entire Agreement
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        10.1 This Agreement constitutes the full and complete understanding
        between the Parties and supersedes all prior representations or
        agreements, whether oral or written.
      </Paragraph>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        10.2 Gala Education reserves the right to amend this Agreement at any
        time. Continued use of the platform after updates constitutes acceptance
        of the new terms.
      </Paragraph>

      <Text className="text-[10px] lg:text-xs text-justify font-bold">
        11. Electronic Acceptance
      </Text>

      <Paragraph className="text-[10px] lg:text-xs text-justify">
        By checking the box below and clicking “Accept & Join,” the Student{" "}
        <b>confirms they have read, understood, and agreed</b> to be legally
        bound by all terms and conditions of this Agreement.
      </Paragraph>

      <div className="mt-8">
        <Paragraph className="text-[10px] lg:text-xs text-justify">
          <b>
            I hereby confirm that I have read, understood, and accept the Gala
            Education Student Agreement and agree to be legally bound by its
            terms.
          </b>
        </Paragraph>
        <Checkbox
          className="text-[10px] lg:text-xs text-justify flex items-center"
          checked={checked}
          onChange={onChange}
        >
          I accept the contract terms and conditions.
        </Checkbox>
      </div>
    </Modal>
  );
};

export default StudentContract;
