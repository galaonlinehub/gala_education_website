"use client";

import { useState, useRef, useEffect } from "react";
import ReadMoreContainer from "@/components/layout/ui/ReadMore";
import Image from "next/image";
import { Calendar, theme, Spin, Skeleton } from "antd";
import LeftTiltedBook from "@/components/vectors/LeftTiltedBook";
import CalendarComponent from "@/src/components/student/CalendarComponent";
import { useRouter } from "next/navigation";
import useUser from "@/src/store/auth/user";
import { decrypt } from "@/src/utils/constants/encryption";

export default function Component() {
  const reminders = [
    {
      name: "Eng - Speaking Test",
      time: "10.06.2026",
      day: "Friday",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.9391 0.763359H17.2533C17.271 0.706565 17.2893 0.649771 17.2893 0.58687C17.2893 0.263206 17.0255 0 16.7012 0C16.377 0 16.1144 0.263206 16.1144 0.58687C16.1144 0.649771 16.1315 0.706565 16.1504 0.763359H13.9031C13.9208 0.706565 13.9391 0.649771 13.9391 0.58687C13.9379 0.263206 13.6753 0 13.3504 0C13.0267 0 12.7635 0.263206 12.7635 0.58687C12.7635 0.649771 12.7812 0.706565 12.7995 0.763359H10.5516C10.5693 0.706565 10.587 0.649771 10.587 0.58687C10.587 0.263206 10.3244 0 10.0002 0C9.67588 0 9.41329 0.263206 9.41329 0.58687C9.41329 0.649771 9.43039 0.706565 9.44871 0.763359H7.20077C7.21848 0.706565 7.2368 0.649771 7.2368 0.58687C7.2368 0.263206 6.97359 0 6.64993 0C6.32565 0 6.06245 0.263206 6.06245 0.58687C6.06245 0.649771 6.07955 0.706565 6.09787 0.763359H3.85054C3.86886 0.706565 3.88657 0.649771 3.88657 0.58687C3.88657 0.262595 3.62397 0 3.2997 0C2.97542 0 2.71222 0.263206 2.71222 0.58687C2.71222 0.649771 2.72932 0.706565 2.74764 0.763359H2.06123C1.1342 0.763359 0.381836 1.51634 0.381836 2.44275V18.3206C0.381836 19.2476 1.1342 20 2.06123 20H16.0429L19.6185 16.4244V2.44275C19.6185 1.51695 18.8661 0.763359 17.9391 0.763359ZM18.7024 16.0446L18.5125 16.2345H17.0744C16.4014 16.2345 15.853 16.7841 15.853 17.4559V18.894L15.6631 19.084H2.06123C1.64046 19.084 1.29787 18.7414 1.29787 18.3206V3.05344H18.7024V16.0446Z"
            fill="white"
          />
          <path
            d="M3.89869 7.19387H4.72067V6.58379H5.08587V5.94074H4.72067V4.26807H3.91579L2.55029 5.89066V6.58379H3.89869V7.19387ZM3.20129 5.94074L3.89869 5.04852V5.94074H3.20129Z"
            fill="white"
          />
          <path
            d="M4.63281 9.2843C4.63281 9.2843 5.69419 11.1487 7.85052 13.3051C7.99587 13.4492 8.13938 13.589 8.28106 13.724C8.24197 13.7551 8.20106 13.7826 8.16442 13.8186C7.72167 14.262 7.72167 14.9802 8.16442 15.4235C8.609 15.8675 9.32655 15.8675 9.76991 15.4235C9.84503 15.3484 9.90243 15.2629 9.9519 15.1756C11.0841 16.0703 11.8633 16.5142 11.8633 16.5142C11.4615 14.5081 13.4395 12.011 14.3006 10.8666C15.6179 9.11575 14.9681 7.58353 14.2701 6.88552C13.5708 6.18689 12.0411 5.53895 10.289 6.85437C9.14335 7.71483 6.64808 9.69407 4.63281 9.2843ZM9.68808 8.27666C10.8221 7.14201 12.1589 6.64063 12.5192 7.00155C12.8801 7.36246 11.2997 7.62078 10.1656 8.75483C9.03159 9.88888 7.30152 10.0104 6.48075 9.72643C7.30457 9.68857 8.55342 9.41132 9.68808 8.27666Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: "Eng - Vocabulary Test",
      time: "10.06.2026",
      day: "Friday",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.9391 0.763359H17.2533C17.271 0.706565 17.2893 0.649771 17.2893 0.58687C17.2893 0.263206 17.0255 0 16.7012 0C16.377 0 16.1144 0.263206 16.1144 0.58687C16.1144 0.649771 16.1315 0.706565 16.1504 0.763359H13.9031C13.9208 0.706565 13.9391 0.649771 13.9391 0.58687C13.9379 0.263206 13.6753 0 13.3504 0C13.0267 0 12.7635 0.263206 12.7635 0.58687C12.7635 0.649771 12.7812 0.706565 12.7995 0.763359H10.5516C10.5693 0.706565 10.587 0.649771 10.587 0.58687C10.587 0.263206 10.3244 0 10.0002 0C9.67588 0 9.41329 0.263206 9.41329 0.58687C9.41329 0.649771 9.43039 0.706565 9.44871 0.763359H7.20077C7.21848 0.706565 7.2368 0.649771 7.2368 0.58687C7.2368 0.263206 6.97359 0 6.64993 0C6.32565 0 6.06245 0.263206 6.06245 0.58687C6.06245 0.649771 6.07955 0.706565 6.09787 0.763359H3.85054C3.86886 0.706565 3.88657 0.649771 3.88657 0.58687C3.88657 0.262595 3.62397 0 3.2997 0C2.97542 0 2.71222 0.263206 2.71222 0.58687C2.71222 0.649771 2.72932 0.706565 2.74764 0.763359H2.06123C1.1342 0.763359 0.381836 1.51634 0.381836 2.44275V18.3206C0.381836 19.2476 1.1342 20 2.06123 20H16.0429L19.6185 16.4244V2.44275C19.6185 1.51695 18.8661 0.763359 17.9391 0.763359ZM18.7024 16.0446L18.5125 16.2345H17.0744C16.4014 16.2345 15.853 16.7841 15.853 17.4559V18.894L15.6631 19.084H2.06123C1.64046 19.084 1.29787 18.7414 1.29787 18.3206V3.05344H18.7024V16.0446Z"
            fill="white"
          />
          <path
            d="M3.89869 7.19387H4.72067V6.58379H5.08587V5.94074H4.72067V4.26807H3.91579L2.55029 5.89066V6.58379H3.89869V7.19387ZM3.20129 5.94074L3.89869 5.04852V5.94074H3.20129Z"
            fill="white"
          />
          <path
            d="M4.63281 9.2843C4.63281 9.2843 5.69419 11.1487 7.85052 13.3051C7.99587 13.4492 8.13938 13.589 8.28106 13.724C8.24197 13.7551 8.20106 13.7826 8.16442 13.8186C7.72167 14.262 7.72167 14.9802 8.16442 15.4235C8.609 15.8675 9.32655 15.8675 9.76991 15.4235C9.84503 15.3484 9.90243 15.2629 9.9519 15.1756C11.0841 16.0703 11.8633 16.5142 11.8633 16.5142C11.4615 14.5081 13.4395 12.011 14.3006 10.8666C15.6179 9.11575 14.9681 7.58353 14.2701 6.88552C13.5708 6.18689 12.0411 5.53895 10.289 6.85437C9.14335 7.71483 6.64808 9.69407 4.63281 9.2843ZM9.68808 8.27666C10.8221 7.14201 12.1589 6.64063 12.5192 7.00155C12.8801 7.36246 11.2997 7.62078 10.1656 8.75483C9.03159 9.88888 7.30152 10.0104 6.48075 9.72643C7.30457 9.68857 8.55342 9.41132 9.68808 8.27666Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: "Eng Test",
      time: "10.06.2026",
      day: "Friday",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.9391 0.763359H17.2533C17.271 0.706565 17.2893 0.649771 17.2893 0.58687C17.2893 0.263206 17.0255 0 16.7012 0C16.377 0 16.1144 0.263206 16.1144 0.58687C16.1144 0.649771 16.1315 0.706565 16.1504 0.763359H13.9031C13.9208 0.706565 13.9391 0.649771 13.9391 0.58687C13.9379 0.263206 13.6753 0 13.3504 0C13.0267 0 12.7635 0.263206 12.7635 0.58687C12.7635 0.649771 12.7812 0.706565 12.7995 0.763359H10.5516C10.5693 0.706565 10.587 0.649771 10.587 0.58687C10.587 0.263206 10.3244 0 10.0002 0C9.67588 0 9.41329 0.263206 9.41329 0.58687C9.41329 0.649771 9.43039 0.706565 9.44871 0.763359H7.20077C7.21848 0.706565 7.2368 0.649771 7.2368 0.58687C7.2368 0.263206 6.97359 0 6.64993 0C6.32565 0 6.06245 0.263206 6.06245 0.58687C6.06245 0.649771 6.07955 0.706565 6.09787 0.763359H3.85054C3.86886 0.706565 3.88657 0.649771 3.88657 0.58687C3.88657 0.262595 3.62397 0 3.2997 0C2.97542 0 2.71222 0.263206 2.71222 0.58687C2.71222 0.649771 2.72932 0.706565 2.74764 0.763359H2.06123C1.1342 0.763359 0.381836 1.51634 0.381836 2.44275V18.3206C0.381836 19.2476 1.1342 20 2.06123 20H16.0429L19.6185 16.4244V2.44275C19.6185 1.51695 18.8661 0.763359 17.9391 0.763359ZM18.7024 16.0446L18.5125  16.2345H17.0744C16.4014  16.2345 15.853 16.7841 15.853 17.4559V18.894L15.6631 19.084H2.06123C1.64046 19.084 1.29787 18.7414 1.29787 18.3206V3.05344H18.7024V16.0446Z"
            fill="white"
          />
          <path
            d="M3.89869 7.19387H4.72067V6.58379H5.08587V5.94074H4.72067V4.26807H3.91579L2.55029 5.89066V6.58379H3.89869V7.19387ZM3.20129 5.94074L3.89869 5.04852V5.94074H3.20129Z"
            fill="white"
          />
          <path
            d="M4.63281 9.2843C4.63281 9.2843 5.69419 11.1487 7.85052 13.3051C7.99587 13.4492 8.13938 13.589 8.28106 13.724C8.24197 13.7551 8.20106 13.7826 8.16442 13.8186C7.72167 14.262 7.72167 14.9802 8.16442 15.4235C8.609 15.8675 9.32655 15.8675 9.76991 15.4235C9.84503 15.3484 9.90243 15.2629 9.9519 15.1756C11.0841 16.0703 11.8633 16.5142 11.8633 16.5142C11.4615 14.5081 13.4395 12.011 14.3006 10.8666C15.6179 9.11575 14.9681 7.58353 14.2701 6.88552C13.5708 6.18689 12.0411 5.53895 10.289 6.85437C9.14335 7.71483 6.64808 9.69407 4.63281 9.2843ZM9.68808 8.27666C10.8221 7.14201 12.1589 6.64063 12.5192 7.00155C12.8801 7.36246 11.2997 7.62078 10.1656 8.75483C9.03159 9.88888 7.30152 10.0104 6.48075 9.72643C7.30457 9.68857 8.55342 9.41132 9.68808 8.27666Z"
            fill="white"
          />
        </svg>
      ),
    },
  ];

  const subjects = [
    { name: "English Grade 1", classSize: 10, days: 30 },
    { name: "Mathematics Grade 7", classSize: 10, days: 30 },
    { name: "Physics Form 1", classSize: 10, days: 30 },
    { name: "Chemistry Form 4", classSize: 10, days: 30 },
  ];

  const router = useRouter();
  const { user, setUser } = useUser();

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: "100%",
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const scrollRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const userDecrypted = decrypt(
      decrypt(localStorage.getItem("2171f701-2b0c-41f4-851f-318703867868"))
    );

    if (userDecrypted) {
      setUser(userDecrypted);
    }
  }, [setUser, user]);

  return (
    <div className="flex lg:gap-x-5 justify-center items-center flex-col lg:flex-row px-2">
      <div className="flex-col w-full lg:w-2/3 flex">
        <div className="p-4 z-10 h-fit mt-20 w-full border-blue-600 border-2 rounded-xl flex flex-col relative">
          <div>
            <div className="flex flex-col">
              <div className="font-bold text-sm">
                {user ? (
                  `Welcome back, ${user.first_name} ${user.last_name}!`
                ) : (
                  <>
                    Welcome back,
                    <Skeleton.Input
                      active
                      size="small"
                      style={{
                        width: 60,
                        minWidth: 60,
                        height: 16,
                        display: "inline-block",
                        verticalAlign: "middle",
                        marginTop: "-4px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      style={{
                        width: 80,
                        minWidth: 80,
                        height: 16,
                        display: "inline-block",
                        verticalAlign: "middle",
                        marginTop: "-4px",
                        marginRight: "10px",
                      }}
                    />
                    !
                  </>
                )}
              </div>
              <div>
                <ReadMoreContainer />
              </div>
            </div>
            <div className="absolute sm:-top-16 -top-8 sm:right-4 right-2">
              <Image
                className="h-[8rem] w-[8rem] sm:w-[12rem] sm:h-[12rem] "
                src="/sitting_on_books.png"
                alt="An image of a character sitting on books"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-between items-center w-full">
            <span className="text-[16px] font-black">Your Subjects</span>
            <div className="flex items-center justify-center gap-5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.00008 17.3333C5.07171 17.3333 3.10752 17.3333 1.88714 16.1129C0.666748 14.8925 0.666748 12.9283 0.666748 8.99996C0.666748 5.07158 0.666748 3.1074 1.88714 1.88702C3.10752 0.666626 5.07171 0.666626 9.00008 0.666626C12.9284 0.666626 14.8927 0.666626 16.113 1.88702C17.3334 3.1074 17.3334 5.07158 17.3334 8.99996C17.3334 12.9283 17.3334 14.8925 16.113 16.1129C14.8927 17.3333 12.9284 17.3333 9.00008 17.3333ZM9.00008 5.87496C9.34525 5.87496 9.62508 6.15478 9.62508 6.49996V8.37496H11.5001C11.8452 8.37496 12.1251 8.65479 12.1251 8.99996C12.1251 9.34513 11.8452 9.62496 11.5001 9.62496H9.62508V11.5C9.62508 11.8451 9.34525 12.125 9.00008 12.125C8.65491 12.125 8.37508 11.8451 8.37508 11.5V9.62496H6.50008C6.15491 9.62496 5.87508 9.34513 5.87508 8.99996C5.87508 8.65479 6.15491 8.37496 6.50008 8.37496H8.37508V6.49996C8.37508 6.15478 8.65491 5.87496 9.00008 5.87496Z"
                  fill="#1C274C"
                />
              </svg>
              <span
                className="text-[12px] font-black text-[#030DFE] cursor-pointer"
                onClick={() => router.push("/student/library")}
              >
                See All
              </span>
            </div>
          </div>

          <div className="">
            <div className="flex items-center mt-2">
              <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-4 pb-4"
              >
                {subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="flex-none flex-col text-xs font-bold rounded-md w-60 h-28 p-5 bg-[#001840] text-white"
                  >
                    <div className="mb-3">{subject.name}</div>
                    <div>Class size: {subject.classSize}</div>
                    <div>Days: {subject.days}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={scrollRight}
                className="ml-2 p-2 rounded-full transition flex items-center justify-center"
              >
                <svg
                  width="15"
                  height="24"
                  viewBox="0 0 15 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.0595 10.9406C13.6454 11.5265 13.6454 12.4781 13.0595 13.064L5.55947 20.564C4.97353 21.15 4.02197 21.15 3.43604 20.564C2.8501 19.9781 2.8501 19.0265 3.43604 18.4406L9.87666 12L3.44072 5.55935C2.85479 4.97341 2.85479 4.02185 3.44072 3.43591C4.02666 2.84998 4.97822 2.84998 5.56416 3.43591L13.0642 10.9359L13.0595 10.9406Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-5 mb-20 w-full">
          <span className="text-[16px] font-black mb-2">Your Classes</span>
          <div className="overflow-x-auto">
            <div className="min-w-[600px] flex flex-col gap-3">
              <div className="bg-blue-950 w-full flex justify-between items-center font-bold text-xs text-white rounded-md p-2">
                {[
                  "Class",
                  "Members",
                  "Starting",
                  "End",
                  "Material",
                  "Percentage",
                ].map((header, index) => (
                  <span key={index} className="text-center py-2 flex-1">
                    {header}
                  </span>
                ))}
              </div>
              {["Math", "English"].map((subject, index) => (
                <div
                  key={index}
                  className="border-2 border-blue-600 flex items-center justify-between font-bold text-xs rounded-md w-full p-2"
                >
                  <span className="text-center overflow-auto py-2 flex-1">
                    {subject}
                  </span>
                  <span className="text-center overflow-auto py-2 flex-1">
                    10
                  </span>
                  <span className="text-center overflow-auto py-2 flex-1">
                    10.05.2026
                  </span>
                  <span className="text-center overflow-auto py-2 flex-1">
                    10.06.2026
                  </span>
                  <span className="text-center overflow-auto py-2 flex-1">
                    View
                  </span>
                  <span className="text-center overflow-auto py-2 flex-1">
                    {index === 0 ? "45%" : "05%"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CalendarComponent />
    </div>
  );
}
