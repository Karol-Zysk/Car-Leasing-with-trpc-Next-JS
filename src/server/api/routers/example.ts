import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { createCarSchema } from "~/server/schema/carSchema";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getAllCars: protectedProcedure.query(async ({ ctx }) => {
    
    const cars = await ctx.prisma.car.findMany({});
    

    return [
      {
        id: 1,
        make: "VolksWagen",
        model: "Golf",
        engine: "Diesel",
        year: 1999,
        numberOfDoors: 4,
        engineCapacity: 4.0,
        bodyType: "Coupe",
      },
      {
        id: 2,
        make: "VolksWagen",
        model: "Golf",
        engine: "Diesel",
        year: 1999,
        numberOfDoors: 4,
        engineCapacity: 4.0,
        bodyType: "Coupe",
      },
    ];
  }),
});
