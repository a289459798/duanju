import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {CreatePage, Screen} from '@/utils';
import {
  PixelRatio,
  StatusBar,
  StyleSheet,
  UIManager,
  View,
  findNodeHandle,
} from 'react-native';
import {CSJVideoManager} from 'briage/view';
import VideoAction from 'component/custom/videoAction';
import {TTAdSdk} from 'briage/module';
import historyAction from 'action/historyAction';
import {useRoute} from '@react-navigation/native';

const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    //@ts-ignore
    UIManager.CSJVideoManager.Commands.create.toString(), // we are calling the 'create' command
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
    console.log('params', params);

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
      await historyAction.addFollow({
        id: video.drama_id,
        index: video.index,
        duration: 0,
      });
      checkFollow(video);
    };

    return (
      <View style={{flex: 1}}>
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
            mode: 'common',
            isHideLeftTopTips: true,
            isHideMore: true,
            infiniteScrollEnabled: false,
          }}
          onDPVideoPlay={(data: any) => {
            setFollow(false);
            setVideo(data.nativeEvent);
            checkFollow(data.nativeEvent);
          }}
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
  videoBottom: {
    position: 'absolute',
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    bottom: Screen.calc(100),
    right: 0,
  },
});