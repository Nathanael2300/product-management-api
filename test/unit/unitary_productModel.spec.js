import { expect } from "chai";
import { productFactory } from "../factory/productFactory.js";
import productModel from "../../src/models/productModel.js";
import db from "../../src/database/database.js";
import { faker } from "@faker-js/faker";

describe("Product Model", () => {
  let productId;
  beforeEach(async () => {
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM products", (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const product = await productModel.createProduct(productFactory());
    productId = product.id;
  });

  describe("/GET/PRODUCTS ", () => {
    describe("Positive scenarios", () => {
      it("Should return product list", async () => {
        const products = await productModel.getAllProducts();

        const fields = ["id", "name", "price", "category", "stock"];
        expect(products).to.be.an("array");
        for (const key of fields) {
          for (const product of products) {
            expect(product).to.have.property(key);
          }
        }
      });
    });
    describe("Negative scenarios", () => {});
  });

  describe("/GET/PRODUCTS/:id", () => {
    describe("Positive scenarios", () => {
      it("Should return 1 product off product list", async () => {
        const product = await productModel.getProductById(productId);

        const fields = ["id", "name", "price", "category", "stock"];

        for (const key of fields) {
          expect(product).to.have.property(key);
        }
      });
    });
    describe("Negative scenarios", () => {
      it("should return undefined when product does not exist", async () => {
        const idInvalid = faker.number.int({ min: 50000 });
        const product = await productModel.getProductById(idInvalid);

        expect(product).to.eql(undefined);
      });
    });
  });

  describe("/POST/PRODUCTS", () => {
    describe("Senarios positive", () => {
      it("Should create a product successfully", async () => {
        const productData = productFactory();

        const product = await productModel.createProduct(productData);
        const fields = ["id", "name", "price", "category", "stock"];
        expect(product).to.be.an("object");
        for (const key of fields) {
          expect(product).to.have.property(key);
        }
      });
    });
    describe("Scenarios negative", () => {
      it("Should not create product when payload is undefined", async () => {
        try {
          await productModel.createProduct(undefined);
        } catch (err) {
          expect(err.message).to.equal(
            "Cannot destructure property 'name' of 'productData' as it is undefined.",
          );
        }
      });
    });
  });

  describe("/UPDATE/PRODUCT/:id", () => {
    describe("Senarios positive", () => {
      it("Should update a product data sucessfully", async () => {
        const fields = ["id", "name", "price", "category", "stock"];
        const productById = await productModel.getProductById(productId);
        for (const key of fields) {
          expect(productById).to.have.property(key);
          expect(productById).to.exist;
        }

        for (const [key, value] of Object.entries(productById)) {
          expect(productById).to.have.property(key);

          expect(value).to.exist;
        }
        const productUpdatedData = productFactory();
        const product = await productModel.updateProduct(
          productById.id,
          productUpdatedData,
        );
        for (const [key, value] of Object.entries(product)) {
          expect(product).to.have.property(key);

          expect(value).to.exist;
        }

        const updatedProduct = await productModel.getProductById(
          productById.id,
        );
        for (const [key, value] of Object.entries(updatedProduct)) {
          expect(updatedProduct).to.have.property(key);
          expect(value).to.exist;
          expect(updatedProduct.name).to.equal(productUpdatedData.name);
          expect(updatedProduct.price).to.equal(productUpdatedData.price);
          expect(updatedProduct.category).to.equal(productUpdatedData.category);
          expect(updatedProduct.stock).to.equal(productUpdatedData.stock);
        }
      });
    });
    describe("Senarios negative", () => {
      it("Should not update product when payload is undefined", async () => {
        try {
          await productModel.updateProduct(productId, undefined);
        } catch (err) {
          expect(err.message).to.equal(
            "Cannot destructure property 'name' of 'productData' as it is undefined.",
          );
        }
      });
    });
  });

  describe.only("/DELETE/:id", () => {
    describe("Senarios positive", () => {
      it("Should delete user successfully", async () => {
        const product = await productModel.deleteProduct(productId);
        expect(product).to.have.property("deleted", 1);
      });
    });
    describe("Senarios negative", () => {
      it("Should not delete when user id is invalid", async () => {
        const idInvalid = faker.number.int({ min: 50000 });
        const product = await productModel.deleteProduct(idInvalid);
        console.log(product);

        expect(product).to.have.property("deleted", 0);
      });
    });
  });
});
