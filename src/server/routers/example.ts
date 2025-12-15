import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

const inputSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  agreeMarketing: z.boolean(),
  agreePolitics: z.boolean(),
  contactType: z.object({
    call: z.boolean(),
    telegram: z.boolean(),
    whatsapp: z.boolean(),
  }),
});

export const sendContactsRouter = router({
  sendContactForm: publicProcedure.input(inputSchema).mutation(async ({ input }) => {
    return { message: `Hello, ${input.name ?? 'World'}!` };
  }),
});
