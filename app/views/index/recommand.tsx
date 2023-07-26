import React, {useRef, useEffect, useCallback, useState} from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  StatusBar,
  PixelRatio,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {Text, ListView} from '@/component';
import {CreatePage, Screen} from '@/utils';
import {CSJVideoManager, CSJTJVideoManager} from '@/briage/view';
import {DPSdk, TTAdSdk} from 'briage/module';
import config from 'config';
import VideoAction from '@/component/custom/videoAction';

const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    //@ts-ignore
    UIManager.CSJTJVideoManager.Commands.create.toString(), // we are calling the 'create' command
    [viewId],
  );

const Page = CreatePage({
  navigationProps: () => ({
    hideSafe: true,
    hideHeader: true,
    statusBar: {translucent: true, backgroundColor: 'transparent'},
  }),
  Component: (props: any) => {
    const {user} = props;
    console.log('user1', user);
    const ref = useRef(null);
    const [video, setVideo] = useState<any>({});
    const [showButton, setShowButton] = useState(false);

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

    let timer: any;

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
            timer && clearTimeout(timer);
            setShowButton(false);
            setVideo(data.nativeEvent);
            timer = setTimeout(() => setShowButton(true), 5000);
          }}
        />
        {video?.drama_id && (
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('click');
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
                onClickAdd={() => {
                  console.log('onClickAdd');
                }}
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
