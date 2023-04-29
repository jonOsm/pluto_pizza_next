import { z } from "zod"
import { createInput } from "~/schemas/address"
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
    .input(createInput)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.address.create({
        data: {
          userId: ctx.session.user.id,
          ...input,
        },
      })
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ input, ctx }) => {
    return ctx.prisma.address.delete({
      where: {
        id: input,
      },
    })
  }),
})
