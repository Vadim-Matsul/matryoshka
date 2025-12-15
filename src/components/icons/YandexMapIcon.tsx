import { SVGProps } from 'react';

export function YandexMapIcon(props: SVGProps<SVGSVGElement>) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 12 12"
      {...props}
    >
      <path
        fill="#BFAD9A"
        d="M6 .75a4.5 4.5 0 0 0-3.183 7.681c.815.815 2.733 1.994 2.845 3.232.017.185.152.337.338.337s.32-.152.338-.338c.112-1.237 2.03-2.416 2.845-3.23A4.5 4.5 0 0 0 6 .75"
      ></path>
      <path
        fill="#0A0B0A"
        d="M6 6.825a1.575 1.575 0 1 0 0-3.15 1.575 1.575 0 0 0 0 3.15"
      ></path>
    </svg>
  )
}