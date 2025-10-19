import { Dropdown } from "antd";
import { useTranslations } from "next-intl";

import {
  BILLING_SUPPORT_DESK,
  SUPPORT_DESK,
  SUPPORT_EMAIL,
} from "@/config/settings";

export const Contact = ({ useBillingContact = false }) => {
  const phoneNumber = useBillingContact ? BILLING_SUPPORT_DESK : SUPPORT_DESK;

  const subject = encodeURIComponent("Support and Help from Gala Education");
  const body = encodeURIComponent("Hi Gala Education,\n\nI need help with...");

  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  const callto = `tel:${phoneNumber}`;

  const t = useTranslations('sign_up');
  const at = useTranslations('about_us');

  const items = [
    {
      key: "call",
      label: (
        <a href={callto} className="text-xs flex flex-col">
          <span> 📞 {at('call_us')}</span>
          <span className="text-[10px] pl-4 text-gray-500">+{phoneNumber}</span>
        </a>
      ),
    },
    {
      key: "email",
      label: (
        <a href={mailto} className="text-xs flex flex-col">
          <span> ✉️ {at('mail_us')}</span>
          <span className="text-[10px] pl-4 text-gray-500">
            {SUPPORT_EMAIL}
          </span>
        </a>
      ),
    },
  ];

  return (
    <div className="text-sm flex flex-col min-[300px]:flex-row items-center justify-center gap-2">
      <a
        href="#"
        className="text-black hover:text-[#030DFE] text-xs font-black"
      >
        {t('help_center')}
      </a>
      <span className="hidden min-[300px]:block">|</span>
      <Dropdown arrow menu={{ items }} trigger={["click"]}>
        <button className="text-[#030DFE] hover:underline text-xs">
          {at('contact_us')}
        </button>
      </Dropdown>
    </div>
  );
};
