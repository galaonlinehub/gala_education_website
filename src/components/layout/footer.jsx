import { footer_links } from "@/src/utils/data/links";
import FooterVectors from "@/src/utils/vector-svg/FooterVectors";
import React from "react";

function Footer() {
  return (
    <div className="bg-[#0d0d0d] min-h-screen py-24 px-6 relative z-[99999] bottom-0">
      <div className="max-w-screen-2xl mx-auto h-full flex flex-col lg:flex-row justify-between w-full">
        <div className="text-white items-center justify-center flex-col">
          <h1 className="font-black text-sm sm:text-lg">
            Join the Mailing List
          </h1>
          <div>
            <h2>
              Be the first to experience content, receive real-time updates and
            </h2>
            <h2>
              participate in live events. Sign up now to join the mailing list.
            </h2>
          </div>
          <div className="pt-4 flex gap-4 w-full">
            <input
              placeholder="Email"
              className="border-[1px] text-xs w-[85%] p-2 bg-transparent border-white"
            />
            <button className="px-1 text-center  border-[1px] border-white text-xs w-[15%]">
              JOIN NOW
            </button>
          </div>
        </div>
        <div className="flex flex-col pt-10 pb-6 gap-y-12 ">
          <div className="flex flex-wrap gap-x-24">
            {Object.entries(footer_links).map(([item, links], itemKey) => (
              <div key={itemKey}>
                <h1 className="font-bold text-[#8C8B8D] py-2 ">{item}</h1>
                <ul>
                  {links.map((item, i) => (
                    <li key={i} className="text-white text-xs">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div />
          </div>
          <div>
            <p className="text-white text-xs">
              © 2024 Gala Education. All rights reserved. All content,
              trademarks, and intellectual <br /> property on this website are
              protected by law. Unauthorized use or reproduction of <br /> any
              materials without prior written consent is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
      <FooterVectors />
    </div>
  );
}

export default Footer;
