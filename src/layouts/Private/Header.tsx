import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { ROUTES } from '../../constants'
import { useAuthStore } from '../../stores'

type Language = 'en' | 'vi'

export const Header: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    Modal.confirm({
      title: t('logout.confirm'),
      okText: t('common.yes'),
      cancelText: t('common.no'),
      onOk: () => {
        logout()
        navigate(`/${ROUTES.AUTH.ROOT}`)
      },
    })
  }

  const goToPage = (path: string) => navigate(`/${path}`)

  const menuItems = [
    {
      key: 'account',
      icon: <UserOutlined />,
      label: t('account.title'),
      onClick: () => goToPage(ROUTES.PRIVATE.ACCOUNT),
    },
    {
      key: 'divider',
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined className="text-red-500" />,
      label: <span className="text-red-500">{t('logout.title')}</span>,
      onClick: handleLogout,
    },
  ]

  return (
    <Container>
      <Dropdown
        menu={{ items: menuItems }}
        placement="bottomRight"
        arrow
        trigger={['click']}
      >
        <div className="flex gap-2 items-center cursor-pointer hover:text-primary">
          <Avatar src={user?.image} size={40} />
          <div className="flex flex-col justify-center">
            <span>{user?.name}</span>
          </div>
        </div>
      </Dropdown>
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-10 py-2 px-3 flex items-center justify-end gap-2`};
  box-shadow: 0 0.125rem 0.25rem rgba(87, 103, 197, 0.1) !important;
`
