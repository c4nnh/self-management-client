import { useScreen } from '@/hooks'
import { Input } from 'antd'
import { SearchProps } from 'antd/es/input'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  value?: string
  searchProps?: SearchProps
  setValue: (value?: string) => void
}

export const SearchInput: React.FC<Props> = ({
  value,
  searchProps,
  setValue,
}) => {
  const { t } = useTranslation()
  const { isDesktop } = useScreen()

  const [search, setSearch] = useState(value)

  useEffect(() => {
    setSearch(value)
  }, [value])

  return (
    <Input.Search
      size={isDesktop ? 'large' : 'middle'}
      className="max-w-[500px]"
      enterButton
      allowClear
      value={search}
      onChange={e => setSearch(e.target.value)}
      onSearch={setValue}
      {...searchProps}
    />
  )
}
