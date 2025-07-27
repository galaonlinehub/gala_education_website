import { Button } from "antd";
import { useRouter } from "next/navigation";

import InstructorSignUpFeedbackSvg from "@/src/utils/vector-svg/sign-up/InstructorSignUpFeedbackSvg";

const InstructorSignUpFeedback = ({ onClose }) => {
  const router = useRouter();
  const onFinish = () => {
    router.push("/");
    onClose();
  };
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <InstructorSignUpFeedbackSvg />
      <span className="font-black text-sm xxs:text-2xl">
        Congratulations!!!
      </span>
      <p className="text-center text-xs xxs:text-sm leading-6 xxs:leading-8 w-3/4 mb-3">
        Congratulations! Your application was successful. Gala Education will
        contact you soon via <span className="font-black mx-1">Email</span>
        and
        <span className="font-black mx-1">SMS</span> with your results in 2 to 3
        business days. Thank you for your commitment to education!.
      </p>

      <Button
        className="rounded-full !bg-[#030DFE] text-white hover:!text-white !border-transparent !px-12 !py-4 !font-extrabold"
        onClick={onFinish}
      >
        Finish
      </Button>
    </div>
  );
};

export default InstructorSignUpFeedback;
