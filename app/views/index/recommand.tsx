import React, {useRef, useEffect, useCallback, useState} from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  StatusBar,
  PixelRatio,
} from 'react-native';
import {connect} from 'react-redux';
import {Text, ListView} from '@/component';
import {CreatePage, Screen} from '@/utils';
import {CSJVideoManager} from '@/briage/view';
import {DPSdk, TTAdSdk} from 'briage/module';
import config from 'config';

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
  Component: (props: any) => {
    const {user} = props;
    console.log('user1', user);
    const ref = useRef(null);
    const [list, setList] = useState<any>([]);

    const fetchList = async (page: number) => {
      const list = await DPSdk.list(page);
      setList(list);
    };

    useEffect(() => {
      fetchList(1);
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

    useEffect(() => {
      if (list[0]) {
        const viewId = findNodeHandle(ref.current);
        createFragment(viewId!);
      }
    }, [list[0]]);

    return (
      <View>
        <CSJVideoManager
          ref={ref}
          style={{
            height: PixelRatio.getPixelSizeForLayoutSize(
              Screen.height + (StatusBar.currentHeight || 0),
            ),
            width: PixelRatio.getPixelSizeForLayoutSize(Screen.width),
          }}
          id={list?.[0]?.id}
          index={list?.[0]?.index}
          config={{
            mode: 'common',
            infiniteScrollEnabled: true,
          }}
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
