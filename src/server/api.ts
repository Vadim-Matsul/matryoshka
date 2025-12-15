import { router } from './trpc';
import { amoRouter } from './routers/amo';

export const appRouter = router({
  amoRouter,
});

export type AppRouter = typeof appRouter;
