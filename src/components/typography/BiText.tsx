import { createElement, type ReactNode } from 'react';
import { useLang } from '@/lib/i18n';

interface Props {
  ru: ReactNode;
  en: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function BiText({ ru, en, className, as = 'span' }: Props) {
  const lang = useLang();
  return createElement(as, { className, lang }, lang === 'ru' ? ru : en);
}
