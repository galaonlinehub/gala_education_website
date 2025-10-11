"use client";
import React, { useState } from "react";

import { MAIN_EMAIL, SUPPORT_DESK } from "@/config/settings";

const TermsAndPrivacyPreview = () => {
  const [activeTab, setActiveTab] = useState("terms");

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 max-w-5xl -mt-8">
      <span className="text-xl lg:text-3xl font-bold text-center mb-4 lg:mb-8 w-full flex flex-wrap items-center justify-center">
        Galahub Company Ltd
        <span className="ml-2">(Gala Education)</span>
      </span>

      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`py-3 px-6 font-medium text-sm lg:text-lg ${
            activeTab === "terms"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("terms")}
        >
          Terms of Service
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm lg:text-lg ${
            activeTab === "privacy"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("privacy")}
        >
          Privacy Policy
        </button>
      </div>

      {activeTab === "terms" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-medium mb-3">1. Introduction</h3>
            <p className="text-gray-700 ml-5">
              Welcome to Gala Education. By accessing or using our services,
              including our website and mobile application (collectively, the
              &quot;Platform&quot;), you agree to comply with and be bound by
              these Terms of Service (&quot;Terms&quot;). If you do not agree
              with any part of these Terms, please do not use the Platform.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">2. Use of the Platform</h3>
            <div className="ml-5 space-y-3">
              <div>
                <h4 className="font-medium">2.1 Eligibility:</h4>
                <p className="text-gray-700 ml-5">
                  You must be at least 18 years old or have parental consent to
                  use our Platform.
                </p>
              </div>
              <div>
                <h4 className="font-medium">2.2 Account Responsibility:</h4>
                <p className="text-gray-700 ml-5">
                  You are responsible for maintaining the confidentiality of
                  your account information and for all activities that occur
                  under your account.
                </p>
              </div>
              <div>
                <h4 className="font-medium">2.3 Prohibited Activities:</h4>
                <p className="text-gray-700 ml-5">
                  You agree not to engage in any activities that are illegal,
                  harmful, or disruptive to the Platform or other users. This
                  includes, but is not limited to, hacking, spamming, and
                  transmitting harmful or fraudulent content.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">
              3. Intellectual Property
            </h3>
            <div className="ml-5 space-y-3">
              <div>
                <h4 className="font-medium">3.1 Ownership:</h4>
                <p className="text-gray-700 ml-5">
                  All content, materials, and resources on the Platform,
                  including but not limited to instructional videos, course
                  outlines, and library resources, are the intellectual property
                  of Gala Education or its licensors and are protected by
                  copyright, trademark, and other intellectual property laws.
                </p>
              </div>
              <div>
                <h4 className="font-medium">3.2 Usage:</h4>
                <p className="text-gray-700 ml-5">
                  You may use the content for personal, non-commercial
                  educational purposes only. Reproduction, distribution, or
                  modification of any content without prior written permission
                  from Gala Education is prohibited.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">4. Courses and Content</h3>
            <div className="ml-5 space-y-3">
              <div>
                <h4 className="font-medium">4.1 Course Enrollment:</h4>
                <p className="text-gray-700 ml-5">
                  Enrollment in courses is subject to availability and meeting
                  any prerequisite requirements. Gala Education reserves the
                  right to modify or cancel courses at its discretion.
                </p>
              </div>
              <div>
                <h4 className="font-medium">4.2 Content Accuracy:</h4>
                <p className="text-gray-700 ml-5">
                  While we strive to ensure that all course materials and
                  resources are accurate and up-to-date, we do not guarantee the
                  accuracy, completeness, or reliability of any content.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">
              5. Payments and Refunds
            </h3>
            <div className="ml-5 space-y-3">
              <div>
                <h4 className="font-medium">5.1 Fees:</h4>
                <p className="text-gray-700 ml-5">
                  Course fees, subscription costs, and other charges are
                  specified on the Platform. By enrolling in a course or
                  purchasing any service, you agree to pay all applicable fees.
                </p>
              </div>
              <div>
                <h4 className="font-medium">5.2 Refunds:</h4>
                <p className="text-gray-700 ml-5">
                  Refund policies for courses and services are detailed on the
                  Platform. Refunds are typically granted under specific
                  conditions, which may include a specified time frame and other
                  criteria.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">6. Termination</h3>
            <div className="ml-5 space-y-3">
              <div>
                <h4 className="font-medium">6.1 Termination by You:</h4>
                <p className="text-gray-700 ml-5">
                  You may terminate your account at any time by following the
                  instructions provided on the Platform.
                </p>
              </div>
              <div>
                <h4 className="font-medium">
                  6.2 Termination by Gala Online Academy:
                </h4>
                <p className="text-gray-700 ml-5">
                  We reserve the right to terminate or suspend your account and
                  access to the Platform if you violate these Terms or engage in
                  conduct that we deem inappropriate.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">
              7. Limitation of Liability
            </h3>
            <p className="text-gray-700 ml-5">
              Gala Education is not liable for any indirect, incidental, or
              consequential damages arising from your use of the Platform. Our
              liability is limited to the maximum extent permitted by law.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">8. Changes to Terms</h3>
            <p className="text-gray-700 ml-5">
              We may update these Terms from time to time. Changes will be
              effective immediately upon posting on the Platform. Your continued
              use of the Platform constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">9. Governing Law</h3>
            <p className="text-gray-700 ml-5">
              These Terms are governed by and construed in accordance with the
              laws of the United Republic of Tanzania, without regard to its
              conflict of law principles.
            </p>
          </section>
        </div>
      )}

      {/* Privacy Policy Content */}
      {activeTab === "privacy" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-medium mb-3">1. Introduction</h3>
            <p className="text-gray-700 ml-5">
              Gala Education is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your personal information when you use our Platform. By
              using our Platform, you consent to the practices described in this
              Policy.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">
              2. Information We Collect
            </h3>
            <div className="ml-5 space-y-3">
              <div>
                <h4 className="font-medium">2.1 Personal Information:</h4>
                <p className="text-gray-700 ml-5">
                  We collect personal information that you provide to us
                  directly, such as your name, email address, phone number, and
                  payment information when you enroll in courses or create an
                  account.
                </p>
              </div>
              <div>
                <h4 className="font-medium">2.2 Usage Data:</h4>
                <p className="text-gray-700 ml-5">
                  We collect information about your interactions with the
                  Platform, including your IP address, browser type, device
                  information, and usage patterns.
                </p>
              </div>
              <div>
                <h4 className="font-medium">
                  2.3 Cookies and Tracking Technologies:
                </h4>
                <p className="text-gray-700 ml-5">
                  We use cookies and similar tracking technologies to enhance
                  your experience on our Platform. You can control the use of
                  cookies through your browser settings.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">
              3. How We Use Your Information
            </h3>
            <div className="ml-5 space-y-3">
              <div>
                <h4 className="font-medium">3.1 To Provide Services:</h4>
                <p className="text-gray-700 ml-5">
                  We use your personal information to process course
                  enrollments, manage your account, and deliver the services you
                  request.
                </p>
              </div>
              <div>
                <h4 className="font-medium">3.2 To Improve Our Platform:</h4>
                <p className="text-gray-700 ml-5">
                  We analyze usage data to improve our Platform, develop new
                  features, and enhance user experience.
                </p>
              </div>
              <div>
                <h4 className="font-medium">3.3 To Communicate with You:</h4>
                <p className="text-gray-700 ml-5">
                  We may use your contact information to send you updates,
                  promotional materials, and other communications related to
                  Gala Education.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">
              4. Sharing Your Information
            </h3>
            <div className="ml-5 space-y-3">
              <div>
                <h4 className="font-medium">
                  4.1 Third-Party Service Providers:
                </h4>
                <p className="text-gray-700 ml-5">
                  We may share your information with third-party service
                  providers who assist us in operating our Platform and
                  providing services. These providers are bound by
                  confidentiality agreements and are not permitted to use your
                  information for any other purpose.
                </p>
              </div>
              <div>
                <h4 className="font-medium">4.2 Legal Requirements:</h4>
                <p className="text-gray-700 ml-5">
                  We may disclose your information if required by law or to
                  comply with legal processes or regulations.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">5. Data Security</h3>
            <p className="text-gray-700 ml-5">
              We implement reasonable security measures to protect your personal
              information from unauthorized access, disclosure, or alteration.
              However, no security system is impenetrable, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">6. Your Choices</h3>
            <div className="ml-5 space-y-3">
              <div>
                <h4 className="font-medium">6.1 Access and Update:</h4>
                <p className="text-gray-700 ml-5">
                  You can access and update your personal information by logging
                  into your account or contacting us directly.
                </p>
              </div>
              <div>
                <h4 className="font-medium">6.2 Opt-Out:</h4>
                <p className="text-gray-700 ml-5">
                  You may opt-out of receiving promotional communications from
                  us by following the instructions provided in the
                  communication.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">
              7. Children&apos;s Privacy
            </h3>
            <p className="text-gray-700 ml-5">
              Our Platform is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If we become aware that we have collected such information, we
              will take steps to delete it.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">
              8. Changes to Privacy Policy
            </h3>
            <p className="text-gray-700 ml-5">
              We may update this Privacy Policy from time to time. Changes will
              be effective immediately upon posting on the Platform. Your
              continued use of the Platform constitutes acceptance of the
              updated Privacy Policy.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">9. Contact Information</h3>
            <p className="text-gray-700 ml-5">
              If you have any questions or concerns about this Privacy Policy,
              please click the email address below to contact us, or call us at:
            </p>
            <div className="ml-10 mt-2">
              <p className="space-x-2">
                <strong>Email:</strong>
                <a
                  href="mailto:edu@galahub.tz?subject=Inquiry&body=Dear Gala Education,"
                  className="text-blue-600 cursor-pointer"
                >
                  {MAIN_EMAIL}
                </a>
              </p>
              <p className="space-x-2">
                <strong>Phone:</strong>
                <a
                  href="tel:+255750189902"
                  className="text-blue-600 cursor-pointer"
                >
                  {SUPPORT_DESK}
                </a>
              </p>
            </div>
          </section>
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-600">
        By using Gala Education, you acknowledge that you have read and
        understood these Terms of Service and Privacy Policy.
      </div>
    </div>
  );
};

export default TermsAndPrivacyPreview;
