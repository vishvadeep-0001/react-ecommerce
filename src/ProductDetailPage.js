import React from 'react'
import Navbar from './features/navbar/Navbar'
import ProductDetail from "../src/features/product-list/components/ProductDetail"

const ProductDetailPage = () => {
  return (
    <Navbar>
      <ProductDetail/>
    </Navbar>
  )
}

export default ProductDetailPage