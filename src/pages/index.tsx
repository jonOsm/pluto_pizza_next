import { type NextPage } from "next"
import Head from "next/head"

import { api } from "~/utils/api"
import Card from "~/components/Card"
import { useState } from "react"

const Home: NextPage = () => {
  const pageSize = 12
  //TODO: Create pagination component
  const [productPager, setProductPager] = useState({ skip: 0, take: pageSize })

  const products = api.product.getAll.useQuery(productPager)

  const handlePagination = (offset: number) => {
    if (!products.data) return
    //next page and out of products
    if (offset >= 0 && pageSize > products.data.length) return

    const skip = productPager.skip + offset
    //prev page and at page 1
    if (offset < 0 && skip < 0) return

    setProductPager({
      skip,
      take: productPager.take,
    })
  }

  return (
    <>
      <Head>
        <title>Pluto Pizza</title>
        <meta name="description" content="Pizza from out of this world!" />
        {/* TODO: update favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-auto flex max-w-screen-xl flex-col gap-3">
        <div className="glass grid grid-cols-12 gap-3 rounded-lg p-3">
          {products.data && products.data?.length > 0
            ? products.data?.map((p) => (
                <Card
                  key={p.id}
                  title={p.name}
                  imgUrl={p.imageUrl}
                  btnText="Add to Order"
                >
                  <span className="text-xl ">${p.basePrice}</span>
                  <p className="text-xl ">{p.description}</p>
                </Card>
              ))
            : "No products found :("}
        </div>
        <div className="flex justify-center">
          <div className="btn-group">
            <button
              className="btn"
              onClick={() => handlePagination(pageSize * -1)}
            >
              «
            </button>
            <button className="btn">
              Page {productPager.skip / pageSize + 1}
            </button>
            <button className="btn" onClick={() => handlePagination(pageSize)}>
              »
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
