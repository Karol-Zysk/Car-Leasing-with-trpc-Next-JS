import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createCarInput } from "~/types";
import { adminProcedure, publicProcedure } from "../adminProcedure";

export const carRouter = createTRPCRouter({
  getAllCars: publicProcedure.query(async ({ ctx }) => {
    const cars = await ctx.prisma.car.findMany({});

    return cars;
  }),

  addCar: adminProcedure
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
          photos,
        },
      }) => {
        return ctx.prisma.car.create({
          data: {
            bodyType,
            engine,
            engineCapacity,
            make: make.toUpperCase(),
            model: model.charAt(0).toUpperCase() + model.slice(1),
            numberOfDoors,
            year,
            photos,
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
