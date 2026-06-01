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
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(1, { message: "Name is required" }),

  price: z
    .number({
      message: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive({ message: "Price must be positive" }),

  category: z
    .string({
      required_error: "Category is required",
      invalid_type_error: "Category must be a string",
    })
    .trim()
    .min(1, { message: "Category is required" }),

  stock: z
    .number({
      message: "Stock is required",
      invalid_type_error: "Stock must be a number",
    })
    .positive({ message: "Stock must be positive" }),
});

export const updateProductSchema = createProductSchema.partial();

export const deleteProductSchema = z.object({
  id: idSchema,
});
