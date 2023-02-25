import {
  AssetIcon,
  EventIcon,
  LoanIcon,
  LogoIcon,
  ResumeIcon,
  SkillIcon,
  TontineIcon,
  UKFlagIcon,
  VIFlagIcon,
} from '@/assets'
import { ROUTES } from '@/constants'
import { useScreen } from '@/hooks'
import { Language, Role } from '@/models'
import { useAuthStore } from '@/stores'
import {
  LogoutOutlined,
  MenuOutlined,
  ProjectOutlined,
  TransactionOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Modal } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import classNames from 'classnames'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Header: React.FC = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { user, logout } = useAuthStore()
  const { isDesktop } = useScreen()

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

  const handleChangeLanguage = (lang: Language) => {
    changeLanguage(lang)
  }

  const selectedKey = useMemo(() => pathname.split('/')[1], [pathname])

  const desktopMenuItems = [
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

  const finaceMenuItems: ItemType[] = [
    {
      key: 'transaction',
      icon: <TransactionOutlined />,
      label: t('transaction.title'),
      onClick: () => goToPage(ROUTES.PRIVATE.TRANSACTION),
    },
    {
      key: 'loan',
      icon: <LoanIcon />,
      label: t('loan.title'),
      onClick: () => goToPage(ROUTES.PRIVATE.LOAN),
    },
    {
      key: 'tontine',
      icon: <TontineIcon />,
      label: t('tontine.title'),
      onClick: () => goToPage(ROUTES.PRIVATE.TONTINE),
    },
  ]

  const financeAdminMenuItems: ItemType[] = [
    {
      key: 'currency',
      icon: <TontineIcon />,
      label: t('currency.title'),
      onClick: () => goToPage(ROUTES.PRIVATE.CURRENCY),
    },
  ]

  const mobileExtraMenuItems = [
    {
      key: 'finance',
      label: t('finance.title'),
      type: 'group',
      children: [
        ...finaceMenuItems,
        ...(user?.role === Role.ADMIN ? financeAdminMenuItems : []),
      ],
    },
    {
      key: 'work',
      label: t('work.title'),
      type: 'group',
      children: [
        {
          key: 'resume',
          icon: <ResumeIcon />,
          label: t('resume.title'),
          onClick: () => goToPage(ROUTES.PRIVATE.RESUME),
        },
        {
          key: 'skill',
          icon: <SkillIcon />,
          label: t('skill.title'),
          onClick: () => goToPage(ROUTES.PRIVATE.SKILL),
        },
        {
          key: 'project',
          icon: <ProjectOutlined />,
          label: t('project.title'),
          onClick: () => goToPage(ROUTES.PRIVATE.PROJECT),
        },
      ],
    },
    {
      key: 'event',
      icon: <EventIcon />,
      label: t('event.title'),
      onClick: () => goToPage(ROUTES.PRIVATE.EVENT),
    },
    {
      key: 'asset',
      icon: <AssetIcon />,
      label: t('asset.title'),
      onClick: () => goToPage(ROUTES.PRIVATE.ASSET),
    },
    {
      key: 'language',
      label: t('language.title'),
      type: 'group',
      children: [
        {
          key: 'en',
          icon: <UKFlagIcon />,
          label: t('language.english'),
          onClick: () => handleChangeLanguage('en'),
        },
        {
          key: 'vi',
          icon: <VIFlagIcon />,
          label: t('language.vietnamese'),
          onClick: () => handleChangeLanguage('vi'),
        },
      ],
    },
  ]

  return (
    <Container
      className={classNames({
        desktop: isDesktop,
      })}
    >
      {!isDesktop && (
        <>
          <div className="w-4" />
          <LogoIcon className="text-4xl text-primary flex items-center justify-center" />
          <Dropdown
            menu={{
              items: [...mobileExtraMenuItems, ...desktopMenuItems],
              selectedKeys: [selectedKey, language],
            }}
            placement="bottomRight"
            arrow
            trigger={['click']}
          >
            <MenuOutlined />
          </Dropdown>
        </>
      )}
      {isDesktop && (
        <Dropdown
          menu={{ items: desktopMenuItems }}
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
      )}
    </Container>
  )
}

const Container = styled.div`
  ${tw`fixed bg-gray-200 w-full z-[2] h-10 py-2 px-3 flex items-center justify-end gap-2 box-border`};

  box-shadow: 0 0.125rem 0.25rem rgba(87, 103, 197, 0.1) !important;

  :not(&.desktop) {
    ${tw`justify-between`}
  }
`
