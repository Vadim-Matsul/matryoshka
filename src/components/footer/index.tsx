'use client';

import { homeBlockIDs } from '@/configs/homeBlockIds';
import { pageLinkKeys, pageLinks } from '@/configs/links'
import { cn } from '@/utils/cn'
import { usePathname } from 'next/navigation';
import { InstagramIcon } from '../icons/InstagramIcon';
import { matryoshka } from '@/configs/matryoshka';
import { TelegramIcon } from '../icons/TelegramIcon';
import { LogoIcon } from '../icons/LogoIcon';


type Props = {}

const politics = [
  {
    title: 'Политика обработки персональных данных',
    href: pageLinks[pageLinkKeys.PRIVACY_POLICY].href,
    is: pageLinks[pageLinkKeys.PRIVACY_POLICY].is,
  },
  {
    title: 'Согласие на получение рекламно-информационных материалов',
    href: pageLinks[pageLinkKeys.TERMS_OF_USE].href,
    is: pageLinks[pageLinkKeys.TERMS_OF_USE].is,
  },
  {
    title: 'Согласие Пользователя сайта на обработку персональных данных',
    href: pageLinks[pageLinkKeys.PERSONAL_DATA_CONSENT].href,
    is: pageLinks[pageLinkKeys.PERSONAL_DATA_CONSENT].is,
  },
]

const weekMap = [
  { key: 'mon', label: 'пн' },
  { key: 'tue', label: 'вт' },
  { key: 'wed', label: 'ср' },
  { key: 'thu', label: 'чт' },
  { key: 'fri', label: 'пт' },
  { key: 'sat', label: 'сб' },
  { key: 'sun', label: 'вс' },
] as const;

export function Footer({ }: Props) {
  const pathname = usePathname();


  return (
    <footer
      className={cn(
        'flex',
        'px-[20px] pt-[30px] pb-[50px] lg:p-0',
        '1_5xl:max-w-[1440px] 1_5xl:mx-auto'
      )}
    >
      <div
        className={cn(
          'max-w-[300px] mx-auto w-full lg:hidden'
        )}
      >
        <div className='flex flex-col gap-4'>
          <a
            href={matryoshka.instagram.href}
            target='_blank'
            className={cn(
              'flex items-center gap-3',
              'text-custom-white-500 hover:opacity-80 focus:opacity-80 transition-all',
              'uppercase font-medium text-[12px] leading-[12px] tracking-[1px]'
            )}
          >
            <InstagramIcon className='w-6 h-6' />
            <span>matreshka_karaoke</span>
          </a>
          <a
            href={matryoshka.telegram.href}
            target='_blank'
            className={cn(
              'flex items-center gap-3',
              'text-custom-white-500 hover:opacity-80 focus:opacity-80 transition-all',
              'uppercase font-medium text-[12px] leading-[12px] tracking-[1px]'
            )}
          >
            <TelegramIcon className='w-6 h-6' />
            <span>matreshka_karaoke</span>
          </a>
        </div>

        <div className='flex flex-col gap-2 mt-[60px]'>
          <a
            href={matryoshka.adress.href}
            target='_blank'
            className={cn(
              'flex items-center gap-3',
              'text-custom-white-500 hover:opacity-80 focus:opacity-80 transition-all',
              ' font-medium text-[12px] leading-[12px] tracking-[1px]'
            )}
          >
            <span>{matryoshka.adress.name}</span>
          </a>
          <a
            href={matryoshka.phone.href}
            target='_blank'
            className={cn(
              'flex items-center gap-3',
              'text-custom-white-500 hover:opacity-80 focus:opacity-80 transition-all',
              'uppercase font-medium text-[12px] leading-[12px] tracking-[1px]'
            )}
          >
            <span>{matryoshka.phone.str}</span>
          </a>
        </div>

        <div className='flex gap-10 font-medium text-[12px] leading-[12px] mt-[30px] text-custom-white-500'>
          <div className='flex flex-col gap-2'>
            <p className='flex items-center gap-3'>
              <span className='inline-block w-3.5'>пн</span>
              <span>Закрыто</span>
            </p>
            <p className='flex items-center gap-3'>
              <span className='inline-block w-3.5'>вт</span>
              <span>Закрыто</span>
            </p>
            <p className='flex items-center gap-3'>
              <span className='inline-block w-3.5'>ср</span>
              <span>Закрыто</span>
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='flex items-center gap-3'>
              <span className='inline-block w-3.5'>чт</span>
              <span>20:00-03:00</span>
            </p>
            <p className='flex items-center gap-3'>
              <span className='inline-block w-3.5'>пт</span>
              <span>20:00-05:00</span>
            </p>
            <p className='flex items-center gap-3'>
              <span className='inline-block w-3.5'>сб</span>
              <span>20:00-05:00</span>
            </p>
            <p className='flex items-center gap-3'>
              <span className='inline-block w-3.5'>вс</span>
              <span>Закрыто</span>
            </p>
          </div>
        </div>

        <p className='text-[12px] leading-[15px] font-medium uppercase tracking[1px] text-custom-grey-100 mt-[60px]'>
          *Meta признана экстремистcкой организацией в России
        </p>

        <p className='text-[12px] leading-[15px] font-medium uppercase tracking[1px] text-custom-grey-100 mt-5'>
          18+ ПОЖАЛУЙСТА, ВОЗЬМИТЕ С СОБОЙ ОРИГИНАЛЫ ДОКУМЕНТОВ, ПОДТВЕРЖДАЮЩИХ ВОЗРАСТ
        </p>

        <ul className='flex flex-col gap-2.5 mt-[30px]'>
          {politics.map(politic => {
            const is = politic.is(pathname);

            return (
              <a
                key={politic.href}
                onClick={(evt) => {
                  if (is) {
                    evt.preventDefault();
                    evt.stopPropagation();
                  }
                }}
                href={politic.href}
                target='_blank'
                className={cn(
                  is ? 'text-custom-white-500' : cn(
                    'text-custom-grey-100',
                    'hover:opacity-80 focus:opacity-80 transition-all duration-300'
                  ),
                  'text-[12px] leading-[12px]'
                )}
              >
                {politic.title}
              </a>
            )
          })}
        </ul>
      </div>

      <div
        className={cn(
          'hidden lg:block grow',
        )}
      >
        <div
          className={cn(
            'px-[40px] pt-[30px] pb-[60px]',
            'flex justify-between'
          )}
        >
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col gap-2 '>
              <a
                href={matryoshka.adress.href}
                target='_blank'
                className={cn(
                  'flex items-center gap-3',
                  'text-custom-white-500 hover:opacity-80 focus:opacity-80 transition-all',
                  ' font-medium text-[12px] leading-[12px] tracking-[1px]'
                )}
              >
                <span>{matryoshka.adress.name}</span>
              </a>
              <a
                href={matryoshka.phone.href}
                target='_blank'
                className={cn(
                  'flex items-center gap-3',
                  'text-custom-white-500 hover:opacity-80 focus:opacity-80 transition-all',
                  'uppercase font-medium text-[12px] leading-[12px] tracking-[1px]'
                )}
              >
                <span>{matryoshka.phone.str}</span>
              </a>
            </div>

            <div
              className={cn(
                'font-medium text-[12px] leading-[12px] mt-[60px] text-custom-white-500',
                'flex gap-2 flex-col'
              )}
            >
              <p className='flex items-center gap-3'>
                <span className='inline-block w-3.5'>пн</span>
                <span>Закрыто</span>
              </p>
              <p className='flex items-center gap-3'>
                <span className='inline-block w-3.5'>вт</span>
                <span>Закрыто</span>
              </p>
              <p className='flex items-center gap-3'>
                <span className='inline-block w-3.5'>ср</span>
                <span>Закрыто</span>
              </p>
              <p className='flex items-center gap-3'>
                <span className='inline-block w-3.5'>чт</span>
                <span>20:00-03:00</span>
              </p>
              <p className='flex items-center gap-3'>
                <span className='inline-block w-3.5'>пт</span>
                <span>20:00-05:00</span>
              </p>
              <p className='flex items-center gap-3'>
                <span className='inline-block w-3.5'>сб</span>
                <span>20:00-05:00</span>
              </p>
              <p className='flex items-center gap-3'>
                <span className='inline-block w-3.5'>вс</span>
                <span>Закрыто</span>
              </p>
            </div>
          </div>

          <div className='flex flex-col justify-between'>
            <div className='flex flex-col items-center gap-4'>
              <a
                href={matryoshka.instagram.href}
                target='_blank'
                className={cn(
                  'flex items-center gap-3',
                  'text-custom-white-500 hover:opacity-80 focus:opacity-80 transition-all',
                  'uppercase font-medium text-[12px] leading-[12px] tracking-[1px]'
                )}
              >
                <InstagramIcon className='w-6 h-6' />
                <span>matreshka_karaoke</span>
              </a>
              <a
                href={matryoshka.telegram.href}
                target='_blank'
                className={cn(
                  'flex items-center gap-3',
                  'text-custom-white-500 hover:opacity-80 focus:opacity-80 transition-all',
                  'uppercase font-medium text-[12px] leading-[12px] tracking-[1px]'
                )}
              >
                <TelegramIcon className='w-6 h-6' />
                <span>matreshka_karaoke</span>
              </a>
            </div>

            <ul className='flex flex-col items-center gap-2.5 mt-[78px]'>
              {politics.map(politic => {
                const is = politic.is(pathname);

                return (
                  <a
                    key={politic.href}
                    onClick={(evt) => {
                      if (is) {
                        evt.preventDefault();
                        evt.stopPropagation();
                      }
                    }}
                    href={politic.href}
                    target='_blank'
                    className={cn(
                      is ? 'text-custom-white-500' : cn(
                        'text-custom-white-500',
                        'hover:opacity-80 focus:opacity-80 transition-all duration-300'
                      ),
                      'text-[12px] leading-[12px]'
                    )}
                  >
                    {politic.title}
                  </a>
                )
              })}
            </ul>
          </div>

          <div className='flex flex-col justify-between'>
            <div className='flex grow flex-col justify-between items-end text-right'>
              <p className='text-[12px] leading-[15px] font-medium w-[200px] tracking[1px] text-custom-white-500'>
                *Meta признана экстремистcкой организацией в России
              </p>

              <p className='text-[12px] leading-[15px] font-medium w-[260px] uppercase tracking[1px] text-custom-white-500 mt-5'>
                18+ ПОЖАЛУЙСТА, ВОЗЬМИТЕ С СОБОЙ ОРИГИНАЛЫ ДОКУМЕНТОВ, ПОДТВЕРЖДАЮЩИХ ВОЗРАСТ
              </p>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'bg-[linear-gradient(90.67deg,#BC0123_-9.32%,#550A16_93.63%)] py-[6px]',
          )}
        >
          <div
            className='h-px border border-white border-dashed dashed'
          />

          <div
            className={cn(
              'h-[33px] flex justify-between px-8'
            )}
          >
            <div className='grow flex items-center'>
              <Figure1 />
              <div className='grow flex justify-center'>
                <LogoIcon className='w-[80px] h-3' />
              </div>
            </div>

            <div className='grow flex items-center'>
              <Figure2 />
              <div className='grow flex justify-center'>
                <LogoIcon className='w-[80px] h-3' />
              </div>
            </div>

            <div className='grow flex items-center'>
              <Figure3 />
              <div className='grow flex justify-center'>
                <LogoIcon className='w-[80px] h-3' />
              </div>
            </div>

            <div className='grow flex items-center'>
              <Figure4 />
              <div className='grow flex justify-center'>
                <LogoIcon className='w-[80px] h-3' />
              </div>
            </div>

            <div className='grow flex items-center'>
              <Figure2 />
              <div className='grow flex justify-center'>
                <LogoIcon className='w-[80px] h-3' />
              </div>
            </div>

            <div className='flex items-center'>
              <Figure3 />
            </div>
          </div>

          <div
            className='h-px border border-white border-dashed'
          />
        </div>
      </div>
    </footer >
  )
}

function Figure1() {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      fill="none"
      viewBox="0 0 20 21"
    >
      <path
        fill="#FDEFDF"
        d="M10.582 10.506v-.012C15.64 10.43 19.744 5.818 20 .028 19.84.018 19.682 0 19.52 0 14.417 0 10.266 4.63 10 10.456H10C9.733 4.633 5.582 0 .48 0 .318 0 .16.02 0 .028c.256 5.823 4.403 10.458 9.499 10.47C4.403 10.515.259 15.15 0 20.973c.16.01.318.028.48.028C5.585 21 9.739 16.362 10 10.534 10.259 16.362 14.414 21 19.517 21c.163 0 .32-.018.48-.028-.255-5.793-4.36-10.403-9.417-10.466z"
      ></path>
    </svg>
  )
}

function Figure2() {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      fill="none"
      viewBox="0 0 20 21"
    >
      <path
        fill="#FDEFDF"
        d="M18.143 6.124C12.813 1.706 10.046 0 10.046 0s-3.16 1.908-8.098 6.12c-2.936 2.504-2.236 6.208.002 8.577.325.345.68.633 1.055.875C3.967 18.722 6.753 21 10.046 21s6.075-2.275 7.039-5.42a5.8 5.8 0 0 0 1.063-.88c2.235-2.367 2.694-6.464-.003-8.578zM12.01 17.832c-.214.956-1.021 1.673-1.99 1.673S8.24 18.79 8.03 17.83h-.003l.046-.062c.017-.023.043-.056.07-.087.011-.012.019-.022.03-.038.032-.038.073-.081.114-.127l.038-.046c.048-.054.104-.107.159-.163l.029-.031q.084-.081.175-.153.021-.02.041-.036.095-.074.197-.137.021-.014.041-.029.098-.055.192-.091.025-.013.053-.026a.8.8 0 0 1 .245-.043c.212 0 .486.153.55.464a.58.58 0 0 1 .551-.464q.122 0 .245.043c.015.005.03.015.046.02q.102.038.205.097c.004 0 .007.006.01.008q.115.07.227.158.012.008.017.015.107.085.202.177.021.02.041.04c.053.051.106.105.152.153.01.01.014.018.024.028.144.159.242.281.269.317.002.002.012.012.012.015z"
      ></path>
    </svg>
  )
}

function Figure3() {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      fill="none"
      viewBox="0 0 21 21"
    >
      <path
        fill="#FDEFDF"
        d="M15.583 10.395a5.19 5.19 0 0 1 5.19 5.194 5.19 5.19 0 0 1-5.2 5.184 5.19 5.19 0 0 1-5.187-5.087 5.19 5.19 0 0 1-5.192 5.091A5.19 5.19 0 0 1 0 15.587a5.19 5.19 0 0 1 5.194-5.189 5.19 5.19 0 0 1 5.192 5.09 5.19 5.19 0 0 1 5.197-5.093M5.195 0a5.19 5.19 0 0 1 5.192 5.127A5.19 5.19 0 0 1 15.574.005a5.19 5.19 0 0 1 5.2 5.183 5.19 5.19 0 0 1-5.189 5.195 5.19 5.19 0 0 1-5.198-5.127 5.19 5.19 0 0 1-5.192 5.123 5.19 5.19 0 0 1-5.194-5.19A5.19 5.19 0 0 1 5.195 0"
      ></path>
    </svg>
  )
}

function Figure4() {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      fill="none"
      viewBox="0 0 21 21"
    >
      <path
        fill="#FDEFDF"
        d="M.01 10.31c5.38.094 7.037.668 8.7 2.248 1.283 1.217 1.554 4.7 1.601 6.665v.06c.008.272.007.513.007.714.013-1.63.123-6.036 1.593-7.44l.005.003c1.644-1.57 3.292-2.144 8.543-2.245-.045 5.608-4.603 10.142-10.225 10.142S.052 15.921.01 10.31M10.227 0c5.648 0 10.227 4.579 10.227 10.228v.076c-5.251-.102-6.896-.68-8.543-2.245-1.339-1.27-1.575-5.006-1.604-6.907.017-.68.005-1.129.005-1.14 0 .01-.015.458-.005 1.14h-.008C10.254 3.062 10 6.826 8.702 8.06 7.038 9.639 5.381 10.212 0 10.307v-.08C0 4.58 4.578 0 10.227 0"
      ></path>
    </svg>
  )
}