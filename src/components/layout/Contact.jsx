import { PHONE_NUMBER, SUPPORT_EMAIL } from "@/src/config/settings";
import { Dropdown } from "antd";

const subject = encodeURIComponent("Support and Help from Gala Education");
const body = encodeURIComponent("Hi Gala Education,\n\nI need help with...");

const mailto = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
const callto = `tel:${PHONE_NUMBER}`;

const items = [
  {
    key: "call",
    label: (
      <a href={callto} className="text-xs">
        📞 Call Us
      </a>
    ),
  },
  {
    key: "email",
    label: (
      <a href={mailto} className="text-xs">
        ✉️ Email Us
      </a>
    ),
  },
];

export const Contact = () => {
  return (
    <div className="text-sm flex items-center justify-center gap-2">
      <a href="#" className="text-gray-700 hover:text-blue-600 text-xs">
        Help Center
      </a>
      <span>|</span>
      <Dropdown arrow menu={{ items }} trigger={["click"]}>
        <button className="text-blue-600 hover:underline text-xs">
          Contact Us
        </button>
      </Dropdown>
    </div>
  );
};
