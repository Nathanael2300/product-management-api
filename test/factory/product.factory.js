import { faker } from "@faker-js/faker";

export default function productFactory(override = {}) {
  return {
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    category: faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 100 }),

    ...override,
  };
}
