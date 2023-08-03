import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native';
import {Text, ListView} from '@/component';
import {Screen} from '@/utils';
import {DPSdk} from 'briage/module';
import FastImage from 'react-native-fast-image';
import useNavigator from 'hooks/useNavigator';
import dramaAction from '@/action/dramaAction';

type listType = {
  title: string;
  index: number;
};
export default (props: {category: string}) => {
  const [list, setList] = useState<listType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const nav = useNavigator();

  const fetchList = async (page: number) => {
    setLoading(true);
    let data = [];
    if (props.category === '0') {
      data = await DPSdk.list(page, 24);
    } else {
      data = await DPSdk.listWithcCategory(props.category, page);
    }

    if (data.length < 24) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    if (page === 1) {
      setList(data);
    } else {
      let l = list.concat(data);
      setList(l);
    }
    setLoading(false);

    // 同步数据到服务端
    dramaAction.sync(data);
  };

  useEffect(() => {
    fetchList(page);
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, []);
  return (
    <ListView
      loading={loading}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      numColumns={3}
      data={list}
      hasMore={hasMore}
      onLoadMore={() => setPage(page + 1)}
      renderItem={({item}) => (
        <TouchableWithoutFeedback
          onPress={() => nav.push('Play', {id: item.id, index: item.index})}>
          <View style={styles.itemView}>
            <View>
              <FastImage
                style={styles.itemImage}
                source={{uri: item.coverImage}}
              />
              <Image
                style={styles.statusView}
                source={
                  item.status === 0
                    ? require('@/public/images/ls-ywj.png')
                    : require('@/public/images/ls-lzz.png')
                }
              />
            </View>

            <Text style={styles.titleText} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.lookText}>共{item.total}集</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Screen.calc(10),
  },
  itemView: {
    width: Screen.calc(110),
    marginBottom: Screen.calc(17),
    marginRight: Screen.calc(10),
  },
  itemImage: {
    width: Screen.calc(110),
    height: Screen.calc(147),
    borderRadius: Screen.calc(6),
  },
  titleText: {
    color: '#222',
    fontSize: Screen.calc(16),
    marginTop: Screen.calc(10),
    lineHeight: Screen.calc(19),
  },
  lookText: {
    color: '#999',
    fontSize: Screen.calc(12),
    lineHeight: Screen.calc(19),
  },
  statusView: {
    position: 'absolute',
    top: Screen.calc(6),
    left: 0,
    zIndex: 9,
  },
});
