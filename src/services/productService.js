import productModel from "../models/productModel.js";
import AppError from "../utils/AppError.js";
import {
  getProductById,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "../schema/productSchema.js";

class ProductService {
  async getAllProducts() {
    const products = await productModel.getAllProducts();

    if (products.length === 0) {
      return [];
    }

    return products;
  }

  async getPruductsById(rawId) {
    const { id } = getProductById.parse({ id: rawId });

    if (!id) {
      throw new AppError("Id is required", 400);
    }

    const product = await productModel.getProductById(id);

    if (!product) {
      throw new AppError("Product not found", 400);
    }

    return product;
  }

  async createProduct(productData) {
    createProductSchema.parse(productData);

    const { price, stock } = productData;

    if (price < 0) {
      throw new AppError("Price cannot be negative");
    }

    if (stock < 0) {
      throw new AppError("stock cannot be negative");
    }

    const product = await productModel.createProduct(productData);
    return product;
  }

  async updataProduct(rawId, productData) {
    const { id } = getProductById.parse({ id: rawId });
    updateProductSchema.parse(productData);

    if (!id) {
      throw new AppError("Id is required", 400);
    }

    const product = await productModel.updateProduct(id, productData);
    if (!product) {
      throw new AppError("Product not found");
    }
    return product;
  }

  async deleteProduct(rawId) {
    const { id } = deleteProductSchema.parse({ id: rawId });

    if (!id) {
      throw new AppError("Id is required", 400);
    }

    const product = await productModel.deleteProduct(id);
    if (!product) {
      throw new AppError("Product not found", 400);
    }

    return product;
  }
}

export default new ProductService();
