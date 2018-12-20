import { Dimensions } from 'react-native';

export default {
  screen: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  isSmallDevice: Dimensions.get('screen').width < 375,
  tabBarHeight: 65,
};

export const WindowSize = () => {
  const size = Dimensions.get("screen")
  const smaller = Math.min(size.height, size.width) * size.scale
  return smaller
}

const ScreenSize = WindowSize()

export const FontSizes = {
  menuIconSize: ScreenSize / 28,
  listHeader: ScreenSize / 72,
  listRow: ScreenSize / 84,
  standard: ScreenSize / 64,
  smaller: ScreenSize / 72,
  iconButton: ScreenSize / 48,
  buttons: ScreenSize / 72
}