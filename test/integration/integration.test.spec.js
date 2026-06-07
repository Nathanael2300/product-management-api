import { expect } from "chai";
import productApi from "../helpers/product.api.js";
import productFactory from "../factory/product.factory.js";
import { faker } from "@faker-js/faker";
import db from "../../src/database/database.js";

describe("Integrations Test", () => {
  beforeEach(async () => {
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM products", (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  let productId;
  beforeEach(async () => {
    const productData = productFactory();
    const product = await productApi.create(productData);

    productId = product.body.productCreated.id;
  });

  const fieldsAndTyps = {
    id: "number",
    name: "string",
    price: "number",
    category: "string",
    stock: "number",
  };

  describe("/GET", () => {
    describe("Scenarios positive", () => {
      it("Should return product list", async () => {
        const productAll = await productApi.getAll();

        expect(productAll.status).to.eql(200);
        expect(productAll.body.productsList).to.be.an("array");

        for (const product of productAll.body.productsList) {
          for (const [key, type] of Object.entries(fieldsAndTyps)) {
            expect(product).to.have.property(key);
            expect(product[key]).to.be.an(type);
          }
        }
      });
    });
    describe("Scenarios negative", () => {});
  });

  describe("/GET/:id", () => {
    describe("Scenarios positive", () => {
      it("Should return 1 product from product list", async () => {
        const productById = await productApi.getById(productId);

        expect(productById.status).to.eql(200);
        expect(productById.body).to.have.an("object");
        const product = productById.body.product;
        for (const [key, type] of Object.entries(fieldsAndTyps)) {
          expect(product).to.have.property(key);
          expect(product[key]).to.be.an(type);
        }
      });
    });
    describe("Scenarios negative", () => {
      it("Should not return product when product does not exist", async () => {
        const invalidId = faker.number.int({ min: 50000 });

        const productById = await productApi.getById(invalidId);

        expect(productById.body).to.have.property("message");
        expect(productById.body.message).to.eql("Product not found");
      });

      it("Should not return product when the id is a invalid type", async () => {
        const productById = await productApi.getById("abc");

        expect(productById.status).to.eql(400);
        expect(productById.body).to.have.an("object");
        expect(productById.body).to.have.property("message");
        expect(productById.body.message).to.eql("Id invalid");
      });
    });
  });

  describe("/POST", () => {
    describe("Scenarios positive", () => {
      it("Should create a product successfully", async () => {
        const productData = productFactory();
        const productCreated = await productApi.create(productData);

        expect(productCreated.status).to.eql(201);
        expect(productCreated.body).to.be.an("object");
        expect(productCreated.body).to.have.property("message");
        expect(productCreated.body.message).to.eql(
          "Product created successfully",
        );

        const product = productCreated.body.productCreated;
        for (const [key, type] of Object.entries(fieldsAndTyps)) {
          console.log("helper:", product);
          expect(product).to.have.property(key);
          expect(product[key]).to.be.an(type);
        }
      });
    });
    describe("Scenarios negative", () => {
      it("Should not create a product when the data is invalid", async () => {
        const fields = [
          { key: "name", value: 123, error: "Name must be a string" },
          { key: "price", value: "abc", error: "Price must be a number" },
          { key: "category", value: 123, error: "Category must be a string" },
          { key: "stock", value: "abc", error: "Stock must be a number" },
        ];

        for (const field of fields) {
          const productData = productFactory();
          productData[field.key] = field.value;
          const product = await productApi.create(productData);

          expect(product.body).to.have.property("message");
          expect(product.body.message).to.eql(field.error);
        }
      });

      it("Should not create product with empty or missing fields", async () => {
        const fields = [
          { key: "name", value: "", error: "Name is required" },
          { key: "price", value: undefined, error: "Price is required" },
          { key: "category", value: "", error: "Category is required" },
          { key: "stock", value: undefined, error: "Stock is required" },
        ];

        for (const field of fields) {
          const productData = productFactory();
          productData[field.key] = field.value;
          const product = await productApi.create(productData);
          expect(product.status).to.eql(400);
          expect(product.body).to.be.an("object");
          expect(product.body).to.have.property("message");
          expect(product.body.message).to.eql(field.error);
        }
      });

      it("Should not create a product when price is negative", async () => {
        const productData = productFactory({ price: -10 });
        const productCreated = await productApi.create(productData);
        expect(productCreated.status).to.eql(400);
        expect(productCreated.body).to.have.property("message");
        expect(productCreated.body.message).to.eql("Price cannot be negative");
      });

      it("Should not create a product when stock is negative", async () => {
        const productData = productFactory({ stock: -10 });
        const productCreated = await productApi.create(productData);
        expect(productCreated.status).to.eql(400);
        expect(productCreated.body).to.have.property("message");
        expect(productCreated.body.message).to.eql("Stock cannot be negative");
      });
    });
  });

  describe("/PUT/:id", () => {
    describe("Scenarios positive", () => {
      it("should update product successfully", async () => {
        const productBeforeUpdate = await productApi.getById(productId);

        expect(productBeforeUpdate.status).to.eql(200);
        expect(productBeforeUpdate.body).to.be.an("object");
        for (const [key, value] of Object.entries(fieldsAndTyps)) {
          expect(productBeforeUpdate.body.product).to.be.an("object");
          expect(productBeforeUpdate.body.product[key]).to.be.an(value);
        }

        const productIdBeforeUpdate = productBeforeUpdate.body.product.id;
        const productDataUpdated = productFactory();
        const productUpdate = await productApi.update(
          productIdBeforeUpdate,
          productDataUpdated,
        );

        expect(productUpdate.status).to.eql(200);
        for (const [key, value] of Object.entries(fieldsAndTyps)) {
          expect(productUpdate.body.productUpdated).to.have.property(key);
          expect(productUpdate.body.productUpdated[key]).to.be.an(value);
          expect(productUpdate.body.productUpdated[value]).to.eql(
            productDataUpdated[value],
          );
        }
      });
    });
    describe("Scenarios negative", () => {
      it("Should not update product when product does not exist", async () => {
        const invalidId = faker.number.int({ min: 500000 });
        const productUpdate = productFactory();

        const getById = await productApi.update(invalidId, productUpdate);
        expect(getById.status).to.eql(404);
        expect(getById.body).to.have.property("message");
        expect(getById.body.message).to.eql("Product not found");
      });

      it("Should not update product when the data is invalid", async () => {
        const fields = [
          { key: "name", value: 123, error: "Name must be a string" },
          { key: "price", value: "abc", error: "Price must be a number" },
          { key: "category", value: 123, error: "Category must be a string" },
          { key: "stock", value: "abc", error: "Stock must be a number" },
        ];

        for (const field of fields) {
          const productData = productFactory();
          productData[field.key] = field.value;
          const productUpdated = await productApi.update(
            productId,
            productData,
          );
          expect(productUpdated.status).to.eql(400);

          expect(productUpdated.body).to.be.an("object");
          expect(productUpdated.body).to.have.property("message");
          expect(productUpdated.body.message).to.eql(field.error);
        }
      });

      it("Should not update a product when price is negative", async () => {
        const productData = productFactory({ price: -10 });
        const productUpdated = await productApi.update(productId, productData);
        expect(productUpdated.status).to.eql(400);
        expect(productUpdated.body).to.have.property("message");
        expect(productUpdated.body.message).to.eql("Price cannot be negative");
      });

      it("Should not update a product when stock is negative", async () => {
        const productData = productFactory({ stock: -10 });
        const productUpdated = await productApi.update(productId, productData);
        expect(productUpdated.status).to.eql(400);
        expect(productUpdated.body).to.have.property("message");
        expect(productUpdated.body.message).to.eql("Stock cannot be negative");
      });
    });
  });

  describe("/DELETE/:id", () => {
    describe("Scenarios positive", () => {
      it("Should delete product successfully", async () => {
        const productDeleted = await productApi.delete(productId);

        expect(productDeleted.status).to.eql(200);
        expect(productDeleted.body).to.be.an("object");

        expect(productDeleted.body).to.have.property("message");
        expect(productDeleted.body.message).to.eql(
          "Product deleted successfully",
        );
      });
    });
    describe("Scenarios negative", () => {
      it("Should not delete product when product does not exist", async () => {
        const invalidId = faker.number.int({ min: 50000 });

        const productDeleted = await productApi.getById(invalidId);

        expect(productDeleted.body).to.have.property("message");
        expect(productDeleted.body.message).to.eql("Product not found");
      });

      it("Should not delete product when the id is a invalid type", async () => {
        const productDeleted = await productApi.getById("abc");

        expect(productDeleted.status).to.eql(400);
        expect(productDeleted.body).to.have.an("object");
        expect(productDeleted.body).to.have.property("message");
        expect(productDeleted.body.message).to.eql("Id invalid");
      });
    });
  });
});
