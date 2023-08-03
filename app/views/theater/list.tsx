import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ListView} from '@/component';
import {Screen} from '@/utils';
import {DPSdk} from 'briage/module';
import useNavigator from 'hooks/useNavigator';
import dramaAction from '@/action/dramaAction';
import DramaItem from 'component/custom/dramaItem';

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
        <DramaItem
          video={item}
          showTotal={true}
          onPress={video => {
            nav.push('Play', {id: video.id, index: video.index});
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Screen.calc(10),
  },
});
