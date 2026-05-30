import productService from "../services/productService";

class ProductController {
  async getAllProducts(req, res) {
    const products = await productService.getAllProducts();

    return res.status(200).json({
      product_total: products.length,
      products: products,
    });
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const productById = await productService.getProductsById(id);

    return res.status(200).json({
      product: productById,
    });
  }

  async createProduct(req, res) {
    const productCreated = await productService.createProduct(req.body);

    return res.status(201).json({
      message: "Product created successfully",
      productCreated: productCreated,
    });
  }

  async uptateProduct(req, res) {
    const { id } = req.params;
    const productUpdated = await productService.updateProduct(id);

    return res.status(200).json({
      message: "Product updated succssefully ",
      productUpdated: productUpdated,
    });
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    const productDeleted = await productService.deleteProduct(id);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  }
}

export default new ProductController();
