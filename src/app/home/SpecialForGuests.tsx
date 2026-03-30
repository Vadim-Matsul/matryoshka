import { cn } from '@/utils/cn'
import { Controller, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { SVGProps, useEffect, useRef, useState } from 'react';
import { pageLinkKeys, pageLinks } from '@/configs/links';
import { StarBorder } from '@/bits/animations/StarBorder/StarBorder';
import { BlurText } from '@/bits/BlurText';
import { FadeContent } from '@/bits/FadeContent';
import { BronePlacePOST } from '@/api/BronePlacePOST';
import { AnimatePresence, motion } from 'motion/react';
import Lottie from 'lottie-react';
import LottieSuccessJSON from '../../../public/lottie/lottie_success.json';
import { BLOCKS_IDS_ENUM } from '@/components/header';
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'
import '@/style/daypicker.css'
import '@vaadin/time-picker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { getRoistatVisit } from '@/utils/getRoistatVisit';


dayjs.extend(customParseFormat)

const SCHEDULE = {
  4: { start: '20:00', end: '03:00' }, // чт
  5: { start: '20:00', end: '06:00' }, // пт
  6: { start: '20:00', end: '06:00' }, // сб
} as const

type Props = {}

export function SpecialForGuests({ }: Props) {


  return (
    <section
      className='1_5xl:mx-auto 1_5xl:max-w-360'
    >
      <article
        id={BLOCKS_IDS_ENUM.BRONE}
        className={cn(
          'flex flex-col',
          'py-[90px] gap-[60px]',
          'md:gap-[80px] md:py-[110px]'
        )}
      >
        <div
          className={cn(
            'text-center relative',
            'flex flex-col gap-4 md:gap-6 px-[20px]',
            'max-w-[390px] w-full md:max-w-[540px] mx-auto w-full',
          )}
        >
          <h2
            className={cn(
              'font-jost uppercase tracking-[3px]',
              'text-[22px] leading-[24px]',
              'md:text-[36px] md:leading-[40px]',
            )}
          >
            <BlurText
              text="Сотворите свой вечер"
              delay={300}
              animateBy="words"
              direction="bottom"
              className='justify-center'
            />
          </h2>

          <div
            className={cn(
              'font-jost ',
              'text-[14px] leading-[16px]',
              'md:text-[18px] leading-[22px]',
            )}
          >
            <FadeContent
              blur={true}
              delay={600}
              duration={1000}
              easing="ease-out"
              initialOpacity={0}
            >
              <p>
                Каждого гостя встречаем по-доброму — с&nbsp;вниманием, настроением и&nbsp;настоящим гостеприимством
              </p>
            </FadeContent>
          </div>
        </div>

        <div
          className={cn(
            'flex justify-center',
          )}
        >
          <div
          >
            <SpecialGuestsForm />
          </div>
        </div>
      </article>
    </section>
  )
}

type FormValues = {
  name: string;
  phone: string;
  agree: boolean;
  date: string;
  time: string;
  guests: number;
  comment?: string;
  roistat_visit: string;
};
type SpecialGuestsFormProps = {}
function SpecialGuestsForm(props: SpecialGuestsFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      date: '',
      time: '',
      guests: 1,
      comment: '',
      agree: false,
      roistat_visit: getRoistatVisit(),
    },
  });

  const [openCalendar, setOpenCalendar] = useState(false)
  const calendarRef = useRef<HTMLDivElement | null>(null)

  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const bronePlacePOST = BronePlacePOST();
  const onSubmit = async (data: FormValues) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await bronePlacePOST.request({
        ...data,
        place: 'матрёшка'
      })

      if (!response.error && !!response.data) {
        setIsSuccessSubmit(true)
      }
    } catch (err) {
      console.error('ошибка запроса SFG: ', err)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Calendar обработчик клика закрытия вне
    function handleClickOutside(event: MouseEvent) {
      if (!calendarRef.current) return

      if (!calendarRef.current.contains(event.target as Node)) {
        setOpenCalendar(false)
      }
    }

    if (openCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openCalendar])

  useEffect(() => {
    // Calendar обработчик клика закрытия на ESC
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenCalendar(false)
      }
    }

    if (openCalendar) {
      document.addEventListener('keydown', handleEsc)
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [openCalendar])

  return (
    <AnimatePresence mode='popLayout'>
      {isSuccessSubmit ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='grow flex items-center justify-center'
        >
          <Lottie
            animationData={LottieSuccessJSON}
            loop={false}
          />
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={cn(
              'flex flex-col gap-3',
              'md:gap-3 md:w-[462px] lg:mx-auto',
            )}
          >

            <div
              className={
                cn(
                  'lg:flex-1 lg:basis-0',
                )
              }
            >
              <FadeContent
                blur={true}
                duration={1000}
                easing="ease-out"
                initialOpacity={0}
              >
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Введите имя" }}
                  render={({ field: { onChange, value, onBlur, ref } }) => {
                    const isDisabled = bronePlacePOST.isLoading;

                    return (
                      <input
                        type="text"
                        placeholder="Имя"
                        disabled={isDisabled}
                        onChange={onChange}
                        value={value}
                        onBlur={onBlur}
                        ref={ref}
                        className={cn(
                          "w-full transition-all px-[16px] py-[13px] rounded-[30px]",
                          "bg-custom-black-400 text-custom-white-200",
                          "placeholder:font-jost placeholder:text-[16px] placeholder:leading-none",
                          "placeholder:text-custom-white-300",
                          "focus:text-custom-white-102",
                          "disabled:bg-custom-black-600 disabled:text-[#3b3b3b]",
                          errors.name
                            ? "outline-1 outline-custom-red-100"
                            : "outline-none",
                          cn(
                            'md:h-[48px]'
                          )
                        )}
                      />
                    )
                  }}
                />
              </FadeContent>
            </div>


            <div
              className={
                cn(
                  'lg:flex-1 lg:basis-0',
                )
              }
            >
              <FadeContent
                blur={true}
                duration={1000}
                easing="ease-out"
                initialOpacity={0}
              >
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Введите телефон",
                    validate: (val) => {
                      // убираем всё, кроме цифр
                      const digits = val.replace(/\D/g, "");
                      // В России номер должен содержать 11 цифр: 7XXXXXXXXXX
                      if (digits.length !== 11) {
                        return "Введите корректный телефон";
                      }
                      return true;
                    },
                  }}
                  render={({ field: { onChange, value, onBlur, ref } }) => {
                    const isDisabled = bronePlacePOST.isLoading;

                    return (
                      <IMaskInput
                        mask="+{7} (000) 000-00-00"
                        value={value}
                        onAccept={(val) => onChange(val)}
                        onBlur={onBlur}
                        inputRef={ref}
                        disabled={isDisabled}
                        placeholder="Телефон"
                        className={cn(
                          cn(
                            'lg:flex-1 lg:basis-0'
                          ),
                          "w-full transition-all px-[16px] py-[13px] rounded-[30px]",
                          "bg-custom-black-400 text-custom-white-200",
                          "placeholder:font-jost placeholder:text-[16px] placeholder:leading-none",
                          "placeholder:text-custom-white-300",
                          "focus:text-custom-white-102",
                          "disabled:bg-custom-black-600 disabled:text-[#3b3b3b]",
                          errors.phone
                            ? "outline-1 outline-custom-red-100"
                            : "outline-none",
                          cn(
                            'md:h-[48px]'
                          )
                        )}
                      />
                    );
                  }}
                />
              </FadeContent>
            </div>

            <div className='flex flex-col gap-3 md:flex-row'>
              <div key='date' className={cn('md:w-1/2 relative z-[10]')}>
                <FadeContent blur duration={1000} easing="ease-out" initialOpacity={0}>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Выберите дату" }}
                    render={({ field: { onChange, value } }) => {
                      const isDisabled = bronePlacePOST.isLoading;

                      const selectedDate = value ? new Date(value) : undefined

                      const startOfToday = new Date()
                      startOfToday.setHours(0, 0, 0, 0)

                      const disabledDays = (date: Date) => {
                        const d = new Date(date)
                        d.setHours(0, 0, 0, 0)

                        if (d < startOfToday) return true

                        const day = d.getDay()

                        if (d.getTime() === startOfToday.getTime()) {
                          // Не работает в пн вт ср вс
                          return day === 1 || day === 2 || day === 3 || day === 0
                        }

                        // Не работает в пн вт ср вс
                        return day === 1 || day === 2 || day === 3 || day === 0
                      }

                      return (
                        <div className="relative">
                          <input
                            readOnly
                            disabled={isDisabled}
                            value={
                              selectedDate ? format(selectedDate, 'd MMMM', { locale: ru }) : ''
                            }
                            placeholder="Дата бронирования"
                            onClick={() => setOpenCalendar(prev => !prev)}
                            className={cn(
                              cn(
                                'lg:flex-1 lg:basis-0',
                                'focus:opacity-80'
                              ),
                              "w-full transition-all px-[16px] py-[13px] rounded-[30px]",
                              "bg-custom-black-400 text-custom-white-200",
                              "placeholder:font-jost placeholder:text-[16px] placeholder:leading-none",
                              "placeholder:text-custom-white-300",
                              "focus:text-custom-white-102",
                              "disabled:bg-custom-black-600 disabled:text-[#3b3b3b]",
                              errors.date
                                ? "outline-1 outline-custom-red-100"
                                : "outline-none",
                              cn(
                                'md:h-[48px]'
                              )
                            )}
                          />

                          {openCalendar && (
                            <div
                              ref={calendarRef}
                              className="absolute z-[1000] mt-2 bg-black p-4 rounded-xl shadow-xl"
                            >
                              <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => {
                                  if (isDisabled) return;
                                  if (!date) return
                                  onChange(date.toISOString())
                                  setOpenCalendar(false)
                                }}
                                disabled={disabledDays}
                                locale={ru}
                              />
                            </div>
                          )}

                        </div>
                      )
                    }}
                  />

                </FadeContent>
              </div>

              <Controller
                name="time"
                control={control}
                rules={{ required: 'Введите время' }}
                render={({ field: { onChange, value } }) => {
                  const isDisabled = bronePlacePOST.isLoading;

                  const selectedDateStr = watch('date')
                  const selectedDate = selectedDateStr
                    ? dayjs(selectedDateStr)
                    : null

                  const timeValue = value
                    ? dayjs(value, 'HH:mm')
                    : null

                  function handleChange(newValue: Dayjs | null) {
                    onChange(newValue ? newValue.format('HH:mm') : null)
                  }

                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={timeValue}
                        onChange={handleChange}
                        ampm={false}
                        disabled={isDisabled}
                        className={cn(
                          'md:w-1/2 rounded-[30px]',
                          errors.time
                            ? "outline-1 outline-custom-red-100"
                            : "outline-none",
                        )}
                        minTime={
                          selectedDate && selectedDate.isSame(dayjs(), 'day')
                            ? dayjs().add(30, 'minute')
                            : dayjs('09:00', 'HH:mm')
                        }
                      />
                    </LocalizationProvider>
                  )
                }}
              />
            </div>

            <Controller
              name="guests"
              control={control}
              rules={{
                required: 'Укажите количество гостей',
                min: { value: 1, message: 'Минимум 1 гость' },
                max: { value: 12, message: 'Максимум 12 гостей' },
              }}
              render={({ field: { value, onChange } }) => {
                const guests = value ?? 1

                function increment() {
                  if (guests < 12) onChange(guests + 1)
                }

                function decrement() {
                  if (guests > 1) onChange(guests - 1)
                }

                return (
                  <div
                    className={cn(
                      'flex items-center justify-between',
                      'px-[16px] py-[13px] rounded-[30px]',
                      'bg-custom-black-400 text-custom-white-200',
                      'md:h-[48px]'
                    )}
                  >
                    <span className="font-jost text-[16px] leading-4 tracking-[1px]">
                      Гостей: {guests}
                    </span>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={decrement}
                        disabled={guests <= 1}
                        className="transition-all cursor-pointer disabled:cursor-auto w-8 h-8 rounded-full bg-custom-black-600 disabled:opacity-40"
                      >
                        <p className='-translate-y-[2px]'>−</p>
                      </button>

                      <button
                        type="button"
                        onClick={increment}
                        disabled={guests >= 12}
                        className="transition-all cursor-pointer disabled:cursor-auto w-8 h-8 rounded-full bg-custom-black-600 disabled:opacity-40"
                      >
                        <p className='-translate-y-[2px]'>
                          +
                        </p>
                      </button>
                    </div>
                  </div>
                )
              }}
            />

            <Controller
              name="comment"
              control={control}
              rules={{
                maxLength: {
                  value: 500,
                  message: 'Максимум 500 символов'
                }
              }}
              render={({ field: { onChange, value, onBlur, ref } }) => {
                const isDisabled = bronePlacePOST.isLoading

                return (
                  <textarea
                    placeholder="Пожелания"
                    disabled={isDisabled}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    rows={3}
                    className={cn(
                      "w-full transition-all px-[16px] py-[20px] rounded-[30px]",
                      "bg-custom-black-400 text-custom-white-200",
                      "placeholder:font-jost placeholder:text-[16px]",
                      "placeholder:text-custom-white-300",
                      "focus:text-custom-white-102 resize-none",
                      "disabled:bg-custom-black-600 disabled:text-[#3b3b3b]",
                      errors.comment
                        ? "outline-1 outline-custom-red-100"
                        : "outline-none"
                    )}
                  />
                )
              }}
            />
          </div>

          <div
            className={cn(
              'flex flex-col gap-[60px]',
              'mt-[20px] md:mt-6 md:gap-[100px]',
            )}
          >
            <FadeContent
              blur={true}
              duration={1000}
              easing="ease-out"
              initialOpacity={0}
            >
              <div
                key="custom-checkbox 2"
                className={cn("flex gap-[8px] items-center")}
              >
                <div>
                  <Controller
                    name="agree"
                    control={control}
                    rules={{ required: "Выберите" }}
                    render={({ field: { onChange, value, onBlur, ref } }) => {
                      const isDisabled = bronePlacePOST.isLoading;
                      return (
                        <input
                          type="checkbox"
                          id="custom-checkbox-politics-offerts-2"
                          disabled={isDisabled}
                          onChange={onChange}
                          checked={value.valueOf()}
                          onBlur={onBlur}
                          ref={ref}
                          className={cn(
                            'peer hidden',
                            "w-full transition-all px-[16px] py-[13px] rounded-[30px]",
                            "bg-custom-black-400 text-custom-white-200",
                            "placeholder:font-jost placeholder:text-[16px] placeholder:leading-none",
                            "placeholder:text-custom-white-300",
                            "focus:text-custom-white-102",
                            "disabled:bg-custom-black-600 disabled:text-[#3b3b3b]",
                            errors.agree
                              ? "outline-1 outline-custom-red-100"
                              : "outline-none"
                          )}
                        />
                      )
                    }}
                  />

                  <label
                    htmlFor="custom-checkbox-politics-offerts-2"
                    className={cn(
                      "relative transition-all cursor-pointer",
                      "w-5 h-5 block rounded-[6px]",
                      "border-2 border-[#373b3b] text-transparent",
                      "peer-checked:border-custom-white-102 peer-checked:bg-custom-white-102",
                      "peer-checked:text-[#0f0f0f]",
                      "peer-disabled:opacity-70 peer-disabled:cursor-auto",
                      '',
                      errors.agree
                        ? "outline-2 outline-offset-1 outline-custom-red-100"
                        : "outline-none"
                    )}
                  >
                    <svg
                      width="12"
                      height="9"
                      viewBox="0 0 12 9"
                      className={cn(
                        "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
                        "text-inherit"
                      )}
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11.707 2.457a1 1 0 0 0-1.414-1.414L4 7.336 1.707 5.043A1 1 0 0 0 .293 6.457l3 3a1 1 0 0 0 1.414 0l7-7Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </div>

                <FadeContent
                  blur={true}
                  duration={2000}
                  easing="ease-out"
                  initialOpacity={0}
                >
                  <div
                    className={cn(
                      "text-[12px] leading-[14px] font-medium font-jost",
                      "text-[#3b3b3b]",
                      'lg:text-[14px]'
                    )}
                  >
                    Я&nbsp;соглашаюсь&nbsp;с&nbsp;
                    <a
                      href={pageLinks[pageLinkKeys.PRIVACY_POLICY].href}
                      target="_blank"
                      className={cn(
                        "text-[#A2ACB0] underline hover:opacity-80 transition-all"
                      )}
                    >
                      Политикой&nbsp;конфицендиальности
                    </a>
                    <span className='hidden lg:inline'>&nbsp;</span>
                    <br className='lg:hidden' />и&nbsp;
                    <a
                      href={pageLinks[pageLinkKeys.TERMS_OF_USE].href}
                      target="_blank"
                      className={cn(
                        "text-[#A2ACB0] underline hover:opacity-80 transition-all"
                      )}
                    >
                      Пользовательским&nbsp;соглашением
                    </a>
                  </div>
                </FadeContent>
              </div>
            </FadeContent>

            <FadeContent
              blur={true}
              duration={2000}
              easing="ease-out"
              initialOpacity={0}
            >
              <div
                className={cn(
                  'rounded-[30px] overflow-hidden',
                  isLoading ? 'opacity-80' : 'hover:scale-[.95] focus:scale-[.95] transition-all',
                  'w-full md:w-[240px] md:mx-auto'
                )}
              >
                <StarBorder
                  as="button"
                  type='submit'
                  disabled={isLoading}
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
                        'h-[40px]',
                      )
                    )}
                  >
                    <div
                      className={cn(
                        'w-full h-full rounded-[30px] bg-custom-black-100 uppercase',
                        'flex items-center justify-center text-custom-white-102/90',
                        'text-[14px] tracking-[1px] font-semibold'
                      )}
                    >
                      <p>
                        Ко двору званому
                      </p>
                    </div>
                  </div>
                </StarBorder>
              </div>
            </FadeContent>
          </div>
        </form>
      )}
    </AnimatePresence>
  )
}

function ChevrownDownArrowIcon(props: SVGProps<SVGSVGElement>) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" {...props}>
      <g clipPath="url(#a)">
        <path fill="currentColor" d="M10 14.604a.645.645 0 0 1-.28-.062.856.856 0 0 1-.24-.17L2.74 7.35a.813.813 0 0 1-.15-.226.65.65 0 0 1-.055-.267.66.66 0 0 1 .089-.341.653.653 0 0 1 .24-.246.71.71 0 0 1 .355-.09c.187 0 .346.064.478.192l6.727 6.986h-.841l6.713-6.986a.687.687 0 0 1 .485-.191.673.673 0 0 1 .595.335c.06.1.089.214.089.341a.65.65 0 0 1-.055.267.854.854 0 0 1-.15.219l-6.74 7.02a.84.84 0 0 1-.24.178.647.647 0 0 1-.28.062Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="currentColor" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>

  )
}