import z, { object } from "zod";

export const getProductById = z.object({
  id: z.coerce
    .number({
      invalid_type_error: "Id invalid",
    })
    .int()
    .positive({ invalid_type_error: "Invalid value" }),
});

export const createProductSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .trim(),

  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive({ invalid_type_error: "Invalid value" }),

  category: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .trim(),

  stock: z
    .number({
      invalid_type_error: "Name must be a string",
    })
    .positive({ invalid_type_error: "Invalid value" }),
});

export const updateProductSchema = createProductSchema.partial();

export const deleteProductSchema = z.object({
  id: z.coerce
    .number({
      invalid_type_error: "Id invalid",
    })
    .int()
    .positive({ invalid_type_error: "Invalid value" }),
});
