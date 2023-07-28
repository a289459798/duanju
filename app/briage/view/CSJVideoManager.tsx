import {StyleProp, ViewStyle, requireNativeComponent} from 'react-native';
export type CSJVideoProps = {
  id: number;
  index: number;
  isFromCard?: boolean;
  fromGid?: boolean;
  currentDuration?: number;
  config: {
    mode: string;
    freeSet?: number;
    lockSet?: number;
    isHideLeftTopTips?: boolean;
    isHideMore?: boolean;
    infiniteScrollEnabled?: boolean;
  };
  style?: StyleProp<ViewStyle> | undefined;
  onDPVideoPlay?: (data: any) => void;
  onDPVideoPause?: (data: any) => void;
  onDPVideoContinue?: (data: any) => void;
  onShowAdIfNeeded?: (data: any) => void;
};
export default requireNativeComponent<CSJVideoProps>('CSJVideoManager');
