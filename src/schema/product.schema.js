import { z } from "zod";

const idSchema = z.coerce
  .number({
    message: "Id invalid",
  })
  .int("Id must be an integer")
  .positive("Invalid value");

export const getProductById = z.object({
  id: idSchema,
});

export const createProductSchema = z.object({
  name: z
    .string({
      message: "Name must be a string",
    })
    .trim()
    .min(1, "Name is required"),

  price: z.number({
    error: (issue) => {
      if (issue.input === undefined) {
        return "Price is required";
      }

      return "Price must be a number";
    },
  }),

  category: z
    .string({
      message: "Category must be a string",
    })
    .trim()
    .min(1, "Category is required"),

  stock: z.number({
    error: (issue) => {
      if (issue.input === undefined) {
        return "Stock is required";
      }

      return "Stock must be a number";
    },
  }),
});

export const updateProductSchema = createProductSchema.partial();

export const deleteProductSchema = z.object({
  id: idSchema,
});
