import { Button } from "antd";
const StickyNotification = () => {
  return (
    <div className="bg-[#001840] h-12 w-full p-2 fixed bottom-0 inset-x-0 text-white text-xs flex items-center justify-between px-48">
      <span className="font-bold">Gala Education</span>
      <Button className="!h-6 !border-0 !text-xs">Join</Button>
    </div>
  );
};

export default StickyNotification;
