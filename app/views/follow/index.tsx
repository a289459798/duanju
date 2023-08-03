import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ListView} from '@/component';
import {CreatePage, Screen} from '@/utils';
import {connect} from 'react-redux';
import historyAction from 'action/historyAction';
import {DPSdk} from 'briage/module';
import useNavigator from 'hooks/useNavigator';
import DramaItem from 'component/custom/dramaItem';

type listType = {
  title: string;
  index: number;
};
const Page = CreatePage({
  navigationProps: () => ({
    title: '我的追剧',
  }),
  Component: () => {
    const [list, setList] = useState<listType[]>([]);
    const nav = useNavigator();

    const getFollow = async () => {
      const fl: any = await historyAction.getFollow(100);
      if (fl?.length > 0) {
        let ids = [];
        let followMap: any = {};
        for (let i = 0; i < fl?.length; i++) {
          ids.push(fl[i].id);
          followMap[fl[i].id] = fl[i];
        }
        let tmp = await DPSdk.listWithIds(ids);
        for (let i = 0; i < tmp?.length; i++) {
          tmp[i].index = followMap[tmp[i].id].current;
        }
        setList(tmp);
      }
    };

    useEffect(() => {
      getFollow();
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
