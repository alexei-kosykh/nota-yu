import { router } from './trpc';
import { adminRouter } from './routers/admin';

export const appRouter = router({
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
