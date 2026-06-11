import productCyApi from "../helpers/productCy.api.js";
import productFactory from "../factory/product.factory";

describe("E2E test", () => {
  beforeEach(() => {
    cy.task("clearDatabase");
  });

  const fieldsAndTypes = {
    id: "number",
    name: "string",
    price: "number",
    category: "string",
    stock: "number",
  };

  const productData = productFactory();
  describe("Positive scenarios ", () => {
    it("should create, read, update and delete a product", () => {
      return productCyApi
        .create(productData)
        .then((res) => {
          expect(res.status).to.eql(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.eql("Product created successfully");
          for (const [key, type] of Object.entries(fieldsAndTypes)) {
            expect(res.body.productCreated).to.have.property(key);
            expect(res.body.productCreated[key]).to.be.an(type);
          }

          const productId = res.body.productCreated.id;
          return productCyApi
            .getById(productId)
            .then((res) => ({ res, productId }));
        })
        .then(({ res, productId }) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.an("object");
          expect(res.body.product.id).to.eql(productId);

          const productDataUpdated = productFactory();
          return productCyApi
            .update(productId, productDataUpdated)
            .then((res) => ({
              res,
              productId,
              productDataUpdated,
            }));
        })
        .then(({ res, productId, productDataUpdated }) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.an("object");
          expect(res.body.productUpdated.id).to.eql(productId);

          const productBody = res.body.productUpdated;
          for (const [key, type] of Object.entries(fieldsAndTypes)) {
            expect(productBody).to.have.property(key);
            expect(productBody[key]).to.be.an(type);
          }
          expect(productBody).to.include(productDataUpdated);

          return productCyApi
            .delete(productId)
            .then((res) => ({ res, productId }));
        })
        .then(({ res, productId }) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.eql("Product deleted successfully");

          return productCyApi.getById(productId, {
            failOnStatusCode: false,
          });
        })
        .then((res) => {
          expect(res.status).to.eql(404);
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.eql("Product not found");
        });
    });
  });
});
