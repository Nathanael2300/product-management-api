class ProductApi {
  create(productData) {
    return cy.api({
      method: "POST",
      url: "/products",
      body: productData,
    });
  }

  getAll() {
    return cy.api({
      method: "GET",
      url: "/products",
    });
  }

  getById(id) {
    return cy.api({
      method: "GET",
      url: `/products/${id}`,
    });
  }

  update(id, productData) {
    return cy.api({
      method: "PUT",
      url: `/products/${id}`,
      body: productData,
    });
  }

  delete(id) {
    return cy.api({
      method: "DELETE",
      url: `/products/${id}`,
    });
  }
}

export default new ProductApi();
