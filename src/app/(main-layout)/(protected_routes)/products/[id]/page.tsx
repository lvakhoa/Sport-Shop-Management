'use client'

import { useParams } from 'next/navigation'

import React from 'react'

type Props = {}

function ProductDetail({}: Props) {
  const { id: productId } = useParams()
  return <div>{productId}</div>
}

export default ProductDetail
