import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native';
import {Text, ListView} from '@/component';
import {CreatePage, Screen} from '@/utils';
import {connect} from 'react-redux';
import historyAction from 'action/historyAction';
import {DPSdk} from 'briage/module';
import useNavigator from 'hooks/useNavigator';
import FastImage from 'react-native-fast-image';

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
          <TouchableWithoutFeedback
            onPress={() => nav.push('Play', {id: item.id, index: item.index})}>
            <View style={styles.itemView}>
              <View style={styles.itemImageView}>
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
    flex: 1,
    paddingHorizontal: Screen.calc(12),
    paddingTop: Screen.calc(20),
  },
  itemView: {
    marginBottom: Screen.calc(16),
    width: Screen.calc(110),
    marginRight: Screen.calc(10),
  },
  itemImageView: {},
  itemImage: {
    width: Screen.calc(110),
    height: Screen.calc(147),
    borderRadius: Screen.calc(6),
  },
  statusView: {
    position: 'absolute',
    top: Screen.calc(6),
    left: 0,
    zIndex: 9,
  },

  titleText: {
    color: '#222',
    fontSize: Screen.calc(16),
    marginTop: Screen.calc(11),
    lineHeight: Screen.calc(19),
  },
  lookText: {
    color: '#999',
    fontSize: Screen.calc(12),
    lineHeight: Screen.calc(19),
    marginTop: Screen.calc(3),
  },
});
