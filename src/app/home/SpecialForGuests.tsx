import { cn } from '@/utils/cn'
import { Controller, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Select, Transition } from '@headlessui/react'
import { Fragment, SVGProps, useState } from 'react';
import { pageLinkKeys, pageLinks } from '@/configs/links';
import { StarBorder } from '@/bits/animations/StarBorder/StarBorder';
import { BlurText } from '@/bits/BlurText';
import { FadeContent } from '@/bits/FadeContent';
import { BronePlacePOST } from '@/api/BronePlacePOST';
import { AnimatePresence, motion } from 'motion/react';
import Lottie from 'lottie-react';
import LottieSuccessJSON from '../../../public/lottie/lottie_success.json';
import { AnimatedImage } from '@/bits/AnimatedImage';
import { BLOCKS_IDS_ENUM } from '@/components/header';

type Props = {}

export function SpecialForGuests({ }: Props) {


  return (
    <section
      className='1_5xl:mx-auto 1_5xl:max-w-360'
    >
      <div className='h-[655px] md:h-[955px] rounded-t-2xl overflow-hidden relative'>
        <AnimatedImage
          src='/images/place.webp'
          alt='матрёшка'
          options={{
            blur: 20,
            scale: 1,
            delay: 0,
            duration: 1.5,
          }}
          className={cn(
            'w-full h-full object-cover relative z-[1]',
          )}
        />

        <div
          className={cn(
            'absolute left-0 -bottom-[2px] right-0 z-[2]',
            'h-[30%]',
            'bg-gradient-to-b from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
          )}
        />
      </div>

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
};
type SpecialGuestsFormProps = {}
function SpecialGuestsForm(props: SpecialGuestsFormProps) {

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      agree: false
    },
  });

  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const bronePlacePOST = BronePlacePOST();
  const onSubmit = async (data: FormValues) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await bronePlacePOST.request({
        agree: data.agree,
        name: data.name,
        phone: data.phone,
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