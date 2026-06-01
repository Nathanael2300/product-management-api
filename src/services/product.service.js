import ProductRepository from "../repositories/product.repositories.js";
import AppError from "../utils/AppError.js";
import {
  getProductById,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "../schema/product.schema.js";

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

    const { price, stock } = productData;

    if (price < 0) {
      throw new AppError("Price cannot be negative", 400);
    }

    if (stock < 0) {
      throw new AppError("Stock cannot be negative", 400);
    }

    const createdProduct = await ProductRepository.create(productData);

    return {
      createdProduct,
      message: "Product created successfully",
    };
  }

  async updateProduct(rawId, productData) {
    const { id } = getProductById.parse({ id: rawId });

    updateProductSchema.parse(productData);

    const updatedProduct = await ProductRepository.update(id, productData);

    if (!updatedProduct) {
      throw new AppError("Product not found", 404);
    }

    return {
      updatedProduct,
      message: "Product updated successfully",
    };
  }

  async deleteProduct(rawId) {
    const { id } = deleteProductSchema.parse({ id: rawId });

    const deletedProduct = await ProductRepository.delete(id);

    if (deletedProduct.deleted === 0) {
      throw new AppError("Product not found", 404);
    }

    return {
      deletedProduct,
      message: "Deleted successfully",
    };
  }
}

export default new ProductService();
