import { Dimensions } from 'react-native';

export default {
  screen: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  isSmallDevice: Dimensions.get('screen').width < 375,
  tabBarHeight: 65,
};

const currentWidth = Dimensions.get('screen').width;
const currentHeight = Dimensions.get('screen').height;

// 'width' is smaller of the dimensions
const width = Math.min(currentWidth, currentHeight);
// 'height' is the larger of the dimensions
const height = Math.max(currentWidth, currentHeight);

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };

export const FontSizes = {
  menuIconSize: moderateScale(38), // ScreenSize / 28,
  listHeader: moderateScale(14), // ScreenSize / 72,
  listRow: moderateScale(12), // ScreenSize / 84,
  standard: moderateScale(16), // ScreenSize / 64,
  smaller: moderateScale(14), // ScreenSize / 72,
  smallest: moderateScale(12), // ScreenSize / 72,
  larger: moderateScale(18),
  balance: moderateScale(40),
  iconButton: moderateScale(20), // ScreenSize / 48,
  buttons: moderateScale(14), // ScreenSize / 72
};
