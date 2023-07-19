import {Dimensions, Platform} from 'react-native';

export default {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  /**
   * iPhoneX：刘海高度：44pt，底部高度：34pt
   */
  iphonex:
    Platform.OS === 'ios' &&
    (Dimensions.get('window').height === 812 ||
      Dimensions.get('window').height === 896 ||
      Dimensions.get('window').height === 844 ||
      Dimensions.get('window').height === 926),
  iphone12:
    Platform.OS === 'ios' &&
    (Dimensions.get('window').height === 844 ||
      Dimensions.get('window').height === 926),
  iphone: Platform.OS === 'ios',
  android: Platform.OS === 'android',
  getHeight: (size: number) => {
    if (!size) {
      return Dimensions.get('window').height;
    }
    return (Dimensions.get('window').height / 812) * size;
  },
  getWidth: (size: number, defaultSize = 375) => {
    if (!size) {
      return Dimensions.get('window').width;
    }
    return (size * Dimensions.get('window').width) / defaultSize;
  },
  calc: (size: number, defaultSize = 375) => {
    if (!size) {
      return Dimensions.get('window').width;
    }
    return (size * Dimensions.get('window').width) / defaultSize;
  },
};
