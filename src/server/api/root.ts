import { createTRPCRouter } from "~/server/api/trpc";
import { carRouter } from "~/server/api/routers/car";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  car: carRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
