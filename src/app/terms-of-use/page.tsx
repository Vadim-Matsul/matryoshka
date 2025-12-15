'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { pageLinkKeys, pageLinks } from '@/configs/links';
import { cn } from '@/utils/cn';

const site = 'https://matreshka-karaoke.ru';
const privacyPoliceText = site + pageLinks[pageLinkKeys.PRIVACY_POLICY].href
const inn = '9706038130'
const ogrn = '1237700746095'
const adress = '119072, г. Москва, вн. тер.г. муниципальный округ Якиманка, наб. Болотная, д. 3, стр. 2';
const company = 'Красный Октябрь РУФ'
const aCN = 'whitespace-nowrap cursor-pointer transition-all hover:text-custom-brand-100 decoration-custom-brand-100 hover:opacity-80 underline underline-offset-3'
export default function PersonalDataConsent() {

  return (
    <section>
      <Header />

      <article
        className={cn(
          'px-4 text-custom-white-102',
          'mt-10 mb-20',
          'max-w-[850px] mx-auto',
        )}
      >
        <div className='mt-10'>
          <h1>
            <p
              className={cn(
                'font-medium leading-none',
                'text-[24px]'
              )}
            >
              Пользовательское соглашение
            </p>
          </h1>
        </div>

        <section className='flex flex-col gap-10'>
          <div className='text-[16px] leading-[22px]'>
            Настоящее Соглашение является официальным предложением (офертой), которое адресовано Компанией, в ведении которой находится Сайт, с одной стороны, к лицу, намеревающемуся использовать Сайт, независимо от целей такого использования, на обозначенных Соглашением условиях <strong>(Пользователь)</strong>, с другой стороны, до совершения указанных действий ознакомиться с настоящим Пользовательским соглашением <strong>(Соглашение)</strong>, и полностью и безоговорочно принять его, выразив акцепт оферты, в порядке и на условиях, указанных в Соглашении.
          </div>

          <section className="flex flex-col gap-8">
            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">1.</span> Термины и их определения
              </li>

              <ul className="flex flex-col gap-2 ml-3.5">
                <li>
                  <span className="font-semibold">1.1. </span>
                  <strong>Соглашение</strong> – настоящее Пользовательское соглашение, размещенное в сети Интернет по адресу:
                  &#8197;<a target='_blank' href={pageLinks[pageLinkKeys.HOME].href} className={aCN}>{site}</a>.
                </li>
                <li>
                  <span className="font-semibold">1.2. </span>
                  <strong>Компания</strong> – Общество с ограниченной ответственностью <span className='whitespace-nowrap'>«{company}»</span>, <span className='whitespace-nowrap'>ИНН: {inn}</span>, <span className='whitespace-nowrap'>ОГРН: {ogrn}</span>, адрес: {adress}
                </li>
                <li>
                  <span className="font-semibold">1.3. </span>
                  <strong>Пользователь</strong> – физическое лицо, не имеющее законодательных ограничений для акцепта настоящего Соглашения, действующее от своего имени и в своих интересах.
                </li>
                <li>
                  <span className="font-semibold">1.4. </span>
                  <strong>Сайт</strong> – веб-сайт Компании, размещенный по адресу
                  &#8197;<a target='_blank' href={pageLinks[pageLinkKeys.HOME].href} className={aCN}>{site}</a>.
                </li>
                <li>
                  <span className="font-semibold">1.5. </span>
                  <strong>Контент Сайта</strong> – совокупность результатов интеллектуальной деятельности (РИД), а также каждый РИД в отдельности, представляющая собой следующее информационное наполнение, включая, но не ограничиваясь: любую текстовую информацию, изображения, фотографии, ссылки, видеозаписи, аудиозаписи, и так далее, правообладателем которых является Компания.
                </li>
                <li>
                  <span className="font-semibold">1.6. </span>
                  <strong>Устройство</strong> – различные устройства мобильной связи (мобильные телефоны, планшеты и их аналоги), либо иные устройства, эмулирующие их использование, а также компьютеры, ноутбуки и их аналоги.
                </li>
              </ul>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">2.</span> Преамбула
              </li>
              <ul className="gap-2 ml-3.5 flex flex-col">
                <li>
                  <span className="font-semibold">2.1. </span>
                  Стороны согласовали, что Пользователь, который использует Сайт, считается ознакомленным с условиями Соглашения в полном объеме, и полностью и безоговорочно принимает их условия. В свою очередь, Компания обязуется обеспечивать для Пользователей постоянную возможность изучить положения Соглашения, путем предоставления доступа на Сайте.
                </li>
                <li>
                  <span className="font-semibold">2.2. </span>
                  Продолжая использовать Сайт, Пользователь подтверждает, что не пребывает в состоянии заблуждения (существенного либо несущественного) относительно характеристик и функционала Сайта, условий Соглашения и своих собственных действий. Пользователь принимает, что в соответствии с настоящим Соглашением, Сайт для использования в указанных Соглашением и/или иных документах пределах предоставляется «как есть» (если прямо не предусмотрено иное), включая без ограничений любую документацию, улучшения и обновления, и Компания не предоставляет никаких гарантий или условий (прямых или подразумеваемых законодательством и/или обычаями делового оборота) относительно чего бы то ни было, в том числе, интегрируемости, удовлетворительного качества и годности к использованию для выполнения конкретных задач. Компания также не гарантирует, что Сайт не содержат ошибок, будет удовлетворять требованиям Пользователя, или что Сайт будет функционировать должным образом при использовании совместно с любым другим программным или аппаратным обеспечением. Компания не гарантирует и не может гарантировать результаты, которые Пользователь может получить путем использования Сайта. Все риски, связанные с качеством работы и производительностью Сайта, возлагаются на Пользователя.
                </li>
                <li>
                  <span className="font-semibold">2.3. </span>
                  Пользователь, полностью либо частично не согласный с условиями Соглашения и/или приложений к нему, не вправе использовать Сайт, и обязан немедленно прекратить такое использование.
                </li>
              </ul>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">3.</span> Порядок акцепта соглашения
              </li>
              <ul className="gap-2 ml-3.5 flex flex-col">
                <li>
                  <span className="font-semibold">3.1.</span>
                  Акцепт настоящего Соглашения считается совершенным Пользователем в момент использования любых функций Сайта, включая ознакомление с Контентом Сайта.                </li>
              </ul>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">4.</span> Предмет соглашения
              </li>
              <ul className="gap-2 ml-3.5 flex flex-col">
                <li>
                  <span className="font-semibold">4.1.</span>
                  Компания предоставляет Пользователю право использовать Сайт через воспроизведенную графическую часть интерфейса Сайта, Контента Сайта на экране Устройства, для взаимодействия с интерфейсом Сайта для совершения следующих действий: (1) Ознакомление с содержимым Сайта; (2) Заказ обратного звонка; (3) Переход в мессенджер для отправления сообщения Компании; (4) Иной функционал (при наличии).
                </li>
                <li>
                  <span className="font-semibold">4.2.</span>
                  Использование Сайта допускается при условии предоставления Пользователем согласия на обработку своих персональных данных, как это указано в
                  &#8197;<a target='_blank' href={pageLinks[pageLinkKeys.PRIVACY_POLICY].href} className={aCN}>Политике конфиденциальности</a>.
                </li>
                <li>
                  <span className="font-semibold">4.3.</span>
                  Компания вправе в одностороннем порядке вносить изменения в Соглашение, путем публикации Соглашения в новой редакции на Сайте.
                </li>
              </ul>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">5.</span> Ограничение на использование сайта
              </li>

              <ul className="gap-2 ml-3.5 flex flex-col">
                <li>
                  <span className="font-semibold">5.1. </span>
                  При использовании Сайта, Пользователь не вправе совершать действия, направленные на распространение, продажу, перевод, модификацию, обратный инжиниринг, создание производных работ от Сайта, либо совершать иные действия, нарушающие законодательство.
                </li>
              </ul>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">6.</span> Интеллектуальная собственность
              </li>

              <ul className="gap-2 ml-3.5 flex flex-col">
                <li>
                  <span className="font-semibold">6.1. </span>
                  Исключительные права на Сайт, Контент Сайта, любое прочее его содержимое, принадлежат Компании, все права на эти объекты защищены.
                </li>
              </ul>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">7.</span> Заключительные положения
              </li>

              <ul className="gap-2 ml-3.5 flex flex-col">
                <li>
                  <span className="font-semibold">7.1. </span>
                  В том случае, если отдельные положения Соглашения не могут быть применены в указанном объеме ввиду законодательных ограничений, они подлежат замене положениями, максимально приближенными по своему смыслу к первоначальным, и подлежат применению в измененном виде (в том числе, к уже сложившимся правоотношениям).
                </li>
                <li>
                  <span className="font-semibold">7.2. </span>
                  Признание недействительным полностью либо частично одного или нескольких положений Соглашения не влечет недействительность других положений Соглашения, либо Соглашения в целом.
                </li>
              </ul>
            </ul>
          </section>

          <section
            className='flex flex-col gap-0.5'
          >
            <p className='font-medium'>
              Общество с ограниченной ответственностью <span className='whitespace-nowrap'>«{company}»</span>
            </p>
            <p>
              ИНН: {inn}, ОГРН: {ogrn}
            </p>
          </section>
        </section>
      </article>

      <Footer />
    </section>

  )
}
