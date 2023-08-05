import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ListView} from '@/component';
import {CreatePage, Screen} from '@/utils';
import {connect} from 'react-redux';
import {DPSdk} from 'briage/module';
import useNavigator from 'hooks/useNavigator';
import DramaItem from 'component/custom/dramaItem';
import dramaAction from 'action/dramaAction';

type listType = {
  title: string;
  index: number;
};
const Page = CreatePage({
  navigationProps: () => ({
    title: '热门短剧',
  }),
  Component: () => {
    const [list, setList] = useState<listType[]>([]);
    const nav = useNavigator();

    const getHot = async () => {
      const fl: any = await dramaAction.hotList({offset: 1, limit: 100});
      if (fl?.total > 0) {
        let ids = [];
        for (let i = 0; i < fl?.list?.length; i++) {
          ids.push(fl.list[i].id);
        }
        let tmp = await DPSdk.listWithIds(ids);
        setList(tmp);
      }
    };

    useEffect(() => {
      getHot();
    }, []);
    return (
      <ListView
        style={styles.container}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
        }}
        data={list}
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
  },
});

export default connect((state: any) => {
  const {user} = state;
  return {
    user,
  };
})(Page);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Screen.calc(12),
    paddingTop: Screen.calc(20),
  },
});
