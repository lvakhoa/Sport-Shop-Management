'use client'

import { useParams } from 'next/navigation'

import React from 'react'

type Props = {}

function EmployeeDetail({}: Props) {
  const { id: userId } = useParams()
  return <div>{userId}</div>
}

export default EmployeeDetail
