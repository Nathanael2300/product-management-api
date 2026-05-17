import db from "../database/database.js";

class ProductModel {
  getAllProducts() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
          reject(err.message);
          return;
        }

        resolve(rows);
      });
    });
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM products WHERE id = ?", [id], (err, rows) => {
        if (err) {
          reject(err.message);
          return;
        }

        resolve(rows);
      });
    });
  }

  createProduct(productData) {
    const { name, price, category, stock } = productData;

    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO products (name, price, category, stock) VALUES (?, ?, ?, ?)",
        [name, price, category, stock],
        (err) => {
          if (err) {
            reject(err.message);
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
        "UPDATE products SET name = ? price = ? category = ? stock = ? WHERE = ?",
        [name, price, category, stock, id],
        (err) => {
          if (err) {
            reject(err.message);
            return;
          }

          resolve({
            updeted: this.changes,
          });
        },
      );
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM products WHERE id =?", [id], (err) => {
        if (err) {
          reject(err.message);
          return;
        }

        resolve(this.changes);
      });
    });
  }
}

export default new ProductModel();
