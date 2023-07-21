import React, {useRef} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

import userAction from '@/action/userAction';
import {Avatar, Button, Text} from '@/component';
import {ModalRef} from '@/component/modal';
import Confirm from '@/component/modal/confirm';
import config from '@/config/config';
import useNavigator from '@/hooks/useNavigator';
import {CreatePage, Screen} from '@/utils';
import screen from '@/utils/screen';

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
              <View style={styles.vipImageView} />
              <View style={styles.vipViewBuyView}>
                <View>
                  <Text
                    style={{
                      fontSize: Screen.calc(14),
                      fontWeight: '500',
                      color: '#333',
                    }}>
                    账户余额
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: Screen.calc(6),
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: Screen.calc(17),
                        fontWeight: '500',
                      }}>
                      0<Text style={{fontSize: Screen.calc(12)}}> 看币</Text>
                    </Text>
                    <Text
                      style={{
                        marginLeft: Screen.calc(30),
                        fontSize: Screen.calc(12),
                        color: 'rgb(242, 209, 178)',
                      }}>
                      查看详情 {'>'}
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
                  title={'充值'}
                />
              </View>
            </View>

            <View style={[styles.menuView, {flexDirection: 'row'}]}>
              <Text style={styles.dataText}>全部在追</Text>
              <View style={styles.line} />
              <Text style={styles.dataText}>历史观看</Text>
              <View style={styles.line} />
              <Text style={styles.dataText}>我的点赞</Text>
            </View>

            <View style={styles.menuView}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  nav.push('Protocol', {
                    url: config.agreement,
                    title: '用户协议',
                  })
                }
                style={[styles.itemView, styles.item]}>
                <Text style={styles.itemText}>联系客服</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  nav.push('Protocol', {url: config.privacy, title: '隐私协议'})
                }
                style={[styles.itemView, styles.item]}>
                <Text style={styles.itemText}>检查更新</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.itemView, styles.item]}
                onPress={() => nav.push('About')}>
                <Text style={styles.itemText}>关于</Text>
              </TouchableOpacity>
            </View>
            {user.info && (
              <Button
                isRadius
                gradient={{colors: ['#BC7AFF', '#7E99FF']}}
                containerStyle={[styles.button]}
                title={'退出登录'}
                onPress={async () => {
                  logoutRef.current?.show();
                }}
              />
            )}
          </>
        </ScrollView>
        <Confirm
          ref={logoutRef}
          title="提示"
          content="确定退出登录吗？"
          onPress={() => {
            props.dispatch(userAction.logout());
            logoutRef.current?.hide();
          }}
        />
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

  vipView: {marginHorizontal: screen.calc(18)},
  vipViewTitle: {
    color: '#AE4800',
    fontSize: screen.calc(15),
    paddingLeft: screen.calc(6),
    flex: 1,
  },
  vipViewDate: {color: '#AE4800', fontSize: screen.calc(11)},
  vipViewBuyView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomRightRadius: screen.calc(12),
    borderBottomLeftRadius: screen.calc(12),
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
  vipImageView: {
    backgroundColor: '#ccc',
    width: '100%',
    height: Screen.calc(50),
    borderTopRightRadius: screen.calc(12),
    borderTopLeftRadius: screen.calc(12),
  },
  dataText: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: Screen.calc(10),
  },
  line: {
    width: StyleSheet.hairlineWidth,
    height: Screen.calc(15),
    backgroundColor: '#ccc',
    alignSelf: 'center',
    color: '#333',
  },
});
