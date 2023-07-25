import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, ListView} from '@/component';
import {Screen} from '@/utils';
import {DPSdk} from 'briage/module';
import FastImage from 'react-native-fast-image';

type listType = {
  title: string;
  index: number;
};
export default (props: {category: string}) => {
  const [list, setList] = useState<listType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchList = async (page: number) => {
    setLoading(true);
    const data = await DPSdk.listWithcCategory(props.category, page);
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
      contentContainerStyle={{
        paddingBottom: Screen.calc(100),
      }}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      numColumns={3}
      data={list}
      hasMore={hasMore}
      onLoadMore={() => setPage(page + 1)}
      renderItem={({item}) => (
        <View style={styles.itemView}>
          <FastImage style={styles.itemImage} source={{uri: item.coverImage}} />
          <Text style={styles.titleText} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.lookText}>
            {item.status === 0 ? '已完结' : '未完结'} · 共{item.index}集
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Screen.calc(100),
    paddingHorizontal: Screen.calc(10),
  },
  itemView: {
    width: Screen.calc(110),
    marginTop: Screen.calc(20),
    marginRight: Screen.calc(10),
  },
  itemImage: {
    backgroundColor: '#eee',
    width: Screen.calc(110),
    height: Screen.calc(160),
    borderRadius: Screen.calc(10),
  },
  titleText: {
    color: '#666',
    fontSize: Screen.calc(14),
    fontWeight: '500',
    marginTop: Screen.calc(8),
  },
  lookText: {
    color: '#999',
    fontSize: Screen.calc(11),
  },
});
