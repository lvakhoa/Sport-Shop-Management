'use client'

import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

function CustomerDetail({}: Props) {
  const { id: userId } = useParams()

  return <div>{userId}</div>
}

export default CustomerDetail
