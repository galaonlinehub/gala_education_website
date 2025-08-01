import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { LuTrash2 } from "react-icons/lu";

import { useRemoveSchoolPartner } from "@/hooks/ui/usePartnerSchool";

const { confirm } = Modal;

export const CancelSchoolPartner = () => {
  const { onConfirm, isLoading } = useRemoveSchoolPartner();

  const showConfirm = () => {
    confirm({
      title: "Are you sure you want to remove this school?",
      icon: <ExclamationCircleFilled />,
      content: "This action will unlink you from the selected school.",
      okText: "Yes, remove",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        return onConfirm();
      },
    });
  };

  return (
    <Tooltip title="Remove from this school" color="#001840">
      <button
        onClick={showConfirm}
        className="rounded-full p-1.5 hover:scale-105 transation-all ease-in-out duration-200 text-xs hover:bg-red-200 hover:text-red-600"
      >
        <LuTrash2 />
      </button>
    </Tooltip>
  );
};
