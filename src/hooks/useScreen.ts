import { useMediaQuery } from 'react-responsive'

const SCREEN_WIDTH = {
  DESKTOP: 1224,
}

export const useScreen = () => {
  const isDesktop = useMediaQuery({
    minWidth: SCREEN_WIDTH.DESKTOP,
  })

  return {
    isDesktop,
  }
}
