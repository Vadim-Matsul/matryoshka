'use client';

import { StarBorder } from '@/bits/animations/StarBorder/StarBorder';
import { pageLinkKeys, pageLinks } from '@/configs/links';
import { cn } from '@/utils/cn';
import { useRouter } from 'next/navigation';


export default function NotFound() {
  const router = useRouter();
  function goToHome() {
    router.replace(pageLinks[pageLinkKeys.HOME].href)
  }

  return (
    <section className='grid items-center h-screen'>
      <div className='flex flex-col gap-8'>
        <div className='flex items-center flex-col justify-center'>
          <h2 className='font-bold text-[46px] leading-[46px] font-unbounded'>404</h2>
          <p className='font-unbounded font-medium text-[24px] leading-[24px]'>Страница не найдена</p>
        </div>

        <div
          className={cn(
            'rounded-[30px] overflow-hidden ',
            'hover:scale-[.95] focus:scale-[.95] transition-all',
            'w-[220px] mx-auto'
          )}
        >
          <StarBorder
            as="button"
            onClick={goToHome}
            speed="3s"
            thickness={1.5}
            className={cn(
              'cursor-pointer pb-0.5'
            )}
          >
            <div
              className={cn(
                'bg-[linear-gradient(45deg,#B30122_0%,#ffffff40_60%,#B30122_100%)] ',
                'relative inline-flex rounded-[30px] p-[1px]',
                'shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.30)]',
                'w-full',
                cn(
                  'h-[48px]',
                )
              )}
            >
              <div
                className={cn(
                  'text-[18px] leading-[18px] w-full h-full rounded-[30px] bg-custom-black-100',
                  'flex items-center font-semibold justify-center uppercase tracking-[2px]'
                )}
              >
                <p>
                  На главную
                </p>
              </div>
            </div>
          </StarBorder>
        </div>
      </div>
    </section>
  );
}
