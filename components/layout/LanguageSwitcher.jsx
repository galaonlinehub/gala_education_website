'use client';

import React, { useMemo, useState } from 'react';
import { Select } from 'antd';
import { LuChevronDown } from 'react-icons/lu';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/src/i18n/navigation';
import TzFlag from '@/utils/vector-svg/flags/TzFlag';
import UkFlag from '@/utils/vector-svg/flags/UkFlag';
import clsx from 'clsx';

const LanguageSwitcher = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languages');

  const languages = [
    { value: 'sw', label: t('swahili'), flag: TzFlag },
    { value: 'en', label: t('english'), flag: UkFlag },
  ];

  const languageMap = useMemo(
    () =>
      languages.reduce((acc, language) => {
        acc[language.value] = language;
        return acc;
      }, /** @type<Record<string, (typeof languages)[number] | undefined>} */ ({})),
    [languages]
  );

  const options = useMemo(
    () =>
      languages.map((language) => ({
        value: language.value,
        label: language.label,
        flag: language.flag,
      })),
    [languages]
  );

  const handleLanguageChange = (value) => {
    if (value !== currentLocale) {
      router.replace(pathname, { locale: value });
    }
  };

  return (
    <Select
      value={currentLocale}
      onChange={handleLanguageChange}
      variant="borderless"
      size="small"
      className="language-switcher sm:w-[120px] [&_.ant-select-selector]:!flex [&_.ant-select-selector]:!items-center [&_.ant-select-selector]:!gap-1  [&_.ant-select-selector]:!py-0 [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!flex [&_.ant-select-selection-item]:!items-center [&_.ant-select-selection-item]:!gap-1 [&_.select-arrow]:-ml-4 sm:[&_.select-arrow]:-ml-5.5"
      classNames={{
        popup:
          'language-switcher-dropdown !min-w-[170px] !rounded-xl !p-1 [&_.ant-select-item-option]:!rounded-lg [&_.ant-select-item-option-selected]:!bg-gray-100 [&_.ant-select-item-option]:hover:!bg-gray-50',
      }}
      popupMatchSelectWidth={false}
      onDropdownOpenChange={(open) => setIsDropdownOpen(open)}
      optionRender={({ data }) => {
        const FlagComponent = data.flag;
        return (
          <div className="flex items-center gap-2">
            <FlagComponent size={18} />
            <span className="text-xs leading-none">{data.label}</span>
          </div>
        );
      }}
      labelRender={({ data, value }) => {
        const selected = languageMap[data?.value ?? value ?? currentLocale];
        const FlagComponent = selected?.flag ?? TzFlag;
        const label = selected?.label ?? '';
        return (
          <div className="flex items-center gap-1">
            <FlagComponent size={18} />
            <span className="hidden text-xs leading-none sm:inline">{label}</span>
          </div>
        );
      }}
      suffixIcon={
        <span className="select-arrow">
          <LuChevronDown
            className={clsx(
              isDropdownOpen ? 'text-gray-400' : 'text-black',
              'translate-y-[1px] transition-colors'
            )}
            size={16}
          />
        </span>
      }
      options={options}
    />
  );
};

export default LanguageSwitcher;
