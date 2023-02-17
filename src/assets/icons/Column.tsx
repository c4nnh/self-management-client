import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ColumnSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 17 17"
  >
    <g></g>
    <path
      d="M1 17h3v-17h-3v17zM2 1h1v15h-1v-15zM5 17h3v-17h-3v17zM6 1h1v15h-1v-15zM9 17h3v-17h-3v17zM10 1h1v15h-1v-15zM13 0v17h3v-17h-3zM15 16h-1v-15h1v15z"
      fill="currentColor"
    />
  </svg>
)

export const ColumnIcon: React.FC<
  Partial<CustomIconComponentProps>
> = props => <Icon component={ColumnSvg} {...props} />
