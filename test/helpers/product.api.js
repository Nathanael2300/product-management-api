import request from "supertest";
import app from "../../src/app.js";

class ProductApi {
  getAll() {
    return request(app).get("/products");
  }

  getById(id) {
    return request(app).get(`/products/${id}`);
  }

  create(data) {
    return request(app).post("/products").send(data);
  }

  update(id, data) {
    return request(app).put(`/products/${id}`).send(data);
  }

  delete(id) {
    return request(app).delete(`/products/${id}`);
  }
}

export default new ProductApi();
