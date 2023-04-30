import type { Prisma } from "@prisma/client"
import { prisma } from "../src/server/db"
import { faker } from "@faker-js/faker/locale/en_CA"

async function seedToppingTypes() {
  const toppingTypes: Prisma.ToppingTypeCreateInput[] = [
    { name: "meat" },
    { name: "vegetable" },
    { name: "other" },
  ]

  await prisma.toppingType.createMany({ data: toppingTypes })
}

async function seedCrustType() {
  await prisma.crustType.createMany({
    data: [
      { name: "lightly done" },
      { name: "standard" },
      { name: "well done" },
    ],
  })
}

async function seedCrustThickness() {
  const toppingTypes: Prisma.CrustThicknessCreateManyInput[] = [
    { name: "thin" },
    { name: "standard" },
    { name: "thick" },
  ]

  await prisma.toppingType.createMany({ data: toppingTypes })
}

async function seedCheeseType() {
  await prisma.cheeseType.createMany({
    data: [{ name: "mozzarella" }, { name: "4 cheese" }, { name: "vegan" }],
  })
}

async function seedCheeseAmt() {
  await prisma.cheeseAmt.createMany({
    data: [
      { name: "normal", basePrice: 0 },
      { name: "extra", basePrice: 1.5 },
    ],
  })
}

async function seedSauceType() {
  await prisma.sauceType.createMany({
    data: [
      { name: "classic tomato" },
      { name: "pesto" },
      { name: "bbq" },
      { name: "none" },
    ],
  })
}

async function seedSauceAmt() {
  await prisma.sauceType.createMany({
    data: [{ name: "standard" }, { name: "extra" }],
  })
}

async function seedUsers(numUsers: number) {
  const users: Prisma.UserCreateManyInput[] = []
  for (let i = 0; i < numUsers; i++) {
    users.push({
      email: faker.internet.email(),
      name: faker.name.fullName(),
    })
  }
  return await prisma.user.createMany({ data: users })
}

async function seedAddresses() {
  const users = await prisma.user.findMany()
  for (const { id: userId } of users) {
    const numAddresses = faker.datatype.number({ min: 0, max: 5 })
    const addresses: Prisma.AddressCreateManyInput[] = []

    for (let i = 0; i < numAddresses; i++) {
      const includeLabel = faker.datatype.boolean()
      const province = faker.address.state()

      addresses.push({
        userId: userId,
        label: includeLabel ? faker.random.words() : null,
        street: faker.address.streetAddress(),
        unit: faker.address.secondaryAddress(),
        province,
        country: "CA",
        postalCode: faker.address.zipCodeByState(province),
        phoneNumber: faker.phone.number(),
      })
    }

    await prisma.address.createMany({ data: addresses })
  }
}

async function reset() {
  await Promise.all([
    prisma.toppingType.deleteMany({}),
    prisma.cheeseAmt.deleteMany({}),
    prisma.cheeseType.deleteMany({}),
    prisma.crustThickness.deleteMany({}),
    prisma.crustType.deleteMany({}),
    prisma.sauceType.deleteMany({}),
    prisma.sauceAmt.deleteMany({}),
  ])

  await prisma.address.deleteMany({})

  await Promise.all([prisma.user.deleteMany({}), prisma.product.deleteMany({})])
}

async function seedProductCustomizationDependencies() {
  await Promise.all([
    seedToppingTypes(),
    seedCheeseAmt(),
    seedCheeseType(),
    seedCrustThickness(),
    seedCrustType(),
    seedSauceType(),
    seedSauceAmt(),
  ])
}

async function seedProducts(numProducts: number) {
  const products: Prisma.ProductCreateInput[] = []
  const nameCaps = ["pizza", "sandwich", "pasta"]
  for (let i = 0; i < numProducts; i++) {
    const numWords = faker.datatype.number({ min: 1, max: 3 })
    const nameCap =
      nameCaps[faker.datatype.number({ min: 0, max: nameCaps.length })]

    products.push({
      name: `${faker.lorem.words(numWords)} ${nameCap || ""}`,
      basePrice: faker.datatype.float({ min: 6, max: 14 }),
      isDraft: false,
      stock: faker.datatype.number({ min: 0, max: 100 }),
      sku: faker.datatype.uuid(),
      image_url: faker.image.food(),
    })
  }
  await prisma.product.createMany({ data: products })
}

async function main() {
  await reset()
  await Promise.all([
    seedUsers(30),
    seedProductCustomizationDependencies(),
    seedProducts(30),
  ])
  await seedAddresses()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
