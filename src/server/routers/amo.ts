import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { amoRequest } from '@/lib/amoreal';

export const amoRouter = router({
  //
  addContact: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        phone: z.string().min(1),
        agreeMarketing: z.boolean(),
        agreePolitics: z.boolean(),
        contactType: z.object({
          call: z.boolean(),
          telegram: z.boolean(),
          whatsapp: z.boolean(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const createResponse = await amoRequest('/contacts', 'POST', [
          {
            name: input.name,
            custom_fields_values: [
              {
                field_id: 204027, // phone
                values: [{ value: input.phone, enum_id: 119089 }],
              },
              {
                field_id: 259595,
                values: [{ value: input.agreePolitics }], // agreePolitics
              },
            ],
          },
        ]);

        console.log({ createResponse });
        const contactId = createResponse?._embedded?.contacts?.[0]?.id;
        console.log('contactId ', contactId);

        if (!contactId) throw new Error('Не удалось получить id контакта');

        // Создание заметки к контакту
        const noteResponse = await amoRequest(`/contacts/${contactId}/notes`, 'POST', [
          {
            note_type: 'common',
            params: {
              text:
                `Согласие на маркетинг: ${input.agreeMarketing ? 'ДА' : 'НЕТ'}; ` +
                `Способ связи: Звонок-${input.contactType.call ? 'ДА' : 'НЕТ'}, ` +
                `Telegram-${input.contactType.telegram ? 'ДА' : 'НЕТ'}, ` +
                `WhatsApp-${input.contactType.whatsapp ? 'ДА' : 'НЕТ'};`,
            },
          },
        ]);
        console.log({ noteResponse });

        return noteResponse;
      } catch (err) {
        console.error(`Ошибка addContact`, err);
        throw new Error('unknown error');
      }
    }),
});
