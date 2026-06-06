class Product {
  constructor({ id, name, price, category, stock }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.stock = stock;
  }

  validate() {
    if (this.price < 0) {
      throw new Error("Price cannot be negative");
    }

    if (this.stock < 0) {
      throw new Error("Stock cannot be negative");
    }
  }
}

export default Product;
