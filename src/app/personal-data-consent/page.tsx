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
              Согласие на обработку персональных данных
            </p>
          </h1>
        </div>

        <section className='flex flex-col gap-10'>
          <div className='text-[16px] leading-[22px]'>
            <>
              В соответствии с настоящим Согласием на обработку персональных данных <span className='whitespace-nowrap'>(далее – <strong>Согласие</strong>)</span>,<br />
            </>
            <>
              оставляя свои данные на сайте
              &#8197;<a target='_blank' href={pageLinks[pageLinkKeys.HOME].href} className={aCN}>{site}</a>&#8197;
              (включая поддомены всех уровней) <span className='whitespace-nowrap'>(далее – <strong>Сайт</strong>)</span>,<br />
            </>
            <>
              а также  совершая иные действия по выражению Согласия с обработкой персональных данных,<br />
            </>
            <>
              как это указано в
              &#8197;<a target='_blank' href={pageLinks[pageLinkKeys.PRIVACY_POLICY].href} className={aCN}>Политике конфиденциальности</a>,
              в соответствии с требованиями <span className='whitespace-nowrap'>Федерального закона</span>
              <span className='whitespace-nowrap'> «О персональных данных» № 152-ФЗ </span>
              и
              &#8197;<a target='_blank' href={pageLinks[pageLinkKeys.PRIVACY_POLICY].href} className={aCN}>Политикой конфиденциальности</a>,
              размещенной Оператором на Сайте по ссылке:
              &#8197;<a target='_blank' href={pageLinks[pageLinkKeys.PRIVACY_POLICY].href} className={aCN}>{privacyPoliceText}</a>&#8197;
              <span className='whitespace-nowrap'>(далее – <strong>Политика</strong>),</span><br />
            </>
            <>
              Я <span className='whitespace-nowrap'>(далее – <strong>Субъект персональных данных</strong>)</span>,
              даю конкретное, предметное, информированное, сознательное и однозначное согласие на обработку моих персональных данных Обществу с ограниченной ответственностью <span className='whitespace-nowrap'>«{company}»</span>,
              <span className='whitespace-nowrap'> ИНН: {inn},</span>
              <span className='whitespace-nowrap'> ОГРН: {ogrn}, </span>
              адрес: {adress} <span className='whitespace-nowrap'>(далее – <strong>Оператор</strong>)</span>,
            </>
          </div>

          <section className="flex flex-col gap-8">
            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">1.</span> Для следующих целей:
              </li>

              <ul className="flex flex-col gap-2 ml-3.5">
                <li>
                  <span className="font-semibold">1.1.</span> Обеспечение соблюдения требований законодательства Российской Федерации;
                </li>
                <li>
                  <span className="font-semibold">1.2.</span> Связь с Субъектом персональных данных по оставленной им заявке на обратную связь на Сайте, либо предоставление ответа в мессенджер (What’s App, Telegram и(или) иной используемый Оператором персональных данных мессенджер) в ответ на направленное Субъектом персональных данных сообщение в такой мессенджер, с целью предоставления информации, интересующей Субъекта персональных данных, включая, но не ограничиваюсь, об услугах Оператора и условий их оказания;
                </li>
                <li>
                  <span className="font-semibold">1.3.</span> Направление маркетинговых материалов и информации, по email и(или) СМС (до отписки от рассылки);
                </li>
                <li>
                  <span className="font-semibold">1.4.</span> Оформление и регулирование договорных отношений между Субъектом персональных данных и Оператором;
                </li>
                <li>
                  <span className="font-semibold">1.5.</span> Осуществление действий, разрешенных законодательством Российской Федерации и необходимых для взаимодействия Оператора с Субъектом персональных данных в рамках реализации существующих между ними правоотношений;
                </li>
                <li>
                  <span className="font-semibold">1.6.</span> Отражение информации во внутренних базах данных Оператора;
                </li>
                <li>
                  <span className="font-semibold">1.7.</span> Передача персональных данных третьим лицам согласно договорам, заключенным с такими лицами Оператором, в порядке и на условиях, предусмотренных Политикой.
                </li>
              </ul>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">2.</span> Перечень персональных данных, на обработку которых дается согласие:
              </li>
              <ul className="gap-2 ml-3.5 flex flex-col">
                <li>
                  <span className="font-semibold">2.1.</span> Фамилия, имя, отчество;
                </li>
                <li>
                  <span className="font-semibold">2.2.</span> Абонентские номера телефона;
                </li>
                <li>
                  <span className="font-semibold">2.3.</span> Иные категории персональных данных в случае их обработки.
                </li>
              </ul>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">3.</span> Перечень действий с персональными данными, на совершение которых дается согласие:
              </li>
              <ul className="gap-2 ml-3.5 flex flex-col">
                <li>
                  <span className="font-semibold">3.1.</span> Обработка вышеуказанных персональных данных будет осуществляться путем смешанной (автоматизированной, неавтоматизированной) обработки персональных данных;
                </li>
                <li>
                  <span className="font-semibold">3.2.</span> Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача, обезличивание, блокирование, удаление, уничтожение персональных данных.
                </li>
              </ul>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">4.</span> Способ обработки вышеуказанных персональных данных
              </li>
              <ul className="gap-2 ml-3.5 flex flex-col">
                <li>
                  <span className="font-semibold">4.1.</span> Обработка вышеуказанных персональных данных будет осуществляться путем смешанной обработки персональных данных.
                </li>
                <li>
                  <span className="font-semibold">4.2.</span> Категории и перечень персональных данных, на обработку которых Субъект персональных данных устанавливает условия и запреты, а также перечень устанавливаемых условий и запретов не устанавливаю.
                </li>
                <li>
                  <span className="font-semibold">4.3.</span> Условия, при которых полученные персональные данные могут передаваться Оператором только по его внутренней сети, обеспечивающей доступ к информации лишь для строго определенных сотрудников, либо с использованием информационно - телекоммуникационных сетей, либо без передачи полученных персональных данных, не устанавливаю.
                </li>
              </ul>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-[18px]">
                <span className="font-semibold">5.</span> Срок действия согласия на обработку персональных данных
              </li>

              <ul className="gap-2 ml-3.5 flex flex-col">
                <li>
                  <span className="font-semibold">5.1.</span> Настоящее согласие на обработку персональных данных действует с момента его предоставления Оператору персональных данных и в течение срока, установленного Политикой, и может быть отозвано в любое время путем подачи Оператору заявления в простой письменной форме.
                </li>
                <li className="flex flex-col gap-1">
                  <span><span className="font-semibold">5.2.</span> Персональные данные уничтожаются при наступлении следующих событий:</span>
                  <ul className="gap-2 ml-[29px] flex flex-col">
                    <li>
                      <span className="font-semibold">5.2.1.</span> прекращение деятельности Оператора,
                    </li>
                    <li>
                      <span className="font-semibold">5.2.2.</span> ликвидация Оператора,
                    </li>
                    <li>
                      <span className="font-semibold">5.2.3.</span> реорганизация Оператора,
                    </li>
                    <li>
                      <span className="font-semibold">5.2.4.</span> истечение срока хранения, предусмотренного Политикой,
                    </li>
                    <li>
                      <span className="font-semibold">5.2.5.</span> отзыв Субъектом персональных данных (или его представителем) согласия на обработку его персональных данных, с учетом достижения условий, предусмотренных ст. 21 ФЗ «О персональных данных» по достижении целей обработки персональных данных (Оператор прекратит обработку таких персональных данных в течение 3 (трех) рабочих дней, о чем будет направлено уведомление Субъекту персональных в течение 10 (десяти) рабочих дней).
                    </li>
                  </ul>
                </li>
              </ul>
            </ul>
          </section>

          <section
            className='font-medium flex flex-col gap-3'
          >
            <p>
              Я проинформирован о праве на получение информации, касающейся обработки моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 г.№152-ФЗ «О персональных данных».
            </p>
            <p>
              Я внимательно изучил настоящее Согласие, все пункты мне ясны и понятны. Подтверждаю, что согласие является конкретным, информированным, предметным, сознательным и однозначным.
            </p>
            <p>
              Я ознакомлен с Политикой, принятой Оператором.
            </p>
            <p>
              Я подтверждаю, что полностью ознакомлен(а) с содержанием Согласия, не имею возражений и даю согласие на все действия с моими персональными данными, указанные в настоящем Согласии, действую осознанно, по собственной воле и в своих интересах.
            </p>
          </section>
        </section>
      </article>

      <Footer />
    </section>

  )
}
