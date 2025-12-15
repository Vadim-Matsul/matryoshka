export const matryoshka = {
  work_time: {
    mon: { open: false },
    tue: { open: false },
    wed: { open: false },
    thu: {
      open: true,
      from: '20:00',
      to: '03:00',
    },
    fri: {
      open: true,
      from: '20:00',
      to: '05:00',
    },
    sat: {
      open: true,
      from: '20:00',
      to: '05:00',
    },
    sun: { open: false },
  },
  instagram: {
    href: 'https://www.instagram.com/matreshka_karaoke/',
  },
  telegram: {
    href: 'https://t.me/matreshkared',
  },
  phone: {
    href: 'tel:+79030121785',
    str: '+7 (903) 012-17-85',
    num: 79030121785,
  },
  adress: {
    name: 'Москва | Болотная набережная, 3с3',
    href: 'https://yandex.ru/maps/-/CLwyET0T',
  },
  mail: {
    href: 'mailto:marketing@vamsfamily.com',
    email: 'marketing@vamsfamily.com',
  },
} as const;
