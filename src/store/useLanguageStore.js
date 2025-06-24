'use client';

import { create } from 'zustand';
import en_home from '@/src/locales/en/home.json';
import en_auth from '@/src/locales/en/auth.json';
import sw_home from '@/src/locales/sw/home.json';
import sw_auth from '@/src/locales/sw/auth.json';

const messages = {
  en: {
    home: en_home,
    auth: en_auth,
  },
  sw: {
    home: sw_home,
    auth: sw_auth,
  },
};

export const useLanguageStore = create((set, get) => ({
  locale: 'en',
  translations: messages['en'],

  setLocale: (locale) => {
    set({
      locale,
      translations: messages[locale],
    });
  },

  t: (namespace, key) => {
    const translations = get().translations;
    return translations?.[namespace]?.[key] || key;
  },
}));
