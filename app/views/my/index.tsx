import React, {useEffect, useRef} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

import userAction from '@/action/userAction';
import {Avatar, Button, Text} from '@/component';
import {ModalRef} from '@/component/modal';
import config from '@/config/config';
import useNavigator from '@/hooks/useNavigator';
import {CreatePage, Screen} from '@/utils';
import screen from '@/utils/screen';
import {Image} from '@rneui/themed';

const Page = CreatePage({
  navigationProps: () => ({
    hideSafe: true,
    hideHeader: true,
    statusBar: {translucent: true, backgroundColor: 'transparent'},
  }),
  Component: (props: any) => {
    const nav = useNavigator();
    const {user} = props;
    const logoutRef = useRef<ModalRef>(null);

    const checkLogin = (callback?: () => void) => {
      if (user.info) {
        callback?.();
      } else {
        NativeAppEventEmitter.emit('401');
      }
    };
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {}, []);

    const onRefresh = () => {
      checkLogin(() => {
        setRefreshing(true);
        props.dispatch(
          userAction.userInfo({
            onComplete: () => {
              setRefreshing(false);
            },
          }),
        );
      });
    };

    return (
      <View style={{flex: 1}}>
        <LinearGradient
          style={styles.bg}
          colors={['rgb(242, 209, 178)', 'rgb(242, 248, 247)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.5}}
        />
        <ScrollView
          contentContainerStyle={{paddingBottom: screen.calc(20)}}
          style={{
            flex: 1,
            paddingTop: screen.calc(100),
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
                />
              </View>
              <View style={styles.codeView}>
                <Text onPress={() => checkLogin()} style={styles.codeTitle}>
                  {user.info ? '用户名' : '请先登录'}
                </Text>
                <View style={styles.code}>
                  <Text style={styles.codeText}>ID：{user.info?.code}</Text>
                </View>
              </View>
            </View>
            <View style={styles.vipView}>
              <View>
                <Text
                  style={{
                    fontSize: Screen.calc(14),
                    fontWeight: '500',
                    color: '#333',
                  }}>
                  到期时间：
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: Screen.calc(6),
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      color: '#999',
                      fontSize: Screen.calc(12),
                    }}>
                    开通VIP全场免费无广告
                  </Text>
                </View>
              </View>
              <Button
                isRadius
                containerStyle={{
                  width: Screen.calc(80),
                  height: Screen.calc(36),
                }}
                style={{backgroundColor: 'red'}}
                title={'续费VIP'}
              />
            </View>

            <View style={[styles.menuView, {paddingVertical: Screen.calc(15)}]}>
              <TouchableWithoutFeedback onPress={() => nav.push('Follow')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: Screen.calc(15),
                  }}>
                  <Text style={{fontSize: Screen.calc(14), color: '#333'}}>
                    我的追剧
                  </Text>
                  <Text style={{fontSize: Screen.calc(12), color: '#666'}}>
                    查看全部
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.followView}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, k) => (
                    <View style={styles.followViewItem} key={k}>
                      <Image
                        style={styles.followViewImage}
                        source={{uri: 'aaa'}}
                      />
                      <Text style={styles.followViewTitle}>标题</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.menuView}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => nav.push('Contact')}
                style={[styles.itemView, styles.item]}>
                <Text style={styles.itemText}>联系客服</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.itemView, styles.item]}
                onPress={() => nav.push('About')}>
                <Text style={styles.itemText}>关于</Text>
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
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  user: {
    flexDirection: 'row',
    paddingHorizontal: screen.calc(30),
    marginBottom: screen.calc(15),
  },
  avatar: {
    width: screen.calc(60),
    height: screen.calc(60),
    borderWidth: screen.calc(1),
    borderColor: '#fff',
    borderRadius: screen.calc(30),
    backgroundColor: '#ccc',
  },
  codeView: {
    marginLeft: screen.calc(12),
    justifyContent: 'center',
  },
  codeTitle: {color: '#333', fontSize: screen.calc(17), fontWeight: '500'},
  code: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screen.calc(6),
  },
  codeText: {
    color: '#333',
    fontSize: screen.calc(13),
    marginRight: screen.calc(4),
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
    borderRadius: screen.calc(12),
    marginHorizontal: Screen.calc(15),
    marginTop: Screen.calc(15),
  },
  itemView: {
    borderRadius: screen.calc(12),
    paddingLeft: screen.calc(16),
    paddingRight: screen.calc(20),
    marginTop: screen.calc(10),
    paddingVertical: screen.calc(12),
    marginHorizontal: screen.calc(15),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#333',
    fontSize: screen.calc(15),
  },
  button: {
    width: screen.calc(200),
    alignSelf: 'center',
    marginTop: screen.calc(30),
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
    width: Screen.calc(80),
    height: Screen.calc(100),
    backgroundColor: 'red',
    borderRadius: Screen.calc(8),
  },
  followViewTitle: {
    alignSelf: 'center',
    fontSize: Screen.calc(14),
    marginTop: Screen.calc(4),
  },
});
