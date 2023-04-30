import { z } from "zod"
import { createValidation, editValidation } from "~/validation/address"
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
    .input(createValidation)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.address.create({
        data: {
          userId: ctx.session.user.id,
          ...input,
        },
      })
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.address.delete({
        where: {
          id: input,
        },
      })
    }),
  update: protectedProcedure
    .input(editValidation)
    .mutation(async ({ input, ctx }) => {
      const addressUser = await ctx.prisma.address.findFirst({
        where: { userId: ctx.session.user.id },
      })
      if (!addressUser) {
      }
      return ctx.prisma.address.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      })
    }),
})
