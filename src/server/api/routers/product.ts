import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const productrouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        skip: z.number().min(0),
        take: z.number().min(1),
      })
    )
    .query(async ({ ctx, input: { skip, take } }) => {
      return await ctx.prisma.product.findMany({ skip, take })
    }),
  // create: protectedProcedure
  //   .input(z.object({}))
  //   .mutation(async ({ input, ctx }) => {
  //     throw new TRPCError({
  //     code: 'INTERNAL_SERVER_ERROR',
  //     message: 'NOT YET IMPLEMENTED',
  //     })
  //   }),
  // delete: protectedProcedure
  //   .input(z.object({}))
  //   .mutation(async ({ input, ctx }) => {
  //     throw new TRPCError({
  //     code: 'INTERNAL_SERVER_ERROR',
  //     message: 'NOT YET IMPLEMENTED',
  //     })
  //   }),
  // update: protectedProcedure
  //   .input(z.object({}))
  //   .mutation(async ({ input, ctx }) => {
  //     throw new TRPCError({
  //     code: 'INTERNAL_SERVER_ERROR',
  //     message: 'NOT YET IMPLEMENTED',
  //     })
  //   }),
})
