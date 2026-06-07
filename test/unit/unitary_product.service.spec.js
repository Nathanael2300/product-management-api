import * as chai from "chai";
import { expect } from "chai";
import { faker } from "@faker-js/faker";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
chai.use(chaiAsPromised);

import productFactory from "../factory/product.factory.js";
import productRepository from "../../src/repositories/product.repositories.js";
import productService from "../../src/services/product.service.js";
import db from "../../src/database/database.js";

describe("Product Service", () => {
  beforeEach(async () => {
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM products", (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("/GET/PRODUCTS", () => {
    describe("Positive scenarios", () => {
      it("Should return all products", async () => {
        const productData1 = productFactory();
        const productData2 = productFactory();
        sinon
          .stub(productRepository, "getAll")
          .resolves([productData1, productData2]);

        const products = await productService.getAllProducts();

        expect(products).to.be.an("array").with.lengthOf(2);
        const fields = ["name", "price", "category", "stock"];
        for (const field of fields) {
          for (const product of products) {
            expect(product).to.have.property(field);
          }
        }
      });
    });
    describe("Negative scenarios", () => {
      it("Should return an empty array when there are no products", async () => {
        sinon.stub(productRepository, "getAll").resolves([]);
        const products = await productService.getAllProducts();
        expect(products).to.be.an("array").that.is.empty;
      });
    });
  });

  describe("/GET/PRODUCTS/:id", () => {
    describe("Positive scenarios", () => {
      it("Should return a product by id", async () => {
        const fakeProduct = {
          id: 1,
          name: "Mouse",
          price: 50,
          category: "Tech",
          stock: 10,
        };

        sinon.stub(productRepository, "GetById").resolves(fakeProduct);

        const productById = await productService.getProductsById(1);

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
        sinon.stub(productRepository, "GetById").resolves(undefined);
        await expect(
          productService.getProductsById(invalidId),
        ).to.be.rejectedWith("Product not found");
      });
    });
  });

  describe("/POST/PRODUCTS", () => {
    describe("Positive scenarios", () => {
      it("Should create product data successfully", async () => {
        const productData = productFactory();

        const fakeCreatedProduct = {
          id: 1,
          ...productData,
        };

        sinon.stub(productRepository, "create").resolves(fakeCreatedProduct);

        const product = await productService.createProduct(productData);

        const fields = ["id", "name", "price", "category", "stock"];

        for (const field of fields) {
          expect(product).to.have.property(field);
        }
      });
    });

    describe("Negative scenarios", () => {
      it("Should not create product with empty or missing fields", async () => {
        const fields = [
          { key: "name", value: "", error: "Name is required" },
          { key: "price", value: undefined, error: "Price is required" },
          { key: "category", value: "", error: "Category is required" },
          { key: "stock", value: undefined, error: "Stock is required" },
        ];

        for (const field of fields) {
          const productData = productFactory();
          if (field.value === undefined) delete productData[field.key];
          else productData[field.key] = field.value;

          try {
            await productService.createProduct(productData);
            throw new Error("Test failed: validation did not throw");
          } catch (error) {
            expect(error.issues[0].message).to.equal(field.error);
          }
        }
      });

      it("Should return an error when price is negative", async () => {
        const productData = productFactory({ price: -10 });

        try {
          await productService.createProduct(productData);
          throw new Error("Test failed: validation did not throw");
        } catch (error) {
          expect(error.message).to.equal("Price cannot be negative");
        }
      });

      it("Should return an error when stock is negative", async () => {
        const productData = productFactory({ stock: -10 });

        try {
          await productService.createProduct(productData);
          throw new Error("Test failed: validation did not throw");
        } catch (error) {
          expect(error.message).to.equal("Stock cannot be negative");
        }
      });
    });
  });

  describe("/PUT/PRODUCTS/:id", () => {
    describe("Positive scenarios", () => {
      it("Should update product data successfully", async () => {
        const updatedData = productFactory();

        const fakeUpdatedProduct = {
          id: 1,
          ...updatedData,
        };

        sinon.stub(productRepository, "GetById").resolves({
          ...fakeUpdatedProduct,
        });

        sinon.stub(productRepository, "update").resolves({ updated: 1 });

        const result = await productService.updateProduct(
          fakeUpdatedProduct.id,
          updatedData,
        );

        expect(result).to.include({
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
          productService.getProductsById(invalidId),
        ).to.be.rejectedWith("Product not found");
      });
    });
  });

  describe("/DELETE/PRODUCTS/:id", () => {
    describe("Positive scenarios", () => {
      let productId;
      beforeEach(async () => {
        const productData = productFactory();
        const product = await productRepository.create(productData);

        productId = product.id;
      });
      it("Should delete an product off list", async () => {
        const fakeDeletedProduct = {
          deleted: 1,
        };

        sinon.stub(productRepository, "delete").resolves(fakeDeletedProduct);

        const productDeleted = await productService.deleteProduct(productId);

        expect(productDeleted).to.be.an("object");

        expect(productDeleted.deleted).to.eql(1);
      });
    });

    describe("Negative scenarios", () => {
      it("Should not delete when id is invalid", async () => {
        sinon.stub(productRepository, "delete").resolves({ deleted: 0 });

        await expect(productService.deleteProduct(999)).to.be.rejectedWith(
          "Product not found",
        );
      });
    });
  });
});
