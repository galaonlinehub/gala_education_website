'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { LuMenu } from 'react-icons/lu';
import ChooseAccont from '@/components/ui/auth/signup/ChooseAccount';
import { useUser } from '@/hooks/data/useUser';
import { useDevice } from '@/hooks/misc/useDevice';
import { Link } from '@/src/i18n/navigation';
import { useSubscribeStore } from '@/store/subscribeStore';
import MobileSideBar from './MobileSideBar';
import { Signout } from '../ui/auth/signup/Signout';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();
  const { width } = useDevice();

  const { setSubscribeOpen } = useSubscribeStore();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const t = useTranslations('home_page');
  const at = useTranslations('about_us');
  const sut = useTranslations('sign_up');
  const navt = useTranslations('navbar');
  const navlinkt = useTranslations('nav_links');

  return (
    <nav className="fixed top-0 inset-x-0 flex h-[3rem] w-full items-center justify-between bg-white px-2 sm:px-6 lg:px-10">
      <Link href={'/'}>
        <Image
          alt={'Gala logo'}
          width={150}
          height={150}
          src={'/gala-logo.png'}
          className={'w-16 h-16 object-cover cursor-pointer rounded-full'}
        />
      </Link>

      <ul className="text-black flex sm:gap-x-4 gap-x-2 sm:text-[12px] text-[8px] leading-[5px] items-center justify-center font-medium">
        {user?.role === 'instructor' && user?.has_free_trial && !user?.has_active_subscription && (
          <button
            onClick={() => setSubscribeOpen(true)}
            variant="solid"
            type="primary"
            className="rounded-full bg-[#001840] text-white hidden sm:block font-semibold text-sm hover:bg-[#001840]/80 px-5 py-2"
          >
            {navt('subscribe_now')}
          </button>
        )}
        <li>
          <LanguageSwitcher />
        </li>

        <li>
          <Link href={'/'} className="hover:cursor-pointer text-black">
            {t('home')}
          </Link>
        </li>
        {user && (
          <li>
            <Link href={`/${user.role}`} className="hover:cursor-pointer">
              {navlinkt('dashboard')}
            </Link>
          </li>
        )}
        <li>
          <Link href={'/about-us'} className="hover:cursor-pointer text-black">
            {at('about_us')}
          </Link>
        </li>
        {!user && (
          <div className="flex gap-3 items-center justify-center" onClick={() => {}}>
            <ChooseAccont
              btnText={sut('sign_up')}
              textColor={'black'}
              placement={'bottom'}
              trigger={'hover'}
            />
            <Link href={'/signin'} className="hover:cursor-pointer">
              <li>{sut('sign_in')}</li>
            </Link>
          </div>
        )}
        {width < 768 && user && !isSidebarOpen && (
          <LuMenu
            size={32}
            onClick={toggleSidebar}
            aria-label="Toggle menu"
            className="text-[20px] p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          />
        )}
        {user && width > 768 && <Signout />}
      </ul>

      {user && width < 768 && (
        <MobileSideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
