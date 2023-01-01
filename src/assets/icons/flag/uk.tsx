import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

export const UKFlagIcon: React.FC<
  Partial<CustomIconComponentProps>
> = props => (
  <Icon component={() => <img src="images/flags/uk.png" />} {...props} />
)
