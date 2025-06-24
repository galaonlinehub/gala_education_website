'use client';

import { useLanguageStore } from '@/src/store/useLanguageStore';

export function useTranslations(namespace) {
  const tRaw = useLanguageStore((s) => s.t);
  return (key) => tRaw(namespace, key);
}
