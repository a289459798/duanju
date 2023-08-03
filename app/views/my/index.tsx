import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

import {Avatar, Text} from '@/component';
import useNavigator from '@/hooks/useNavigator';
import {CreatePage, Screen} from '@/utils';
import screen from '@/utils/screen';
import {useNavigation} from '@react-navigation/native';
import historyAction from 'action/historyAction';
import {DPSdk} from 'briage/module';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';

const Page = CreatePage({
  navigationProps: () => ({
    hideSafe: true,
    hideHeader: true,
    statusBar: {translucent: true, backgroundColor: 'transparent'},
  }),
  Component: (props: any) => {
    const nav = useNavigator();
    const {user} = props;
    const navgation = useNavigation();
    const [follow, setFollow] = useState<any>([]);

    const checkLogin = (callback?: () => void) => {
      if (user.info) {
        callback?.();
      } else {
        nav.push('Login');
      }
    };
    const [refreshing, setRefreshing] = React.useState(false);

    const getFollow = async () => {
      const fl: any = await historyAction.getFollow(8);
      if (fl?.length > 0) {
        let ids = [];
        let followMap: any = {};
        for (let i = 0; i < fl?.length; i++) {
          ids.push(fl[i].id);
          followMap[fl[i].id] = fl[i];
        }
        let list = await DPSdk.listWithIds(ids);
        for (let i = 0; i < list?.length; i++) {
          list[i].index = followMap[list[i].id].current;
        }
        setFollow(list);
      }
    };

    useEffect(() => {
      navgation.addListener('focus', getFollow);
      return () => {
        navgation.removeListener('focus', () => {});
      };
    }, []);

    const onRefresh = async () => {
      setRefreshing(true);
      await getFollow();
      setRefreshing(false);
    };

    return (
      <View style={{flex: 1}}>
        <LinearGradient
          style={styles.bg}
          colors={['#FF6701', '#FF6701']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.5}}
        />
        <ScrollView
          contentContainerStyle={{paddingBottom: screen.calc(20)}}
          style={{
            flex: 1,
            paddingTop: screen.calc(60),
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={'#fff'}
            />
          }>
          <>
            <View style={styles.user}>
              <View>
                <Avatar
                  onPress={() => checkLogin()}
                  rounded
                  containerStyle={styles.avatar}
                  avatarStyle={{borderRadius: screen.calc(28)}}
                  source={
                    user.info?.avatar
                      ? {uri: user.info?.avatar}
                      : require('@/public/images/wd-tx.png')
                  }
                />
              </View>
              <View style={styles.codeView}>
                <Text onPress={() => checkLogin()} style={styles.codeTitle}>
                  {user.info ? user.info.nickname : '点击登录'}
                </Text>
                <View style={styles.code}>
                  <Text style={styles.codeText}>
                    ID：{DeviceInfo.getAndroidIdSync()}
                  </Text>
                </View>
              </View>
            </View>

            {follow?.length > 0 && (
              <View
                style={[styles.menuView, {paddingVertical: Screen.calc(15)}]}>
                <TouchableWithoutFeedback onPress={() => nav.push('Follow')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: Screen.calc(15),
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image source={require('@/public/images/wd-wdzj.png')} />
                      <Text
                        style={{
                          fontSize: Screen.calc(18),
                          color: '#222',
                          fontWeight: '500',
                          marginLeft: Screen.calc(6),
                        }}>
                        我的追剧
                      </Text>
                    </View>
                    <Text style={{fontSize: Screen.calc(15), color: '#999'}}>
                      查看全部
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.followView}>
                    {follow?.map((v: any, k: any) => (
                      <TouchableWithoutFeedback
                        key={k}
                        onPress={() =>
                          nav.push('Play', {id: v.id, index: v.index})
                        }>
                        <View style={styles.followViewItem}>
                          <FastImage
                            style={styles.followViewImage}
                            source={{uri: v.coverImage}}
                          />
                          <Text
                            numberOfLines={1}
                            style={styles.followViewTitle}>
                            {v.title}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

            <View style={styles.menuView}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => nav.push('Contact')}
                style={[styles.itemView, styles.itemBottom]}>
                <Text style={styles.itemText}>联系客服</Text>
                <Image source={require('@/public/images/wd-jt.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.itemView]}
                onPress={() => nav.push('About')}>
                <Text style={styles.itemText}>关于</Text>
                <Image source={require('@/public/images/wd-jt.png')} />
              </TouchableOpacity>
            </View>
          </>
        </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Screen.calc(140),
    zIndex: -1,
  },
  user: {
    flexDirection: 'row',
    paddingHorizontal: screen.calc(30),
    marginBottom: screen.calc(15),
  },
  avatar: {
    width: screen.calc(56),
    height: screen.calc(56),
  },
  codeView: {
    marginLeft: screen.calc(11),
    justifyContent: 'center',
  },
  codeTitle: {color: '#fff', fontSize: screen.calc(18), fontWeight: '500'},
  code: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screen.calc(6),
  },
  codeText: {
    color: '#fff',
    fontSize: screen.calc(15),
  },

  vipView: {
    marginHorizontal: screen.calc(18),
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: screen.calc(12),
    paddingHorizontal: Screen.calc(20),
    justifyContent: 'space-between',
    paddingVertical: Screen.calc(15),
  },

  menuView: {
    backgroundColor: '#fff',
    marginBottom: Screen.calc(10),
  },
  itemView: {
    marginHorizontal: screen.calc(12),
    paddingVertical: screen.calc(23),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D1D1D1',
  },
  itemText: {
    color: '#333',
    fontSize: screen.calc(17),
  },
  followView: {
    flexDirection: 'row',
    paddingLeft: Screen.calc(15),
  },
  followViewItem: {
    marginTop: Screen.calc(15),
    width: Screen.calc(80),
    marginRight: Screen.calc(15),
  },
  followViewImage: {
    width: Screen.calc(90),
    height: Screen.calc(120),
    borderRadius: Screen.calc(6),
  },
  followViewTitle: {
    alignSelf: 'center',
    fontSize: Screen.calc(15),
    marginTop: Screen.calc(4),
    color: '#222',
  },
});
