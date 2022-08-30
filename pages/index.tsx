import type { NextPage } from 'next'
import Categories from '../src/components/HomePage/Categories/Categories'
import Popular from '../src/components/HomePage/Popular/Popular'


const IndexPage: NextPage = () => {
  return (
    <>
      <Categories/>
      <Popular/>
    </>
  )
}

export default IndexPage
