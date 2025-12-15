import { SVGProps } from 'react';

export function MapIcon(props: SVGProps<SVGSVGElement>) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      fill="none"
      viewBox="0 0 21 20"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          d="M1.778 17.413V5.553q0-.492.205-.848.212-.355.657-.595l3.944-2.27a4.4 4.4 0 0 1 .718-.328V16.45L3.76 18.37q-.417.232-.793.232-.52 0-.855-.307-.335-.3-.335-.882Zm6.775-1.19V1.452q.171.048.369.144.198.089.41.212l4.013 2.413v14.615a1.4 1.4 0 0 1-.342-.11 7 7 0 0 1-.321-.157l-4.13-2.344Zm6.043 2.564V3.885l3.506-1.935a1.75 1.75 0 0 1 .869-.253q.553 0 .895.301.35.294.349.896v11.778q0 .513-.212.861-.212.349-.67.609l-4.402 2.495q-.09.054-.178.089a1 1 0 0 1-.157.061"
        ></path>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="currentColor" d="M.5 0h20v20H.5z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}