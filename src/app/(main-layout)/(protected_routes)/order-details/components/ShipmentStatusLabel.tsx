import Image from 'next/image'
import { BadgeCheck } from 'lucide-react'

function DeliveredLabel() {
  return (
    <div className='inline-flex space-x-[5px] rounded-full border-2 border-[#30C365] bg-[#F2FDF5] px-2 py-1 text-[14px] text-[#30C365]'>
      <Image src='/assets/icons/truck-green.svg' alt='' width='18' height='18' />
      <span>Delivered</span>
    </div>
  )
}

function UndeliveredLabel() {
  return (
    <div className='inline-flex items-center space-x-[5px] rounded-full border-2 border-[#30C365] bg-[#F2FDF5] px-2 py-1 text-[14px] text-[#30C365]'>
      <BadgeCheck width={18} height={18} />
      <span>Undelivered</span>
    </div>
  )
}

function InTransitLabel() {
  return (
    <div className='inline-flex space-x-[5px] rounded-full border-2 border-[#30C365] bg-[#F2FDF5] px-2 py-1 text-[14px] text-[#30C365]'>
      <Image src='/assets/icons/truck-green.svg' alt='' width='18' height='18' />
      <span>In Transit</span>
    </div>
  )
}

function PendingLabel() {
  return (
    <div className='inline-flex space-x-[5px] rounded-full border-2 border-[#F1DC1A] bg-[#FEFFDD] px-2 py-1 text-[14px] text-[#F1DC1A]'>
      <Image src='/assets/icons/truck-yellow.svg' alt='' width='18' height='18' />
      <span>Pending</span>
    </div>
  )
}

function CancelledLabel() {
  return (
    <div className='inline-flex space-x-[5px] rounded-full border-2 border-[#FF5353] bg-[#F9D5D5] px-2 py-1 text-[14px] text-[#FF5353]'>
      <Image src='/assets/icons/truck-red.svg' alt='' width='18' height='18' />
      <span>Cancelled</span>
    </div>
  )
}

function ReturnedLabel() {
  return (
    <div className='inline-flex space-x-[5px] rounded-full border-2 border-[#FF5353] bg-[#F9D5D5] px-2 py-1 text-[14px] text-[#FF5353]'>
      <Image src='/assets/icons/truck-red.svg' alt='' width='18' height='18' />
      <span>Returned</span>
    </div>
  )
}

function PackagingLabel() {
  return (
    <div className='inline-flex items-center space-x-[5px] rounded-full border-2 border-[#30C365] bg-[#F2FDF5] px-2 py-1 text-[14px] text-[#30C365]'>
      <BadgeCheck width={18} height={18} />
      <span>Packaging</span>
    </div>
  )
}

export {
  PendingLabel,
  PackagingLabel,
  InTransitLabel,
  CancelledLabel,
  DeliveredLabel,
  ReturnedLabel,
  UndeliveredLabel,
}
