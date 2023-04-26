import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

export const addressRouter = createTRPCRouter({
  getAllCurrentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.address.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    })
  }),
  create: protectedProcedure
    .input(
      z.object({
        label: z.string().optional(),
        unit: z.string().optional(),
        street: z.string(),
        province: z.string(),
        postalCode: z.string(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.address.create({
        data: {
          userId: ctx.session.user.id,
          ...input,
        },
      })
    }),
})
