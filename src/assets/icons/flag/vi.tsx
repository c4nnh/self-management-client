import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

export const VIFlagIcon: React.FC<
  Partial<CustomIconComponentProps>
> = props => (
  <Icon component={() => <img src="images/flags/vi.png" />} {...props} />
)
