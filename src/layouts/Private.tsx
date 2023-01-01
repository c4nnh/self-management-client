import {
  DollarCircleOutlined,
  GlobalOutlined,
  LogoutOutlined,
  ProjectOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Menu, Modal } from 'antd'
import classNames from 'classnames'
import { PropsWithChildren, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import {
  AssetIcon,
  EventIcon,
  ResumeIcon,
  SkillIcon,
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
    i18n: { changeLanguage },
  } = useTranslation()

  const { logout } = useAuthStore()

  const [menuCollapse, setMenuCollapse] = useState(false)

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

  return (
    <Container>
      <StyledMenu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        inlineCollapsed={menuCollapse}
        className={classNames({
          collapsed: menuCollapse,
        })}
        items={[
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
                    key: 'english',
                    icon: <UserOutlined />,
                    label: t('language.english'),
                    onClick: () => handleChangeLanguage('en'),
                  },
                  {
                    key: 'vietnamese',
                    icon: <UserOutlined />,
                    label: t('language.vietnamese'),
                    onClick: () => handleChangeLanguage('vi'),
                  },
                ],
              },
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: t('logout.title'),
                onClick: handleLogout,
              },
            ],
          },
        ]}
      />
      <Button onClick={() => setMenuCollapse(!menuCollapse)}>das</Button>
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

  &.collapsed {
    .ant-menu-item,
    .ant-menu-submenu-title {
      ${tw`!px-6`}
    }
  }
`

const Body = styled.div`
  ${tw`flex-1`}
`
