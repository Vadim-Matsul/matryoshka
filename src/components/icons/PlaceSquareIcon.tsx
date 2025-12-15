import { SVGProps } from 'react';

export function PlaceSquareIcon(props: SVGProps<SVGSVGElement>) {

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
        fillRule="evenodd"
        d="M4.2 12h-3A1.2 1.2 0 0 1 0 10.8v-3a.6.6 0 1 1 1.2 0v1.427a.3.3 0 0 0 .512.212l1.815-1.815L9.44 1.712a.3.3 0 0 0-.212-.512H7.8a.6.6 0 1 1 0-1.2h3A1.2 1.2 0 0 1 12 1.2v3a.6.6 0 1 1-1.2 0V2.773a.3.3 0 0 0-.512-.212L2.56 10.288a.3.3 0 0 0 .212.512H4.2a.6.6 0 1 1 0 1.2"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}