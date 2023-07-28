import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {CreatePage, Screen} from '@/utils';
import {
  PixelRatio,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  View,
  findNodeHandle,
} from 'react-native';
import {CSJVideoManager} from 'briage/view';
import VideoAction from 'component/custom/videoAction';
import {TTAdSdk} from 'briage/module';
import historyAction from 'action/historyAction';
import {useRoute} from '@react-navigation/native';
import useNavigator from 'hooks/useNavigator';
import {IconArrow} from 'public/iconfont';
import Episode, {EpisodeRef} from './episode';
import Toast from '@attacks/react-native-toast';

const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    //@ts-ignore
    UIManager.CSJVideoManager.Commands.create.toString(), // we are calling the 'create' command
    [viewId],
  );

const play = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    //@ts-ignore
    UIManager.CSJVideoManager.Commands.play.toString(), // we are calling the 'create' command
    [viewId],
  );

const Page = CreatePage({
  navigationProps: () => ({
    hideSafe: true,
    hideHeader: true,
    statusBar: {translucent: true, backgroundColor: 'transparent'},
  }),
  Component: () => {
    const ref = useRef(null);
    const [video, setVideo] = useState<any>({});
    const [follow, setFollow] = useState(false);
    const route = useRoute();
    const params: any = route.params;
    const nav = useNavigator();
    const episodeRef = useRef<EpisodeRef>(null);

    const freeSize = 10;
    const unlockSize = 3;
    const isVip = false;

    useEffect(() => {
      const onAdShow = TTAdSdk.addListener('onAdShow', () => {
        console.log('onAdShow');
      });
      const onAdVideoBarClick = TTAdSdk.addListener('onAdVideoBarClick', () => {
        console.log('onAdVideoBarClick');
      });
      const onAdClose = TTAdSdk.addListener('onAdClose', () => {
        console.log('onAdClose');
      });
      const onVideoComplete = TTAdSdk.addListener('onVideoComplete', () => {
        console.log('onVideoComplete');
      });
      const onVideoError = TTAdSdk.addListener('onVideoError', () => {
        console.log('onVideoError');
      });
      const onRewardArrived = TTAdSdk.addListener('onRewardArrived', () => {
        console.log('onRewardArrived');
      });
      const onSkippedVideo = TTAdSdk.addListener('onSkippedVideo', () => {
        console.log('onSkippedVideo');
      });

      const viewId = findNodeHandle(ref.current);
      createFragment(viewId!);

      return () => {
        onAdShow?.remove();
        onAdVideoBarClick?.remove();
        onAdClose?.remove();
        onVideoComplete?.remove();
        onVideoError?.remove();
        onRewardArrived?.remove();
        onSkippedVideo?.remove();
      };
    }, []);

    const checkFollow = async (data: any) => {
      // 判断是否追剧
      const f = await historyAction.followExists({id: data.drama_id});
      setFollow(f);
      if (f) {
        historyAction.updateFollow({
          id: data.drama_id,
          index: data.index,
          duration: 0,
        });
      }
    };

    const onFollow = async () => {
      const f = await historyAction.addFollow({
        id: video.drama_id,
        index: video.index,
        duration: 0,
      });
      checkFollow(video);
      if (f) {
        Toast.show('加入追剧成功');
      } else {
        Toast.show('取消追剧成功');
      }
    };

    const onShowAdIfNeeded = (data: any) => {
      const v = data.nativeEvent;
      console.log('onShowAdIfNeeded', v);
      if (v.index <= freeSize || isVip) {
        // 判断是否已经看过广告
        if (true) {
          play(findNodeHandle(ref.current));
        } else {
        }
      }
    };

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => {
              nav.pop();
            }}>
            <IconArrow
              style={{
                transform: [{rotate: '180deg'}],
              }}
              color={'#fff'}
            />
          </TouchableWithoutFeedback>
        </View>
        <CSJVideoManager
          ref={ref}
          style={{
            height: PixelRatio.getPixelSizeForLayoutSize(
              Screen.height + (StatusBar.currentHeight || 0),
            ),
            // converts dpi to px, provide desired width
            width: PixelRatio.getPixelSizeForLayoutSize(Screen.width),
          }}
          id={parseFloat(params.id)}
          index={params.index || 1}
          currentDuration={params.duration || 0}
          config={{
            mode: 'specific',
            isHideLeftTopTips: true,
            isHideMore: true,
            infiniteScrollEnabled: false,
          }}
          onDPVideoPlay={(data: any) => {
            setFollow(false);
            setVideo(data.nativeEvent);
            checkFollow(data.nativeEvent);
          }}
          onShowAdIfNeeded={onShowAdIfNeeded}
        />
        {video && (
          <View style={styles.videoBottom}>
            <VideoAction
              videoInfo={video}
              showButton={false}
              follow={follow}
              onClickAdd={onFollow}
              onClickShare={() => {
                console.log('onClickShare');
              }}
            />
          </View>
        )}
        {video && (
          <View style={styles.videoInfo} pointerEvents={'box-none'}>
            <Text style={styles.titleText}>
              {video.title} · 正在播第{video.index}集
            </Text>
            <TouchableWithoutFeedback
              onPress={() => episodeRef.current?.show()}>
              <View style={styles.chooseIndex}>
                <Text style={styles.chooseeText}>选集</Text>
                <IconArrow color={'#fff'} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
        <Episode
          ref={episodeRef}
          freeSize={freeSize}
          follow={follow}
          video={video}
          unlock={{}}
          isVip={false}
          onChoose={index => {
            console.log('1111', index);
          }}
          onFollow={onFollow}
        />
      </View>
    );
  },
});

export default connect((state: any) => {
  const {user} = state;
  return {
    user,
  };
})(Page);

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: Screen.calc(10),
    top: (StatusBar.currentHeight || 0) + Screen.calc(10),
    zIndex: 999,
  },
  videoBottom: {
    position: 'absolute',
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    bottom: Screen.calc(100),
    right: 0,
  },
  videoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 5,
    paddingBottom: Screen.calc(40),
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: Screen.calc(12),
    paddingVertical: Screen.calc(15),
  },
  chooseIndex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
    fontSize: Screen.calc(16),
  },
  chooseeText: {
    color: '#fff',
    fontSize: Screen.calc(16),
  },
});
