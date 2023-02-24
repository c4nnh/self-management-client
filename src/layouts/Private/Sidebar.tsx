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
  WorkIcon,
} from '@/assets'
import { ROUTES } from '@/constants'
import { Language, Role } from '@/models'
import { useAuthStore } from '@/stores'
import {
  DollarCircleOutlined,
  DoubleLeftOutlined,
  GlobalOutlined,
  ProjectOutlined,
  SettingOutlined,
  TransactionOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation()
  const { user } = useAuthStore()

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [collapseMenu, setCollapseMenu] = useState(false)

  const selectedKey = useMemo(() => pathname.split('/')[1], [pathname])

  const handleChangeLanguage = (lang: Language) => {
    changeLanguage(lang)
  }

  const goToPage = (path: string) => navigate(`/${path}`)

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

  const workMenuItems: ItemType[] = [
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
  ]

  const menuItems = [
    {
      key: 'finance',
      icon: <DollarCircleOutlined />,
      label: t('finance.title'),
      children: [
        ...finaceMenuItems,
        ...(user?.role === Role.ADMIN ? financeAdminMenuItems : []),
      ],
    },
    {
      key: 'work',
      icon: <WorkIcon />,
      label: t('work.title'),
      children: [...workMenuItems],
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
    <Container
      className={classNames({
        collapsed: collapseMenu,
      })}
    >
      <LogoIcon className="text-4xl text-primary flex items-center justify-center pt-2" />
      <StyledMenu
        mode="inline"
        theme="dark"
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
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-full w-[225px] flex flex-col gap-2 bg-dark z-10`}

  &.collapsed {
    width: 80px;
  }
  transition: 0.5s;
`

const StyledMenu = styled(Menu)`
  ${tw`!flex-1 pt-5 !border-none`}

  .ant-menu-item,
  .ant-menu-submenu-title {
    ${tw`!mx-2`};
    width: calc(100% - 16px);
  }

  .ant-menu-sub {
    ${tw`!bg-dark`}
  }

  &.collapsed {
    .ant-menu-item,
    .ant-menu-submenu-title {
      ${tw`!px-6`}
    }
  }
`

const StyledDoubleLeftOutlined = styled(DoubleLeftOutlined)`
  ${tw`p-3 w-fit mx-auto text-white hover:text-primary`};
  transition: 0.5s;

  &.collapsed {
    transform: rotate(180deg);
  }
`
