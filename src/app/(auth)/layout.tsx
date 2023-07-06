import { FC } from "react"

interface LayoutProps {
  children: React.ReactNode
}

const layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  )
}

export default layout
