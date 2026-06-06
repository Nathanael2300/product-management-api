import ProductRepository from "../repositories/product.repositories.js";
import product from "../models/product.model.js";
import AppError from "../utils/AppError.js";
import {
  getProductById,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "../schema/product.schema.js";
import productRepositories from "../repositories/product.repositories.js";

class ProductService {
  async getAllProducts() {
    const products = await ProductRepository.getAll();

    return products;
  }

  async getProductsById(rawId) {
    const { id } = getProductById.parse({ id: rawId });

    const product = await ProductRepository.GetById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }

  async createProduct(productData) {
    createProductSchema.parse(productData);

    const productModel = new product(productData);

    try {
      productModel.validate();
    } catch (error) {
      throw new AppError(error.message, 400);
    }

    const createdProduct = await ProductRepository.create(productModel);

    return createdProduct;
  }

  async updateProduct(rawId, productData) {
    const { id } = getProductById.parse({ id: rawId });

    updateProductSchema.parse(productData);

    const currentProduct = await productRepositories.GetById(id);

    if (!currentProduct) {
      throw new AppError("Product not found", 404);
    }

    const dataUpdated = {
      ...currentProduct,
      ...productData,
    };

    const productModel = new product(dataUpdated);

    try {
      productModel.validate();
    } catch (error) {
      throw new AppError(error.message, 400);
    }

    const updatedProduct = await ProductRepository.update(id, dataUpdated);
    if (updatedProduct.updated === 0) {
      throw new AppError("Product not found", 404);
    }

    const productById = await ProductRepository.GetById(id);

    return productById;
  }

  async deleteProduct(rawId) {
    const { id } = deleteProductSchema.parse({ id: rawId });

    const deletedProduct = await ProductRepository.delete(id);

    if (deletedProduct.deleted === 0) {
      throw new AppError("Product not found", 404);
    }

    return deletedProduct;
  }
}

export default new ProductService();
