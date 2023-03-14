import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { createCarInput } from "~/types";

export const carRouter = createTRPCRouter({
  getAllCars: protectedProcedure.query(async ({ ctx }) => {
    const cars = await ctx.prisma.car.findMany({});
    console.log(cars);

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

  addCar: protectedProcedure
    .input(createCarInput)
    .mutation(
      async ({
        ctx,
        input: {
          bodyType,
          engine,
          engineCapacity,
          make,
          model,
          numberOfDoors,
          year,
        },
      }) => {
        return ctx.prisma.car.create({
          data: {
            bodyType,
            engine,
            engineCapacity,
            make,
            model,
            numberOfDoors,
            year,
          },
        });
      }
    ),

  deleteCar: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.car.delete({
        where: {
          id: input,
        },
      });
    }),

  leaseCar: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.car.update({
        where: {
          id: input,
        },
        data: {
          isLeased: true,
          leasedBy: ctx.session.user.id,
        },
      });
    }),
});
