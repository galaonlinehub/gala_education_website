'use client';
import { Dropdown } from 'antd';
import React from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { PiStudentBold } from 'react-icons/pi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const ChooseAccount = ({ btnText, textColor, btnIcon, btnClassname, placement, trigger }) => {
  const currentUrl = usePathname();
  const signUpPart = currentUrl.split('/')[1];
  const isDisabled = signUpPart === 'signup';

  const items = [
    {
      key: '1',
      icon: <PiStudentBold className="text-xl" />,
      label: (
        <Link
          href={'/signup/student'}
          className="flex items-center py-[2px] rounded text-xs font-light"
        >
          Student
        </Link>
      ),
    },
    {
      key: '2',
      icon: <FaChalkboardTeacher className="text-xl" />,
      label: (
        <Link
          href={'/signup/instructor'}
          className="flex items-center py-[2px] rounded text-xs font-light"
        >
          Instructor
        </Link>
      ),
    },
  ];

  return (
    <section>
      <Dropdown
        menu={{ items }}
        placement={placement}
        disabled={isDisabled}
        trigger={[trigger]}
        arrow={true}
      >
        <div className={clsx('flex gap-2 items-center', btnClassname)}>
          <button
            className={clsx(
              'transition-all',
              isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            )}
            onClick={(e) => {
              if (isDisabled) {
                e.preventDefault();
                return;
              }
            }}
          >
            <span className={`text-${textColor}`}>{btnText}</span>
          </button>
        </div>
      </Dropdown>
    </section>
  );
};

export default ChooseAccount;
