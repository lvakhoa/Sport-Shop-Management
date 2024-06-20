import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb'

interface IBreadcrumbWithLink {
  items: {
    name: string
    link: string
  }[]
  page: string
  className?: string
  textSize?: number
}

export default function BreadcrumbWithLink({
  items,
  page,
  className,
  textSize,
}: IBreadcrumbWithLink) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item) => (
          <>
            <BreadcrumbItem key={item.name}>
              <BreadcrumbLink asChild>
                <Link href={item.link} style={{ fontSize: textSize }}>
                  {item.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ))}
        <BreadcrumbItem key={page}>
          <BreadcrumbPage style={{ fontSize: textSize }}>{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
