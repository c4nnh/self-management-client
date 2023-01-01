import {
  DollarCircleOutlined,
  GlobalOutlined,
  LogoutOutlined,
  ProjectOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu, Modal } from 'antd'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import {
  AssetIcon,
  EventIcon,
  ResumeIcon,
  SkillIcon,
  UKFlagIcon,
  VIFlagIcon,
  WorkIcon,
} from '../assets'
import { ROUTES } from '../constants'
import i18n from '../i18n'
import { useAuthStore } from '../stores'

type Props = PropsWithChildren

type Language = 'en' | 'vi'

export const PrivateLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation()

  const { logout } = useAuthStore()

  const [openKeys, setOpenKeys] = useState<string[]>([])

  const selectedKey = useMemo(() => pathname.split('/')[1], [pathname])

  const handleChangeLanguage = (lang: Language) => {
    changeLanguage(lang)
  }

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
      key: 'profile',
      icon: <UserOutlined />,
      label: t('profile.title'),
      onClick: () => goToPage(ROUTES.PRIVATE.PROFILE),
    },
    {
      key: 'finance',
      icon: <DollarCircleOutlined />,
      label: t('finance.title'),
      onClick: () => goToPage(ROUTES.PRIVATE.FINANCE),
    },
    {
      key: 'work',
      icon: <WorkIcon />,
      label: t('work.title'),
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
      key: 'setting',
      icon: <SettingOutlined />,
      label: t('setting.title'),
      children: [
        {
          key: 'language',
          icon: <GlobalOutlined />,
          label: t('language.title'),
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
      ],
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('logout.title'),
      onClick: handleLogout,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('logout.title'),
      onClick: handleLogout,
    },
  ]

  useEffect(() => {
    const currentKey = pathname.split('/')[1]
    const openKeys = menuItems
      .filter(item =>
        item.children?.map((el: any) => el.key).includes(currentKey)
      )
      .map(item => item.key)
    setOpenKeys(openKeys)
  }, [])

  return (
    <Container>
      <StyledMenu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey, i18n.language]}
        items={menuItems}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
      />
      <Body>{children}</Body>
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-full flex`}
`

const StyledMenu = styled(Menu)`
  ${tw`!border-none max-w-[225px] py-4`}

  .ant-menu-item, .ant-menu-submenu-title {
    ${tw`!mx-2`};
    width: calc(100% - 16px);
  }

  .ant-menu-sub {
    ${tw`!bg-[#001529]`}
  }
`

const Body = styled.div`
  ${tw`flex-1`}
`
