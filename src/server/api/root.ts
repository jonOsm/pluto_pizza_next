import { createTRPCRouter } from "~/server/api/trpc"
import { exampleRouter } from "~/server/api/routers/example"
import { addressRouter } from "./routers/address"
import { userRouter } from "./routers/user"
import { productrouter } from "./routers/product"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  address: addressRouter,
  user: userRouter,
  product: productrouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
