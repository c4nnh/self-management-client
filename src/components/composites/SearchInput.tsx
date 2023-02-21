import { Input } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScreen } from '../../hooks'

type Props = {
  value?: string
  setValue: (value?: string) => void
}

export const SearchInput: React.FC<Props> = ({ value, setValue }) => {
  const { t } = useTranslation()
  const { isDesktop } = useScreen()

  const [search, setSearch] = useState(value)

  return (
    <Input.Search
      size={isDesktop ? 'large' : 'middle'}
      className="max-w-[500px]"
      enterButton
      allowClear
      value={search}
      onChange={e => setSearch(e.target.value)}
      onSearch={setValue}
      placeholder={`${t('transaction.search.placeholder')}`}
    />
  )
}
