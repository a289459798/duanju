import React, {
  useRef,
  useEffect,
  useState,
  Ref,
  useImperativeHandle,
} from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  PixelRatio,
  StyleSheet,
  PanResponder,
  Image,
  Dimensions,
} from 'react-native';
import {Text} from '@/component';
import {Screen} from '@/utils';
import {CSJTJVideoManager} from '@/briage/view';
import VideoAction from '@/component/custom/videoAction';
import RecommandModal, {
  RecommandModalRef,
} from '@/component/custom/recommandModal';
import historyAction from 'action/historyAction';
import useNavigator from 'hooks/useNavigator';
import Toast from '@attacks/react-native-toast';
import {Share} from 'react-native-umshare';
import config from 'config';
import {TTAdSdk} from 'briage/module';

const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    //@ts-ignore
    UIManager.CSJTJVideoManager.Commands.create.toString(), // we are calling the 'create' command
    [viewId],
  );

const resume = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    //@ts-ignore
    UIManager.CSJTJVideoManager.Commands.resume.toString(), // we are calling the 'create' command
    [viewId],
  );

const pause = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    //@ts-ignore
    UIManager.CSJTJVideoManager.Commands.pause.toString(), // we are calling the 'create' command
    [viewId],
  );

type RecommandProps = {
  dpstart: boolean;
  history: any[];
};
export type RecommandRef = {
  resume: () => void;
  pause: () => void;
};

let timer: any;
export default React.forwardRef(
  (props: RecommandProps, ref: Ref<RecommandRef>) => {
    const videorRef = useRef(null);
    const recommandModalRef = useRef<RecommandModalRef>(null);
    const [video, setVideo] = useState<any>({});
    const [showButton, setShowButton] = useState(false);
    const [follow, setFollow] = useState(false);
    const nav = useNavigator();

    useImperativeHandle(ref, () => ({
      resume: () => {
        resume(findNodeHandle(videorRef.current));
      },
      pause: () => {
        pause(findNodeHandle(videorRef.current));
      },
    }));

    useEffect(() => {
      const onSplashAdShow = TTAdSdk.addListener('onSplashAdShow', () => {
        pause(findNodeHandle(videorRef.current));
      });
      const onSplashAdClose = TTAdSdk.addListener('onSplashAdClose', () => {
        resume(findNodeHandle(videorRef.current));
      });
      const onSplashAdClick = TTAdSdk.addListener('onSplashAdClick', () => {
        resume(findNodeHandle(videorRef.current));
      });
      return () => {
        onSplashAdShow?.remove();
        onSplashAdClose?.remove();
        onSplashAdClick?.remove();
      };
    }, []);

    useEffect(() => {
      if (props.dpstart) {
        const viewId = findNodeHandle(videorRef.current);
        if (viewId) {
          createFragment(viewId!);
          checkHistory();
        }
      }
    }, [props.dpstart]);

    const checkFollow = async (data: any) => {
      // 判断是否追剧
      const f = await historyAction.followExists({id: data.drama_id});
      setFollow(f);
    };

    const onFollow = async () => {
      const f = await historyAction.addFollow({
        id: video.drama_id,
        index: video.index,
        duration: 0,
      });
      checkFollow(video);
      if (f) {
        Toast.show('添加追剧成功');
      } else {
        Toast.show('取消追剧成功');
      }
    };

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {},
        onPanResponderRelease: () => {},
      }),
    ).current;

    const play = () => {
      nav.push('Play', {
        id: video.drama_id,
        index: video.index,
        from: 'recommand',
      });
    };

    const checkHistory = () => {
      if (
        props.history?.length > 0 &&
        props.history[0].index < props.history[0].total
      ) {
        recommandModalRef.current?.show(props.history[0]);
      }
    };
    return (
      <View style={{flex: 1}}>
        <CSJTJVideoManager
          ref={videorRef}
          {...panResponder.panHandlers}
          style={{
            height: PixelRatio.getPixelSizeForLayoutSize(
              Dimensions.get('screen').height - 48,
            ),
            // converts dpi to px, provide desired width
            width: PixelRatio.getPixelSizeForLayoutSize(
              Dimensions.get('screen').width,
            ),
          }}
          onDPVideoPlay={(data: any) => {
            timer && clearTimeout(timer);
            setShowButton(false);
            setFollow(false);
            setVideo(data.nativeEvent);
            timer = setTimeout(() => setShowButton(true), 5000);
            checkFollow(data.nativeEvent);
          }}
        />
        {video?.drama_id && (
          <View style={styles.videoBottom} pointerEvents="box-none">
            <View style={styles.videoInfo} pointerEvents="box-none">
              <View pointerEvents="none">
                <Text style={styles.videoTitle} selectable={false}>
                  {video.title}
                </Text>
                <Text
                  style={styles.videoDesc}
                  numberOfLines={2}
                  selectable={false}>
                  {video.desc?.substring(0, 30)}...
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('@/public/images/sy-js.png')} />
                <Text
                  style={styles.videoCount}
                  onPress={() => play()}
                  selectable={false}>
                  第{video.index}集 | 共{video.total}集 {'>'}
                </Text>
              </View>
            </View>
            <VideoAction
              videoInfo={video}
              showButton={showButton}
              follow={follow}
              onClickAdd={onFollow}
              onClickShare={() => {
                Share.shareWX(
                  video.title,
                  video.desc,
                  video.cover_image,
                  `${config.ShareLink}?id=${video.id}&index=${video.index}`,
                );
              }}
              onClickNext={() => play()}
            />
          </View>
        )}
        <RecommandModal
          ref={recommandModalRef}
          onPress={(data: any) => {
            nav.push('Play', {id: data.id, index: data.index});
            recommandModalRef.current?.hide();
          }}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  videoBottom: {
    position: 'absolute',
    zIndex: 9,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    bottom: Screen.calc(50),
  },
  videoInfo: {
    flex: 1,
    marginLeft: Screen.calc(20),
  },
  videoTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Screen.calc(18),
  },
  videoDesc: {
    color: '#fff',
    lineHeight: Screen.calc(19),
    marginTop: Screen.calc(12),
    fontSize: Screen.calc(14),
    marginBottom: Screen.calc(18),
    marginRight: Screen.calc(10),
  },
  videoCount: {
    color: '#fff',
    fontSize: Screen.calc(14),
    marginLeft: Screen.calc(5),
  },
});
