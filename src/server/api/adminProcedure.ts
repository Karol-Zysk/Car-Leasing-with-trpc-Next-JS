import type { Prisma, PrismaClient, User } from "@prisma/client";
import { TRPCError, initTRPC } from "@trpc/server";

interface Context {
  session: {
    user?: {
      id: string;
      isAdmin: boolean;
    };
  };
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

const t = initTRPC.context<Context>().create();
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const router = t.router;

const isAdmin = middleware(async ({ ctx, next }) => {
  const id = ctx.session.user?.id;
  const user = await ctx.prisma.user.findUnique({ where: { id } });
  const { isAdmin } = user as User;

  if (!isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.session.user,
      prisma: ctx.prisma,
    },
  });
});

export const adminProcedure = publicProcedure.use(isAdmin);
