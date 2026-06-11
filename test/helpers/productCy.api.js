class ProductApi {
  create(productData, override = {}) {
    return cy.api({
      method: "POST",
      url: "/products",
      body: productData,
      ...override,
    });
  }

  getAll() {
    return cy.api({
      method: "GET",
      url: "/products",
    });
  }

  getById(id, override = {}) {
    return cy.api({
      method: "GET",
      url: `/products/${id}`,
      ...override,
    });
  }

  update(id, productData, override = {}) {
    return cy.api({
      method: "PUT",
      url: `/products/${id}`,
      body: productData,
      ...override,
    });
  }

  delete(id, override = {}) {
    return cy.api({
      method: "DELETE",
      url: `/products/${id}`,
      ...override,
    });
  }
}

export default new ProductApi();
