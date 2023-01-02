import {
  DollarCircleOutlined,
  DoubleLeftOutlined,
  GlobalOutlined,
  LogoutOutlined,
  ProjectOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu, Modal } from 'antd'
import classNames from 'classnames'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import {
  AssetIcon,
  EventIcon,
  LogoIcon,
  ResumeIcon,
  SkillIcon,
  UKFlagIcon,
  VIFlagIcon,
  WorkIcon,
} from '../assets'
import { ROUTES } from '../constants'
import { useAuthStore } from '../stores'

type Props = PropsWithChildren

type Language = 'en' | 'vi'

export const PrivateLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation()

  const { logout } = useAuthStore()

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [collapseMenu, setCollapseMenu] = useState(false)

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
      <Sidebar
        className={classNames({
          collapsed: collapseMenu,
        })}
      >
        <LogoIcon className="text-4xl text-primary flex items-center justify-center pt-2" />
        <StyledMenu
          mode="inline"
          selectedKeys={[selectedKey, language]}
          items={menuItems}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          inlineCollapsed={collapseMenu}
          className={classNames({
            collapsed: collapseMenu,
          })}
        />
        <div className="h-14 flex items-center justify-center w-full">
          <StyledDoubleLeftOutlined
            className={classNames({
              collapsed: collapseMenu,
            })}
            onClick={() => setCollapseMenu(!collapseMenu)}
          />
        </div>
      </Sidebar>
      <Body>{children}</Body>
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-full flex bg-gray-300`}
`

const Sidebar = styled.div`
  ${tw`h-full w-[225px] flex flex-col bg-white gap-2`}

  &.collapsed {
    width: 80px;
  }
  transition: 0.5s;
`

const StyledMenu = styled(Menu)`
  ${tw`!flex-1 !border-none`}

  .ant-menu-item,
  .ant-menu-submenu-title {
    ${tw`!mx-2`};
    width: calc(100% - 16px);
  }

  &.collapsed {
    .ant-menu-item,
    .ant-menu-submenu-title {
      ${tw`!px-6`}
    }
  }
`

const StyledDoubleLeftOutlined = styled(DoubleLeftOutlined)`
  ${tw`p-3 w-fit mx-auto hover:text-primary`};
  transition: 0.5s;

  &.collapsed {
    transform: rotate(180deg);
  }
`

const Body = styled.div`
  ${tw`flex-1`}
`
