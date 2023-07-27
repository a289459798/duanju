import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Text, ListView} from '@/component';
import {CreatePage, Screen} from '@/utils';
import {connect} from 'react-redux';
import historyAction from 'action/historyAction';
import {DPSdk} from 'briage/module';
import {Image} from '@rneui/themed';
import useNavigator from 'hooks/useNavigator';

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
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        data={list}
        renderItem={({item}) => (
          <TouchableWithoutFeedback
            onPress={() => nav.push('Play', {id: item.id, index: item.index})}>
            <View style={styles.itemView}>
              <View style={styles.itemImageView}>
                <Image
                  style={styles.itemImage}
                  source={{uri: item.coverImage}}
                />
                <View style={styles.statusView}>
                  <Text style={styles.statusText}>已完结</Text>
                </View>
              </View>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.lookText}>观看到第{item.index}集</Text>
            </View>
          </TouchableWithoutFeedback>
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
    backgroundColor: 'rgb(65, 65, 65)',
    paddingHorizontal: Screen.calc(10),
  },
  itemView: {flex: 1, marginTop: Screen.calc(20)},
  itemImageView: {
    width: Screen.calc(160),
  },
  itemImage: {
    width: Screen.calc(160),
    height: Screen.calc(220),
    borderRadius: Screen.calc(10),
  },
  statusView: {
    position: 'absolute',
    bottom: Screen.calc(5),
    right: Screen.calc(5),
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: Screen.calc(4),
    paddingHorizontal: Screen.calc(5),
    paddingVertical: Screen.calc(2),
  },
  statusText: {
    color: '#fff',
    fontSize: Screen.calc(10),
  },
  titleText: {
    color: '#fff',
    fontSize: Screen.calc(14),
    fontWeight: '500',
    marginTop: Screen.calc(8),
  },
  lookText: {
    color: '#aaa',
    fontSize: Screen.calc(11),
  },
});
