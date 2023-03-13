import z from "zod";

export const createPostSchema = z.object({
  title: z.string().max(256, "Max title length is 356"),
  body: z.string().min(10),
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;

export const getSinglePostSchema = z.object({
  postId: z.string().uuid(),
});

export const createCarSchema = z.object({
  make: z.string().max(24, "Max make length is 24"),
  model: z.string().max(24, "Max model length is 24"),
  engine: z.enum(["Diesel", "Petrol", "Electric", "Hybrid"]),
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
  bodyType: z.enum(["Sedan", "Hatchback", "SUV", "Coupe"]),
});

export type CreateCarInput = z.TypeOf<typeof createCarSchema>;
