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
  StatusBar,
  PixelRatio,
  StyleSheet,
  PanResponder,
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

type RecommandProps = {
  dpstart: boolean;
  history: any[];
};
export type RecommandRef = {
  resume: () => void;
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
        setTimeout(() => {
          const viewId = findNodeHandle(videorRef.current);
          if (viewId) {
            resume(viewId!);
          }
        }, 1000);
      },
    }));

    useEffect(() => {
      if (props.dpstart) {
        const viewId = findNodeHandle(videorRef.current);
        if (viewId) {
          createFragment(viewId!);
        }
      }
    }, [props.dpstart]);

    const checkFollow = async (data: any) => {
      // 判断是否追剧
      const f = await historyAction.followExists({id: data.drama_id});
      setFollow(f);
    };

    const onFollow = async () => {
      await historyAction.addFollow({
        id: video.drama_id,
        index: video.index,
        duration: 0,
      });
      checkFollow(video);
    };

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {},
        onPanResponderRelease: () => {},
      }),
    ).current;

    const play = () => {
      nav.push('Play', {id: video.drama_id, index: video.index});
    };

    const checkHistory = (data: any) => {
      for (let i = 0; i < props.history?.length; i++) {
        if (props.history[i].id === data.drama_id) {
          if (props.history[i].index > 1) {
            data.index = props.history[i].index;
            recommandModalRef.current?.show(data);
          }
          break;
        }
      }
    };
    return (
      <View style={{flex: 1}}>
        <CSJTJVideoManager
          ref={videorRef}
          {...panResponder.panHandlers}
          style={{
            height: PixelRatio.getPixelSizeForLayoutSize(
              Screen.height - (StatusBar.currentHeight || 0),
            ),
            // converts dpi to px, provide desired width
            width: PixelRatio.getPixelSizeForLayoutSize(Screen.width),
          }}
          onDPVideoPlay={(data: any) => {
            timer && clearTimeout(timer);
            setShowButton(false);
            setFollow(false);
            setVideo(data.nativeEvent);
            checkHistory(data.nativeEvent);
            timer = setTimeout(() => setShowButton(true), 5000);
            checkFollow(data.nativeEvent);
          }}
        />
        {video?.drama_id && (
          <View style={styles.videoBottom} pointerEvents="box-none">
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle} onPress={() => play()}>
                {video.title}
              </Text>
              <Text
                style={styles.videoDesc}
                numberOfLines={2}
                onPress={() => play()}>
                {video.desc}
              </Text>
              <Text style={styles.videoCount} onPress={() => play()}>
                第{video.index}集 | 共{video.total}集 {'>'}
              </Text>
            </View>
            <VideoAction
              videoInfo={video}
              showButton={showButton}
              follow={follow}
              onClickAdd={onFollow}
              onClickShare={() => {
                console.log('onClickShare');
              }}
              onClickNext={() => play()}
            />
          </View>
        )}
        <RecommandModal
          ref={recommandModalRef}
          onPress={(data: any) =>
            nav.push('Play', {id: data.drama_id, index: data.index})
          }
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
  },
  videoCount: {
    color: '#fff',
    fontSize: Screen.calc(14),
  },
});
