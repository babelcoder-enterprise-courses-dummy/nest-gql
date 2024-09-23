import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { slugify } from '../src/core/utils/slugify';
import { Role } from '../src/users/models/role.model';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@babelcoder.com' },
    update: {},
    create: {
      email: 'admin@babelcoder.com',
      name: 'Admin',
      password: await bcrypt.hash('password', 12),
      role: Role.ADMIN,
      image: faker.image.avatar(),
      address: {
        create: {
          houseNumber: faker.location.buildingNumber().toString(),
          road: faker.location.street(),
          district: faker.location.city(),
          province: faker.location.state(),
          postalCode: faker.location.zipCode('#####'),
        },
      },
    },
  });

  // Create Users
  const numOfUsers = 10;
  const userIds: number[] = [];

  for (let i = 0; i < numOfUsers; i++) {
    const createUserInput: Prisma.UserCreateInput = {
      name: faker.internet.displayName(),
      password: await bcrypt.hash(faker.internet.password(), 12),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      role: faker.helpers.arrayElement([
        Role.ADMIN,
        Role.MODERATOR,
        Role.MEMBER,
      ]),
      address: {
        create: {
          houseNumber: faker.location.buildingNumber().toString(),
          road: faker.location.street(),
          district: faker.location.city(),
          province: faker.location.state(),
          postalCode: faker.location.zipCode('#####'),
        },
      },
    };
    const user = await prisma.user.upsert({
      where: { email: createUserInput.email },
      update: {},
      create: createUserInput,
    });

    userIds.push(user.id);
  }

  // Create Categories
  const numOfCategories = 20;
  const categoryIds: number[] = [];

  for (let i = 0; i < numOfCategories; i++) {
    const name = faker.lorem.word();
    const slug = slugify(name);
    const createCategoryInput: Prisma.CategoryCreateInput = {
      name,
      slug,
      desc: faker.lorem.paragraph(),
    };

    const category = await prisma.category.upsert({
      where: {
        slug,
      },
      update: {},
      create: createCategoryInput,
    });

    categoryIds.push(category.id);
  }

  // Create Products
  const numOfProducts = 100;
  const productIds: number[] = [];

  for (let i = 0; i < numOfProducts; i++) {
    const name = faker.lorem.word();
    const slug = slugify(name);
    const createProductInput: Prisma.ProductCreateInput = {
      name,
      slug,
      desc: faker.lorem.paragraph(),
      price: faker.number.int({ min: 100, max: 5000 }),
      image: faker.image.url(),
      categories: {
        connect: faker.helpers
          .arrayElements(categoryIds, { min: 1, max: 3 })
          .map((id) => ({ id })),
      },
    };

    const product = await prisma.product.upsert({
      where: {
        slug,
      },
      update: {},
      create: createProductInput,
    });

    productIds.push(product.id);
  }

  // Create Orders
  const numOfOrders = 1000;

  await prisma.order.deleteMany();

  for (let i = 0; i < numOfOrders; i++) {
    const createOrderInput: Prisma.OrderCreateInput = {
      user: { connect: { id: faker.helpers.arrayElement(userIds) } },
      items: {
        createMany: {
          data: faker.helpers.multiple(
            () => ({
              quantity: faker.number.int({ min: 1, max: 10 }),
              price: faker.number.int({ min: 100, max: 5000 }),
              productId: faker.helpers.arrayElement(productIds),
            }),
            { count: { min: 1, max: 10 } },
          ),
        },
      },
    };

    await prisma.order.create({
      data: createOrderInput,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
