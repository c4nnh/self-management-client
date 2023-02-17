import { useMediaQuery } from 'react-responsive'
import { SCREEN_WIDTH } from '../constants'

export const useScreen = () => {
  const isDesktop = useMediaQuery({
    minWidth: SCREEN_WIDTH.DESKTOP,
  })
  const isMobile = useMediaQuery({
    maxWidth: SCREEN_WIDTH.MOBILE,
  })

  return {
    isDesktop,
    isMobile,
  }
}
