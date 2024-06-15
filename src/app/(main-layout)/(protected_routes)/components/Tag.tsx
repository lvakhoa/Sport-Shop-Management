import Image from 'next/image'

export interface TagProps {
  icon: React.ReactElement
  iconBg: string
  title: string
  titleColor: string
  titleSize: number
  content: string
  contentColor: string
  contentSize: number
  background: string
}

function Tag({
  icon,
  iconBg,
  title,
  titleColor,
  titleSize,
  content,
  contentColor,
  contentSize,
  background,
}: TagProps) {
  return (
    <div
      className='flex items-center gap-4 rounded-lg p-4 [box-shadow:0_2px_6px_0_rgba(67,89,113,.12)]'
      style={{ backgroundColor: background }}
    >
      <div
        className='flex size-12 items-center justify-center rounded-full'
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>

      <div className='flex flex-col gap-2'>
        <span className='font-medium' style={{ color: titleColor, fontSize: titleSize }}>
          {title}
        </span>
        <span className='font-semibold' style={{ color: contentColor, fontSize: contentSize }}>
          {content}
        </span>
      </div>
    </div>
  )
}

export default Tag
