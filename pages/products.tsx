import { ProductPage } from '@modules/products'
import Head from 'next/head'
//
export default function Products() {
  return (
    <>
      <Head>
        <title>My Store</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductPage/>
    </>
  )
}
