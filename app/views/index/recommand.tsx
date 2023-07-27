import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  StatusBar,
  PixelRatio,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text} from '@/component';
import {Screen} from '@/utils';
import {CSJTJVideoManager} from '@/briage/view';
import VideoAction from '@/component/custom/videoAction';
import historyAction from 'action/historyAction';
import useNavigator from 'hooks/useNavigator';

const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    //@ts-ignore
    UIManager.CSJTJVideoManager.Commands.create.toString(), // we are calling the 'create' command
    [viewId],
  );

export default () => {
  const ref = useRef(null);
  const [video, setVideo] = useState<any>({});
  const [showButton, setShowButton] = useState(false);
  const [follow, setFollow] = useState(false);
  const nav = useNavigator();

  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    if (viewId) {
      createFragment(viewId!);
    }
  }, []);

  let timer: any;

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

  return (
    <View style={{flex: 1}}>
      <CSJTJVideoManager
        ref={ref}
        style={{
          height: PixelRatio.getPixelSizeForLayoutSize(
            Screen.height + (StatusBar.currentHeight || 0),
          ),
          // converts dpi to px, provide desired width
          width: PixelRatio.getPixelSizeForLayoutSize(Screen.width),
        }}
        onDPVideoPlay={(data: any) => {
          console.log('onDPVideoPlay');
          timer && clearTimeout(timer);
          setShowButton(false);
          setFollow(false);
          setVideo(data.nativeEvent);
          timer = setTimeout(() => setShowButton(true), 5000);
          checkFollow(data.nativeEvent);
        }}
      />
      {video?.drama_id && (
        <TouchableWithoutFeedback
          onPress={() => {
            nav.push('Play', {id: video.drama_id, index: video.index});
          }}>
          <View style={styles.videoBottom}>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.videoDesc} numberOfLines={2}>
                {video.desc}
              </Text>
              <Text style={styles.videoCount}>
                第{video.index}集 · 共{video.total}集
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
              onClickNext={() => {
                console.log('onClickNext');
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  videoBottom: {
    position: 'absolute',
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    bottom: Screen.calc(40),
  },
  videoInfo: {
    flex: 1,
    marginLeft: Screen.calc(20),
  },
  videoTitle: {
    color: '#fff',
  },
  videoDesc: {
    color: 'rgba(255, 255,255, 0.5)',
    lineHeight: Screen.calc(20),
    marginVertical: Screen.calc(5),
  },
  videoCount: {
    color: '#fff',
  },
});
