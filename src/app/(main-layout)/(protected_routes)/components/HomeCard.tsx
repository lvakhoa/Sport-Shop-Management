type HomeCardProps = {
  haveDateRange?: boolean
  title: string
  children: React.ReactNode
}

function HomeCard({ haveDateRange = false, title, children }: HomeCardProps) {
  return (
    <div className='rounded-sm bg-white-100 [box-shadow:0_2px_6px_0_rgba(67,89,113,.12)]'>
      <div className='flex flex-col items-center justify-between border-b border-[rgb(229,231,235)] p-5 sm:flex-row'>
        <h3 className='text-lg font-semibold text-heading'>{title}</h3>
      </div>
      <div className='p-5'>{children}</div>
    </div>
  )
}

export default HomeCard
