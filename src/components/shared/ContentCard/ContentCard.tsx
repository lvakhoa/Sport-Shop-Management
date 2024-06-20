import { SidebarEdit, Button } from '@/components/shared'
import { CirclePlus, Edit } from 'lucide-react'

interface ContentCardProps {
  title?: string
  children: React.ReactNode
  hasButton?: boolean
  buttonName?: string
  addContentSidebar?: React.ReactElement
}

function HomeCard({
  title,
  children,
  hasButton = false,
  buttonName,
  addContentSidebar,
}: ContentCardProps) {
  return (
    <div className='rounded-sm bg-white-100 [box-shadow:0_2px_6px_0_rgba(67,89,113,.12)]'>
      {!!title && (
        <div className='flex flex-col items-center justify-between border-b border-[rgb(229,231,235)] p-5 sm:flex-row'>
          <h3 className='text-lg font-medium text-content'>{title}</h3>
          {hasButton && (
            <SidebarEdit title={`Add ${buttonName}`} description='' content={addContentSidebar}>
              <Button className='flex gap-[5px] bg-primary duration-300 hover:bg-primary'>
                <Edit width={20} height={20} />
                <span className='text-[15px] font-normal text-[#FFFFFF] max-[666px]:hidden'>
                  {buttonName}
                </span>
              </Button>
            </SidebarEdit>
          )}
        </div>
      )}
      <div className='p-5'>{children}</div>
    </div>
  )
}

export default HomeCard
