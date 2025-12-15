
export enum pageLinkKeys {
  HOME = 'HOME',
  /** Согласие на обработку персональных данных */
  PERSONAL_DATA_CONSENT = 'PERSONAL_DATA_CONSENT',
  /** Политика конфиденциальности */
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  /** Пользовательское соглашение */
  TERMS_OF_USE = 'TERMS_OF_USE',
}

export const pageLinks = {
  [pageLinkKeys.HOME]: {
    key: pageLinkKeys.HOME,
    title: '',
    href: '/',
    make: (t: string) => '',
    is: () => { },
  },
  /** Согласие на обработку персональных данных */
  [pageLinkKeys.PERSONAL_DATA_CONSENT]: {
    key: pageLinkKeys.PERSONAL_DATA_CONSENT,
    title: '',
    href: '/personal-data-consent',
    make: (t: string) => '',
    is: (url: string) => url.endsWith('/personal-data-consent'),
  },
  /** Политика конфиденциальности */
  [pageLinkKeys.PRIVACY_POLICY]: {
    key: pageLinkKeys.PRIVACY_POLICY,
    title: '',
    href: '/privacy-policy',
    make: (t: string) => '',
    is: (url: string) => url.endsWith('/privacy-policy'),
  },
  /** Пользовательское соглашение */
  [pageLinkKeys.TERMS_OF_USE]: {
    key: pageLinkKeys.TERMS_OF_USE,
    title: '',
    href: '/terms-of-use',
    make: (t: string) => '',
    is: (url: string) => url.endsWith('/terms-of-use'),
  },
} as const;
