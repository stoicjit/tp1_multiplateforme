import { useWindowDimensions } from 'react-native';
import { BREAKPOINTS } from '../constants/theme';

export function useResponsive() {
  const { width } = useWindowDimensions();

  const isMobile = width < BREAKPOINTS.tablet;
  const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
  const isDesktop = width >= BREAKPOINTS.desktop;

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen: isMobile,
    isLargeScreen: isDesktop,
  };
}