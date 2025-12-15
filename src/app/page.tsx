'use client'

import dynamic from 'next/dynamic'

// ВАЖНО: не скобки, а просто import('./...').then
const HomePage = dynamic(() => import('./home/HomePage').then(mod => mod.default), { ssr: false });

export default function Home() {
  return <HomePage />
}
