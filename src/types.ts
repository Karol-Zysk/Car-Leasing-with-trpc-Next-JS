import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allCarsOutput = RouterOutput["car"]["getAllCars"];

export type Car = allCarsOutput[number];

export const createCarInput = z.object({
  make: z.string().max(24, "Max make length is 24"),
  model: z.string().max(24, "Max model length is 24"),
  engine: z.string().max(24, "Max model length is 24"),
  year: z
    .number()
    .min(1900, "Year should be greater than or equal to 1900")
    .max(
      new Date().getFullYear(),
      "Year should be less than or equal to current year"
    ),
  numberOfDoors: z
    .number()
    .min(2, "Minimum number of doors is 2")
    .max(6, "Maximum number of doors is 6"),
  engineCapacity: z
    .number()
    .min(0, "Engine capacity should be greater than or equal to 0"),
  bodyType: z.string().max(24, "Max model length is 24"),
});
