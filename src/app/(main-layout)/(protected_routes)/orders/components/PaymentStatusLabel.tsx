function PaidLabel() {
  return (
    <div className='inline-block rounded-full border-2 border-[#30C365] bg-[#F2FDF5] px-2 py-1 text-[14px] text-[#30C365]'>
      $ Paid
    </div>
  )
}

function CODLabel() {
  return (
    <div className='inline-block rounded-full border-2 border-[#F1DC1A] bg-[#FEFFDD] px-2 py-1 text-[14px] text-[#F1DC1A]'>
      $ COD
    </div>
  )
}

export { PaidLabel, CODLabel }
