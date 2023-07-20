import React, {useRef, useEffect, useCallback} from 'react';
import {View, UIManager, findNodeHandle, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Text, ListView} from '@/component';
import {CreatePage, Screen} from '@/utils';
import {CSJVideoManager} from '@/briage/view';
import {TTAdSdk} from 'briage/module';

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

    const _onViewableItemsChanged = useCallback((aaa: any) => {
      // 这个方法为了让state对应当前呈现在页面上的item的播放器的state
      // 也就是只会有一个播放器播放，而不会每个item都播放
      // 可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
      // 只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
      //       if (viewableItems.length === 1) {
      //         // setCurrentItem(viewableItems[0].index);
      //       }
      console.log('aaa', aaa);
      //       const viewId = findNodeHandle(ref.current);
      //       createFragment(viewId!);

      if (aaa?.viewableItems[0]?.index === 1) {
        TTAdSdk.loadAd(
          () => {
            console.log('广告加载成功');
            TTAdSdk.showAd();
          },
          (code: number, error: string) => {
            console.log('广告加载失败:', code, error);
          },
        );
      }
    }, []);

    const loadMore = useCallback(() => {
      console.log('loadMore');
    }, []);

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

    return (
      <View>
        <ListView
          data={[1, 2, 3, 4, 5]}
          getItemLayout={(item, index) => {
            return {
              length: Screen.height + (StatusBar.currentHeight || 0),
              offset: (Screen.height + (StatusBar.currentHeight || 0)) * index,
              index,
            };
          }}
          pagingEnabled={true}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 80,
          }}
          onViewableItemsChanged={_onViewableItemsChanged}
          onLoadMore={loadMore}
          hasMore={true}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: item % 2 === 0 ? 'red' : 'green',
                alignItems: 'center',
                justifyContent: 'center',
                height: Screen.height + (StatusBar.currentHeight || 0),
              }}>
              <Text>{item}</Text>
              <CSJVideoManager
                ref={ref}
                id={'1234'}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          )}
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
