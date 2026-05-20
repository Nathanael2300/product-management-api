import db from "../database/database.js";

class ProductModel {
  getAllProducts() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM products", [], function (err, rows) {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows);
      });
    });
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM products WHERE id = ?", [id], function (err, row) {
        if (err) {
          reject(err);
          return;
        }

        resolve(row);
      });
    });
  }

  createProduct(productData) {
    const { name, price, category, stock } = productData;

    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO products (name, price, category, stock) VALUES (?, ?, ?, ?)",
        [name, price, category, stock],
        function (err) {
          if (err) {
            reject(err);
            return;
          }
          resolve({
            id: this.lastID,
            name,
            price,
            category,
            stock,
          });
        },
      );
    });
  }

  updateProduct(id, productData) {
    const { name, price, category, stock } = productData;

    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE products SET name = ?, price = ?, category = ?, stock = ? WHERE id = ?",
        [name, price, category, stock, id],
        function (err) {
          if (err) {
            reject(err);
            return;
          }

          resolve({
            updated: this.changes,
          });
        },
      );
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM products WHERE id =?", [id], function (err) {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          deleted: this.changes,
        });
      });
    });
  }
}

export default new ProductModel();
