import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import React, {
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Image} from 'react-native';

import {Text} from '@/component';
import {Screen} from 'utils';
import CustomButton from 'component/custom/customButton';

export type EpisodeRef = {
  show: () => void;
};

export type EpisodeProps = {
  freeSize: number;
  follow: boolean;
  video: any;
  unlock: any;
  isVip: boolean;
  onChoose: (index: number, unlock: boolean) => void;
  onFollow: ({}) => void;
};

export default React.forwardRef((props: EpisodeProps, ref: Ref<EpisodeRef>) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [visiable, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
  }));

  const [list, setList] = useState<any>([]);

  useEffect(() => {
    let l = [];
    for (let i = 0; i < props.video.total; i++) {
      l.push({
        index: i + 1,
        playing: i + 1 === props.video.index,
        unlock: i + 1 <= props.freeSize || props.unlock[i + 1],
      });
    }
    setList(l);
  }, [props]);

  const snapPoints = useMemo(() => ['50%'], []);
  if (!visiable) {
    return null;
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={() => bottomSheetRef.current?.close()}>
        <View style={styles.mask} />
      </TouchableWithoutFeedback>
      <BottomSheet
        containerStyle={styles.container}
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={true}
        onClose={() => setVisible(false)}
        snapPoints={snapPoints}>
        <View style={styles.headerView}>
          <View>
            <Text style={styles.headerTitle}>{props.video?.title}</Text>
            <Text style={styles.statusTitle}>
              {props.video?.status === 0 ? '已完结' : '连载中'} | 共
              {props.video?.total}集
            </Text>
          </View>
          <CustomButton
            title={props.follow ? '取消追剧' : '加入追剧'}
            onPress={() => props.onFollow(props.video)}
            style={{
              backgroundColor: props.follow ? '#fff' : '#FF5501',
              borderColor: props.follow ? '#FF5501' : '#FF5501',
              borderWidth: Screen.calc(1.5),
            }}
            image={
              props.follow
                ? require('@/public/images/xj-qx.png')
                : require('@/public/images/xj-jr.png')
            }
            textStyle={{
              color: props.follow ? '#FF5501' : '#fff',
            }}
          />
        </View>
        <BottomSheetFlatList
          style={styles.listView}
          contentContainerStyle={{paddingBottom: Screen.calc(40)}}
          data={list}
          numColumns={6}
          horizontal={false}
          renderItem={({item, index}: any) => (
            <TouchableWithoutFeedback
              onPress={() => {
                if (!item.playing) {
                  bottomSheetRef.current?.close();
                  props.onChoose(item.index, item.unlock);
                } else {
                  bottomSheetRef.current?.close();
                }
              }}>
              <View style={styles.jsView} key={index}>
                <Text
                  style={[
                    styles.jsText,
                    {color: item.playing ? '#0196FF' : '#111'},
                  ]}>
                  {item.index}
                </Text>
                {item.playing && (
                  <Image
                    style={styles.icon}
                    source={require('@/public/images/xjcd-bf.png')}
                  />
                )}
                {!item.unlock && (
                  <Image
                    style={styles.icon}
                    source={require('@/public/images/xj-suo.png')}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </BottomSheet>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 9999,
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  listView: {
    flex: 1,
    paddingTop: Screen.calc(10),
    paddingHorizontal: Screen.calc(5),
  },
  jsView: {
    width: Screen.calc(50),
    height: Screen.calc(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: Screen.calc(4),
    marginHorizontal: Screen.calc(5),
    marginTop: Screen.calc(10),
  },
  jsText: {
    fontSize: Screen.calc(17),
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Screen.calc(8),
    paddingBottom: Screen.calc(8),
    paddingTop: Screen.calc(10),
  },
  headerTitle: {
    color: '#111',
    fontSize: Screen.calc(17),
  },
  statusTitle: {
    color: '#999',
    fontSize: Screen.calc(13),
    marginTop: Screen.calc(4),
  },
});
