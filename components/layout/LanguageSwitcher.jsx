'use client';

import { usePathname, useRouter } from '@/src/i18n/navigation';
import TzFlag from '@/utils/vector-svg/flags/TzFlag';
import UkFlag from '@/utils/vector-svg/flags/UkFlag';
import { Select } from 'antd';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

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
      })),
    [languages]
  );

  const flagMap = useMemo(
    () =>
      languages.reduce((acc, language) => {
        acc[language.value] = language.flag;
        return acc;
      }, {}),
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
      className="language-switcher sm:w-[120px] [&_.ant-select-selector]:!flex [&_.ant-select-selector]:!items-center [&_.ant-select-selector]:!gap-1 [&_.ant-select-selector]:!py-0 [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!flex [&_.ant-select-selection-item]:!items-center [&_.ant-select-selection-item]:!gap-1.5 [&_.ant-select-arrow]:!flex [&_.ant-select-arrow]:!items-center [&_.ant-select-arrow]:!ml-0 [&_.ant-select-arrow]:!mr-0 [&_.ant-select-arrow]:!h-auto"
      classNames={{
        popup:
          'language-switcher-dropdown !min-w-[170px] !rounded-xl !p-1 [&_.ant-select-item-option]:!rounded-lg [&_.ant-select-item-option-selected]:!bg-gray-100 [&_.ant-select-item-option]:hover:!bg-gray-50',
      }}
      popupMatchSelectWidth={false}
      onOpenChange={(open) => setIsDropdownOpen(open)}
      optionRender={({ data }) => {
        const FlagComponent = flagMap[data.value] ?? TzFlag;
        return (
          <div className="flex items-center gap-2">
            <FlagComponent size={18} />
            <span className="text-xs leading-none">{data.label}</span>
          </div>
        );
      }}
      labelRender={({ data, value }) => {
        const selected = languageMap[data?.value ?? value ?? currentLocale];
        const FlagComponent = flagMap[data?.value ?? value ?? currentLocale] ?? TzFlag;
        const label = selected?.label ?? '';
        return (
          <div className="flex items-center gap-1.5">
            <FlagComponent size={18} />
            <span className="hidden text-xs leading-none sm:inline">{label}</span>
            <LuChevronDown
              className={clsx(
                isDropdownOpen ? 'text-gray-400' : 'text-black',
                'transition-colors ml-1'
              )}
              size={12}
            />
          </div>
        );
      }}
      suffixIcon={null}
      options={options}
    />
  );
};

export default LanguageSwitcher;
