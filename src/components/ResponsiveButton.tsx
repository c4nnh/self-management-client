import { Button, ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'
import { useScreen } from '../hooks'

type Props = PropsWithChildren<ButtonProps>

export const ResponsiveButton: React.FC<Props> = ({ children, ...props }) => {
  const { isDesktop } = useScreen()

  return (
    <Button size={isDesktop ? 'large' : 'middle'} {...props}>
      {children}
    </Button>
  )
}
