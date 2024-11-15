import { Modal, Result } from "antd";
import React from "react";
import { api } from "@/src/config/settings";
import LoadingState from "../../loading/LoadingSpinner";
import { FiCheckCircle } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { useEmailVerificationModalOpen } from "@/src/store/auth/signup";
import { useTabNavigator } from "@/src/store/auth/signup";

const EmailVerification = () => {
  const openEmailVerificationModal = useEmailVerificationModalOpen(
    (state) => state.openEmailVerificationModal
  );
  const setOpenEmailVerificationModal = useEmailVerificationModalOpen(
    (state) => state.setOpenEmailVerificationModal
  );
  const setActiveTab = useTabNavigator((state) => state.setActiveTab);

  const inputs = React.useRef([]);
  const [values, setValues] = React.useState(Array(6).fill(""));
  const [hasVerified, setHasVerified] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (openEmailVerificationModal) {
      const handleKeyDownRefresh = (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "r") {
          event.preventDefault();
        }

        if (event.key === "F5" || event.key === "F12") {
          event.preventDefault();
        }
      };

      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "";
      };

      window.addEventListener("keydown", handleKeyDownRefresh);
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("keydown", handleKeyDownRefresh);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [openEmailVerificationModal]);

  const handleChange = async (value, index) => {
    if (isNaN(value) || value.length > 1) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newValues.length === 6 && newValues.every((val) => val !== "")) {
      const code = Number(newValues.join(""));
      setLoading(true);

      const formData = new FormData();
      formData.append("code", code);

      try {
        const response = await api.post("/email-verify", formData);
        if (response.status === 200) {
          setHasVerified(true);
        } else {
          setHasVerified(false);
        }
      } catch (e) {
        console.log(e);
        setHasVerified(true);
      } finally {
        setLoading(false);

        setTimeout(() => {
          setActiveTab(1);
          setOpenEmailVerificationModal(false);
        }, 5000);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <Modal
      title={<p>Verify Email</p>}
      closable={false}
      maskClosable={false}
      keyboard={false}
      destroyOnClose={false}
      footer={null}
      // loading={loading}
      open={openEmailVerificationModal}
      onCancel={() => setOpenEmailVerificationModal(false)}
    >
      <div className="mb-6">
        <span className="block w-full space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span>Enter Verification Code Sent through</span>
          <span className="font-bold">dn******94@gmail.com</span>
        </span>
        <div>
          <div className={"flex gap-2 items-center justify-center py-4"}>
            {Array(6)
              .fill()
              .map((_, index) => (
                <input
                  key={index}
                  ref={(e) => (inputs.current[index] = e)}
                  type="text"
                  inputMode={"numeric"}
                  maxLength="1"
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^[1-9]$/.test(value)) {
                      e.target.value = "";
                    }
                  }}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`${
                    hasVerified !== null
                      ? hasVerified
                        ? "border border-green-500 focus:ring-green-800 focus:outline-green-600 input-shake hasVerified"
                        : "border border-red-500 focus:ring-red-800 focus:outline-red-600 input-shake failure"
                      : "text-2xl font-black w-12 h-12 text-center text-black border border-[#030DFE] rounded-md focus:outline-none focus:ring focus:ring-[#030DFE]"
                  } text-2xl font-black w-12 h-12 text-center text-black rounded-md focus:outline-none focus:ring`}
                />
              ))}
          </div>
          {loading && (
            <div className="flex flex-col items-center justify-center p-3 gap-2">
              <LoadingState />
              <span className="font-bold">Verifying...</span>
            </div>
          )}
          {hasVerified !== null &&
            (hasVerified ? (
              <Result
                status="success"
                title="Email successfully Verified!"
                subTitle="Hold on a moment. You&#39;ll be directed to the next stage."
              />
            ) : (
              <Result
                status="error"
                title="Email Verification Failed!"
                subTitle="Incorrect Code Provided."
                // extra={[
                //   <Button type="primary" key="console">
                //     Go Console
                //   </Button>,
                //   <Button key="buy">Buy Again</Button>,
                // ]}
              ></Result>
            ))}
          <div className="flex gap-2 text-xs w-full items-center justify-end">
            <span>Didn&#39;t get the code?</span>
            <span className="bg-transparent/10 py-1 px-2 font-bold rounded cursor-pointer">
              Resend Code
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmailVerification;
