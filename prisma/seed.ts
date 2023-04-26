import type { Prisma } from "@prisma/client"
import { prisma } from "../src/server/db"
import { faker } from "@faker-js/faker"

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

async function seedAddresses() {
  const crustTypes: Prisma.AddressCreateInput[] = []

  // createAll not supported by sqlite
  // for (const crustType of crustTypes) {
  //   await prisma.toppingType.create({
  //     data: crustType,
  //   })
  // }
}

async function main() {
  await seedToppingTypes()
  await seedCrustType()
  await seedUsers(30)
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
