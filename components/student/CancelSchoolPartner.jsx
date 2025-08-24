import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { LuTrash2 } from "react-icons/lu";

import { useRemoveSchoolPartner } from "@/hooks/ui/usePartnerSchool";

const { confirm } = Modal;

export const CancelSchoolPartner = () => {
  const { onConfirm, isLoading } = useRemoveSchoolPartner();

  const stproft = useTranslations('student_profile');
  const sot = useTranslations('sign_out');

  const showConfirm = () => {
    confirm({
      title: stproft('remove_school'),
      icon: <ExclamationCircleFilled />,
      content: stproft('unlink_school'),
      okText: stproft('yes_remove'),
      okType: "danger",
      cancelText: sot('cancel'),
      onOk() {
        return onConfirm();
      },
    });
  };

  return (
    <Tooltip title={stproft('remove_from_school')}>
      <button
        onClick={showConfirm}
        className="rounded-full p-1.5 hover:scale-105 transation-all ease-in-out duration-200 text-xs hover:bg-red-200 hover:text-red-600"
      >
        <LuTrash2 />
      </button>
    </Tooltip>
  );
};
