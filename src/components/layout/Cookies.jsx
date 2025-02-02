import { Button } from "antd";

const AcceptCookies = () => {
  return (
    <div className="bg-black w-[22rem] rounded-xl text-white text-[12px] fixed bottom-4 left-4 p-6 flex flex-col gap-3 z-[90]">
      <div className="text-white/80">
        We use cookies and similar technologies on our website to enhance site
        navigation, analyze site usage, and assist in our marketing efforts.
        Accept all cookies or customize your settings to individually select
        which cookies you allow. For more information see our{" "}
        <span className="text-blue-600 underline underline-offset-4">
          {" "}
          Cookies Policy
        </span>
        .
      </div>
      <Button className="!w-full !text-[10px] !bg-yellow-400 !border-yellow-400 !font-bold !text-black !hover:text-black">
        Accept All
      </Button>
      <Button className="!w-full !text-[10px] !bg-transparent !border-blue-600 !text-blue-600 !font-bold">
        Accept Only Necessary Cookies
      </Button>
      <Button className="!w-full !text-[10px] !bg-transparent !border-blue-600 !text-blue-600 !font-bold">
        Manage Cookies
      </Button>
      <span className="text-blue-600 underline underline-offset-4">
        Privacy Policy
      </span>
    </div>
  );
};

export default AcceptCookies;
