import * as chai from "chai";
import { expect } from "chai";
import { faker } from "@faker-js/faker";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
chai.use(chaiAsPromised);

import { productFactory } from "../factory/productFactory.js";
import productModel from "../../src/models/productModel.js";
import productService from "../../src/services/productService.js";
import db from "../../src/database/database.js";

describe.only("Product Service", () => {
  afterEach(() => {
    sinon.restore();
  });

  beforeEach(async () => {
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM products", (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  describe("/GET/PRODUCTS", () => {
    beforeEach(async () => {
      const productData1 = productFactory();
      const productData2 = productFactory();

      await productService.createProduct(productData1);
      await productService.createProduct(productData2);
    });
    describe("Positive scenarios", () => {
      it("Should return an empty array when there are no products", async () => {
        const products = await productService.getAllProducts();

        expect(products).to.be.an("array");
        expect(products).to.have.lengthOf(2);
        const fields = ["id", "name", "price", "category", "stock"];
        for (const field of fields) {
          for (const product of products) {
            expect(product).to.have.property(field);
          }
        }
      });
    });
    describe("Negative scenarios", () => {
      it("Should return an empty array when there are no products", async () => {
        sinon.stub(productModel, "getAllProducts").resolves([]);
        const products = await productService.getAllProducts();
        expect(products).to.be.an("array").that.is.empty;
      });
    });
  });

  describe("/GET/PRODUCTS/:id", () => {
    let productId;
    beforeEach(async () => {
      const productData = productFactory();

      const product = await productService.createProduct(productData);
      productId = product.id;
    });
    describe("Positive scenarios", () => {
      it("Should return 1 user off the list", async () => {
        const productById = await productService.getPruductsById(productId);
        sinon.stub(productModel, "getProductById").resolves(productById);

        expect(productById).to.be.an("object");

        const fields = ["id", "name", "price", "category", "stock"];
        for (const field of fields) {
          expect(productById).to.have.property(field);
        }
      });
    });
    describe("Negative scenarios", () => {
      it("Should not return product and should return a error", async () => {
        const invalidId = faker.number.int({ min: 50000 });
        await expect(
          productService.getPruductsById(invalidId),
        ).to.be.rejectedWith("Product not found");
      });
    });
  });

  describe("/POST/PRODUCTS", () => {
    describe("Positive scenarios", () => {
      it("Should create product data successfully", async () => {});
    });
    describe("Negative scenarios", () => {});
  });

  describe("/PUT/PRODUCTS/:id", () => {
    let productId;
    beforeEach(async () => {
      const productData = productFactory();

      const product = await productService.createProduct(productData);
      productId = product.id;
    });
    describe("Positive scenarios", () => {
      it("Should update product data successfully", async () => {
        const updatedData = productFactory();

        await productService.updataProduct(productId, updatedData);

        const fetchedProduct = await productService.getPruductsById(productId);

        expect(fetchedProduct).to.include({
          name: updatedData.name,
          price: updatedData.price,
          category: updatedData.category,
          stock: updatedData.stock,
        });
      });
    });
    describe("Negative scenarios", () => {
      it("Should not return product and should return a error", async () => {
        const invalidId = faker.number.int({ min: 50000 });
        await expect(
          productService.getPruductsById(invalidId),
        ).to.be.rejectedWith("Product not found");
      });
    });
  });

  describe("/DELETE/PRODUCTS/:id", () => {
    describe("Positive scenarios", () => {});
    describe("Negative scenarios", () => {});
  });
});
