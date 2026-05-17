import { expect } from "chai";
import { productFactory } from "../factory/productFactory.js";
import productModel from "../../src/models/productModel.js";

describe("GET ALL PRODUCTS ", () => {
  describe("Positive scenarios", () => {
    it("Should return product list", async () => {
      const productData = productFactory();

      const products = await productModel.getAllProducts(productData);

      expect(products).to.be.an("array");
      products.forEach((product) => {
        expect(product).to.be.an("object");
        expect(product).to.have.property("id");
        expect(product).to.have.property("name");
        expect(product).to.have.property("price");
        expect(product).to.have.property("category");
        expect(product).to.have.property("stock");
      });
    });
  });
  describe("Negative scenarios", () => {});
});
