import {StyleProp, ViewStyle, requireNativeComponent} from 'react-native';
export type CSJTJVideoProps = {
  style?: StyleProp<ViewStyle> | undefined;
  onDPVideoPlay?: (data: any) => void;
};
export default requireNativeComponent<CSJTJVideoProps>('CSJTJVideoManager');
