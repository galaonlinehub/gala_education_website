"use client";
import { Modal, Typography, Checkbox, Button, Space } from "antd";
import React, { useEffect, useState } from "react";

import { AI_CONTRACT_KEY } from "@/config/settings";
import { sessionStorageFn } from "@/utils/fns/client";
import { decrypt, encrypt } from "@/utils/fns/encryption";

const { Text, Paragraph, Title } = Typography;

const AiUserAgreement = () => {
  const [openAiUserAgreement, setOpenAiUserAgreement] = useState(false);
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  useEffect(() => {
    const contractStatus = sessionStorageFn.get(AI_CONTRACT_KEY);

    if (contractStatus != null) {
      const isAccepted = decrypt(contractStatus) === "ai-user-accepted";
      if (isAccepted) {
        setOpenAiUserAgreement(false);
        console.log("accept value is false");
      } else {
        setOpenAiUserAgreement(true);
        console.log("accept value is true");
      }
    } else {
      setOpenAiUserAgreement(true);
    }
  }, []);

  const handleStudentAcceptContract = () => {
    if (checked) {
      const encryptedValue = encrypt("ai-user-accepted");
      sessionStorageFn.set(AI_CONTRACT_KEY, encryptedValue);
      setOpenAiUserAgreement(false);
    }
  };

  const handleClose = () => {
    // Only allow closing if user has accepted
    if (checked) {
      setOpenAiUserAgreement(false);
    }
  };

  return (
    <Modal
      open={openAiUserAgreement}
      onCancel={handleClose}
      footer={
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <Space direction="vertical" size="middle">
            <Checkbox checked={checked} onChange={onChange}>
              I acknowledge and agree to the terms above.
            </Checkbox>
            <Button
              type="primary"
              onClick={handleStudentAcceptContract}
              disabled={!checked}
              size="large"
            >
              Accept Agreement
            </Button>
          </Space>
        </div>
      }
      width={800}
      style={{ maxHeight: "80vh", overflowY: "auto" }}
      closable={checked}
      maskClosable={false}
    >
      <div style={{ maxHeight: "60vh", overflowY: "auto", padding: "0 8px" }}>
        <Typography>
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            GALA EDUCATION - GalaAI DIGITAL USER AGREEMENT
          </Title>

          <Text className="text-xs lg:text-sm  self-center flex justify-center mb-5 text-center font-semibold text-blue-700">
            Read and scroll to the bottom to accept the agreement
          </Text>

          <Paragraph>
            <strong>Effective Date:</strong> Ongoing
            <br />
            <strong>Issued By:</strong> Galahub Company Limited (hereinafter
            &quot;Gala Education&quot;)
            <br />
            <strong>Applies To:</strong> All users of GalaAI (students,
            teachers, and institutional partners)
            <br />
            <strong>Jurisdiction:</strong> United Republic of Tanzania
          </Paragraph>

          <Paragraph>
            This Digital User Agreement (&quot;Agreement&quot;) governs your use
            of GalaAI, an AI-powered academic assistance platform owned and
            operated by Gala Education. By accessing or using GalaAI in any way,
            you consent to the terms and conditions of this Agreement.
          </Paragraph>

          <Title level={4}>1. GENERAL TERMS</Title>

          <Paragraph>
            <strong>1.1 Introduction</strong>
          </Paragraph>
          <Paragraph>
            GalaAI is an educational artificial intelligence system designed to
            support academic learning, exam preparation, content creation, and
            classroom productivity for students and educators. Use of GalaAI is
            strictly limited to academic and educational purposes.
          </Paragraph>

          <Paragraph>
            <strong>1.2 Legal Capacity</strong>
          </Paragraph>
          <Paragraph>By using this service, you affirm that:</Paragraph>
          <ul>
            <li>
              You are at least 13 years of age, or have obtained verifiable
              consent from a parent or guardian if under 18.
            </li>
            <li>
              You are competent under Tanzanian law to enter into this legally
              binding agreement.
            </li>
            <li>
              You are acting on your own behalf or as an authorized
              representative of an educational institution.
            </li>
          </ul>

          <Title level={4}>2. ACCEPTABLE USE POLICY</Title>

          <Paragraph>
            <strong>2.1 Purpose of Use</strong>
          </Paragraph>
          <Paragraph>
            You agree to use GalaAI strictly for lawful, educational, and
            academic purposes. GalaAI is not intended for commercial
            exploitation, entertainment unrelated to education, or professional
            consulting.
          </Paragraph>

          <Paragraph>
            <strong>2.2 Prohibited Conduct</strong>
          </Paragraph>
          <Paragraph>The following actions are strictly prohibited:</Paragraph>
          <ul>
            <li>
              2.2.1 Using GalaAI to cheat on exams, tests, or assignments, or to
              submit AI-generated work in violation of your academic
              institution&apos;s rules.
            </li>
            <li>
              2.2.2 Uploading or inputting illegal, defamatory, sexually
              explicit, discriminatory, or misleading content.
            </li>
            <li>
              2.2.3 Attempting to reverse-engineer, copy, sell, distribute, or
              otherwise exploit GalaAI technologies or its outputs.
            </li>
            <li>
              2.2.4 Circumventing any access controls or security features
              within the GalaAI system.
            </li>
            <li>
              2.2.5 Using GalaAI to generate, distribute, or promote
              misinformation, hate speech, or violence.
            </li>
          </ul>

          <Paragraph>
            <strong>2.3 Compliance with Academic Policies</strong>
          </Paragraph>
          <Paragraph>
            Users remain fully responsible for complying with the codes of
            conduct and academic honesty policies of their educational
            institutions. GalaAI outputs are not guaranteed to meet any
            institution&apos;s originality, referencing, or assessment
            standards.
          </Paragraph>

          <Title level={4}>3. DATA PRIVACY AND COLLECTION</Title>

          <Paragraph>
            <strong>3.1 Data Processing and Storage</strong>
          </Paragraph>
          <Paragraph>GalaAI may collect and process data such as:</Paragraph>
          <ul>
            <li>Text inputs and prompts submitted by users;</li>
            <li>Usage metrics and interaction logs;</li>
            <li>Non-personal metadata for system performance.</li>
          </ul>
          <Paragraph>
            All personal data is processed in accordance with the{" "}
            <strong>Tanzania Data Protection Act, 2022</strong>. Gala Education
            commits to not selling, leasing, or trading any user data to third
            parties.
          </Paragraph>

          <Paragraph>
            <strong>3.2 Data Anonymization</strong>
          </Paragraph>
          <Paragraph>
            Data collected through GalaAI may be anonymized and used to train or
            improve AI models. Such data shall be stripped of personally
            identifiable information before being used for research, monitoring,
            or development purposes.
          </Paragraph>

          <Paragraph>
            <strong>3.3 No Surveillance or Monitoring</strong>
          </Paragraph>
          <Paragraph>
            Gala Education does not access or monitor individual sessions in
            real time unless required by law, court order, or to investigate
            suspected abuse or violations of this Agreement.
          </Paragraph>

          <Title level={4}>4. INTELLECTUAL PROPERTY</Title>

          <Paragraph>
            <strong>4.1 Ownership</strong>
          </Paragraph>
          <Paragraph>
            All underlying technology, algorithms, interfaces, training
            datasets, branding, and content of GalaAI remain the exclusive
            property of Gala Education. This includes any improvements or
            derivatives made during your use of the system.
          </Paragraph>

          <Paragraph>
            <strong>4.2 Limited License to Users</strong>
          </Paragraph>
          <Paragraph>
            You are granted a limited, revocable, non-exclusive, and
            non-transferable license to use GalaAI for academic purposes only.
            This license does not grant any ownership rights over the AI or its
            outputs.
          </Paragraph>

          <Paragraph>
            <strong>4.3 User Content</strong>
          </Paragraph>
          <Paragraph>
            You retain ownership of any original material you input into GalaAI.
            However, you grant Gala Education a royalty-free, worldwide license
            to use your input and generated outputs for internal improvement,
            safety, and audit purposes.
          </Paragraph>

          <Title level={4}>5. LIMITATION OF LIABILITY</Title>

          <Paragraph>
            <strong>5.1 As-Is Basis</strong>
          </Paragraph>
          <Paragraph>
            GalaAI is provided &quot;as-is&quot; and &quot;as-available.&quot;
            Gala Education makes no warranties, expressed or implied, regarding:
          </Paragraph>
          <ul>
            <li>
              The accuracy, completeness, or timeliness of AI-generated content.
            </li>
            <li>Fitness for a particular academic or educational purpose.</li>
            <li>Continuous availability or error-free operation.</li>
          </ul>

          <Paragraph>
            <strong>5.2 Disclaimer of Damages</strong>
          </Paragraph>
          <Paragraph>
            To the maximum extent allowed by Tanzanian law, Gala Education shall
            not be liable for:
          </Paragraph>
          <ul>
            <li>
              Any indirect, incidental, special, or consequential damages.
            </li>
            <li>
              Academic penalties, expulsion, or disciplinary actions taken due
              to misuse of AI-generated work.
            </li>
            <li>Data loss, account suspension, or system downtime.</li>
          </ul>

          <Title level={4}>6. INDEMNIFICATION</Title>

          <Paragraph>
            <strong>6.1 User Responsibility</strong>
          </Paragraph>
          <Paragraph>
            You agree to indemnify and hold harmless Gala Education, its
            directors, employees, affiliates, and partners against any legal
            claim or liability resulting from:
          </Paragraph>
          <ul>
            <li>Your misuse of GalaAI;</li>
            <li>Your breach of this Agreement;</li>
            <li>
              Any violation of academic, institutional, or national legal
              standards due to use of AI outputs.
            </li>
          </ul>

          <Title level={4}>7. TERMINATION AND SUSPENSION</Title>

          <Paragraph>
            <strong>7.1 Account Suspension</strong>
          </Paragraph>
          <Paragraph>
            Gala Education may suspend or permanently restrict your access to
            GalaAI without prior notice if:
          </Paragraph>
          <ul>
            <li>You breach any part of this Agreement;</li>
            <li>
              You use the system in a way that endangers the security or
              reliability of the platform;
            </li>
            <li>Required by law enforcement or judicial orders.</li>
          </ul>

          <Paragraph>
            <strong>7.2 Termination of Agreement</strong>
          </Paragraph>
          <Paragraph>
            This Agreement remains valid indefinitely unless:
          </Paragraph>
          <ul>
            <li>You permanently cease using GalaAI;</li>
            <li>Gala Education discontinues the platform entirely;</li>
            <li>Terminated by Gala Education for cause.</li>
          </ul>

          <Title level={4}>8. GOVERNING LAW AND JURISDICTION</Title>

          <Paragraph>
            <strong>8.1 Applicable Law</strong>
          </Paragraph>
          <Paragraph>
            This Agreement is governed by the laws of the United Republic of
            Tanzania, including but not limited to:
          </Paragraph>
          <ul>
            <li>The Law of Contract Act, Cap 345;</li>
            <li>The Electronic Transactions Act, 2015;</li>
            <li>The Data Protection Act, 2022.</li>
          </ul>

          <Paragraph>
            <strong>8.2 Jurisdiction</strong>
          </Paragraph>
          <Paragraph>
            All disputes arising under or related to this Agreement shall be
            subject to the exclusive jurisdiction of the courts of Tanzania, and
            you hereby submit to the same.
          </Paragraph>

          <Title level={4}>9. MODIFICATIONS TO TERMS</Title>

          <Paragraph>
            <strong>9.1 Right to Revise</strong>
          </Paragraph>
          <Paragraph>
            Gala Education reserves the right to revise this Agreement at any
            time. Any changes will be effective immediately upon publication on
            the Gala Education platform or via in-app notifications.
          </Paragraph>

          <Paragraph>
            <strong>9.2 Continued Use</strong>
          </Paragraph>
          <Paragraph>
            Your continued access or use of GalaAI following any modifications
            constitutes your binding acceptance of the updated terms.
          </Paragraph>

          <Title level={4}>10. ENTIRE AGREEMENT</Title>

          <Paragraph>
            <strong>10.1 Binding Nature</strong>
          </Paragraph>
          <Paragraph>
            This Agreement constitutes the entire understanding between you and
            Gala Education regarding your use of GalaAI. It supersedes all prior
            oral or written communications.
          </Paragraph>

          <Paragraph>
            <strong>10.2 Severability</strong>
          </Paragraph>
          <Paragraph>
            If any provision in this Agreement is found to be unlawful or
            unenforceable under Tanzanian law, the remaining provisions shall
            remain valid and enforceable.
          </Paragraph>

          <Title level={4}>11. ACKNOWLEDGMENT AND CONSENT</Title>

          <Paragraph>By using GalaAI, you acknowledge that:</Paragraph>
          <ol>
            <li>
              You have read, understood, and agreed to be bound by this
              Agreement;
            </li>
            <li>
              You release Gala Education from any liability associated with your
              use of the AI;
            </li>
            <li>
              This Agreement remains in force for as long as you use the GalaAI
              system, regardless of updates or changes.
            </li>
          </ol>
        </Typography>
      </div>
    </Modal>
  );
};

export default AiUserAgreement;
