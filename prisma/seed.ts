import type { Prisma, User } from "@prisma/client"
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

const reset = async () => {
  await prisma.address.deleteMany({})
  await prisma.toppingType.deleteMany({})
  await prisma.crustType.deleteMany({})
  await prisma.user.deleteMany({})
}

async function main() {
  await reset()
  await seedToppingTypes()
  await seedCrustType()
  await seedUsers(30)
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
