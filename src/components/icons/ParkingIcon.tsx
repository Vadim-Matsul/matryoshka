import { SVGProps } from 'react';

export function ParkingIcon(props: SVGProps<SVGSVGElement>) {

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
        fill="currentColor"
        d="M6.6 3H4.8a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 1.2 0V7.2h1.2a1.8 1.8 0 0 0 1.8-1.8v-.6A1.8 1.8 0 0 0 6.6 3m.6 2.4a.6.6 0 0 1-.6.6H5.4V4.2h1.2a.6.6 0 0 1 .6.6zM6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0m0 10.8a4.8 4.8 0 1 1 0-9.6 4.8 4.8 0 0 1 0 9.6"
      ></path>
    </svg>
  )
}