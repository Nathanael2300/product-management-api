import z from "zod";

const idSchema = z.coerce
  .number({
    invalid_type_error: "Id invalid",
  })
  .int()
  .positive("Invalid value");

export const getProductById = z.object({
  id: idSchema,
});

export const createProductSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .min(1, { invalid_type_error: "Name is required" })
    .trim(),

  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive({ invalid_type_error: "Price must be positive" }),

  category: z
    .string({
      invalid_type_error: "Category must be a string",
    })
    .min(1, { invalid_type_error: "Category is required" })
    .trim(),

  stock: z
    .number({
      invalid_type_error: "Stock must be a string",
    })
    .positive({ invalid_type_error: "Stock must be positive" }),
});

export const updateProductSchema = createProductSchema.partial();

export const deleteProductSchema = z.object({
  id: idSchema,
});
