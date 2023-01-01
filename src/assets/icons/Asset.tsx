import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const AssetSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="9" cy="15" r="6" />
    <circle cx="9" cy="15" r="2" />
    <circle cx="19" cy="5" r="2" />
    <path d="M14.218 17.975l6.619 -12.174" />
    <path d="M6.079 9.756l12.217 -6.631" />
    <circle cx="9" cy="15" r="2" />
  </svg>
)

export const AssetIcon: React.FC<Partial<CustomIconComponentProps>> = props => (
  <Icon component={AssetSvg} {...props} />
)
