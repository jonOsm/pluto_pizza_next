import type { Prisma } from "@prisma/client"
import { prisma } from "../src/server/db"
import { faker } from "@faker-js/faker/locale/en_CA"

async function seedToppingTypes() {
  const toppingTypes: Prisma.ToppingTypeCreateInput[] = [
    { name: "meat" },
    { name: "vegetable" },
    { name: "other" },
  ]

  // createAll not supported by sqlite
  for (const toppingType of toppingTypes) {
    await prisma.toppingType.create({
      data: toppingType,
    })
  }
}

async function seedCrustType() {
  const crustTypes: Prisma.CrustTypeCreateInput[] = [
    { name: "lightly done" },
    { name: "standard" },
    { name: "well done" },
  ]

  // createAll not supported by sqlite
  for (const crustType of crustTypes) {
    await prisma.toppingType.create({
      data: crustType,
    })
  }
}
async function seedUsers(numUsers: number) {
  const userIds: string[] = []
  for (let i = 0; i < numUsers; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.name.fullName(),
      },
    })
    userIds.push(user.id)
  }
  return userIds
}

async function seedAddresses(userIds: string[]) {
  for (const userId of userIds) {
    const numAddresses = faker.datatype.number({ min: 0, max: 5 })

    for (let i = 0; i < numAddresses; i++) {
      const includeLabel = faker.datatype.boolean()
      const province = faker.address.state()

      await prisma.address.create({
        data: {
          userId: userId,
          label: includeLabel ? faker.random.words() : null,
          street: faker.address.streetAddress(),
          unit: faker.address.secondaryAddress(),
          province,
          country: "CA",
          postalCode: faker.address.zipCodeByState(province),
          phoneNumber: faker.phone.number(),
        },
      })
    }
  }
}

async function main() {
  await seedToppingTypes()
  await seedCrustType()
  const userIds = await seedUsers(30)
  await seedAddresses(userIds)
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
