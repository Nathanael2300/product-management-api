class ProductRepository {
  async getAll() {
    throw new Error("getAllProducts method: not implemented");
  }

  async getById(id) {
    throw new Error("getProductById method: not implemented");
  }

  async create(data) {
    throw new Error("createProduct method: not implemented");
  }

  async update(id, data) {
    throw new Error("updateProduct method: not implemented");
  }

  async delete(id) {
    throw new Error("deleteProduct method: not implemented");
  }
}

export default ProductRepository;
