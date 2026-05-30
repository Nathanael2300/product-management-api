import express from "express";
import productControllers from "../controllers/product.controllers.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { validate } from "../middlewares/validation.js";

import {
  getProductById,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "../schema/productSchema.js";

const router = express.Router();

router.get("/", asyncHandler(productControllers.getAllProducts));

router.get(
  "/:id",
  validate(getProductById, "params"),
  asyncHandler(productControllers.getProductById),
);

router.post(
  "/",
  validate(createProductSchema),
  asyncHandler(productControllers.createProduct),
);

router.put(
  "/:id",
  validate(updateProductSchema),
  asyncHandler(productControllers.uptateProduct),
);

router.delete(
  "/:id",
  validate(deleteProductSchema, "params"),
  asyncHandler(productControllers.deleteProduct),
);

export default router;
