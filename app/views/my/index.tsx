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
import Header from '@/component/navigation/header';
import config from '@/config/config';
import useNavigator from '@/hooks/useNavigator';
import {CreatePage} from '@/utils';
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
      <View>
        <Header
          title={''}
          safeAreaHide={true}
          style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
          statusBarProps={{
            barStyle: 'light-content',
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }}
        />
        <ScrollView
          contentContainerStyle={{paddingBottom: screen.calc(20)}}
          style={{
            flex: 1,
            paddingTop: screen.calc(10),
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
                  {user.info ? 'AI代号' : '请先登录'}
                </Text>
                <View style={styles.code}>
                  <Text style={styles.codeText}>{user.info?.code}</Text>
                </View>
              </View>
            </View>
            {user.info?.vip ? (
              <View style={styles.vipView}>
                <LinearGradient
                  style={styles.vipViewTop}
                  colors={['#FFFCF0', '#FFF7DE', '#FFEAA8']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}>
                  <Text style={styles.vipViewTitle}>AI会员</Text>
                  <Text style={styles.vipViewDate}>
                    有效期至 {user.info?.vipExpiry}
                  </Text>
                </LinearGradient>
                <View style={styles.vipViewBuyView}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => checkLogin(() => nav.push('BuyHashRate'))}
                    style={styles.buyView}>
                    <Text style={styles.buyText}>购买算力</Text>
                  </TouchableOpacity>
                  <View style={styles.line} />
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => checkLogin(() => nav.push('BuyVip'))}
                    style={styles.buyView}>
                    <Text style={styles.buyText}>会员续费</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <LinearGradient
                style={styles.noVipView}
                colors={['#C974FF', '#7E99FF']}
                start={{x: 0, y: 0}}
                end={{x: 0.5, y: 1}}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => checkLogin(() => nav.push('BuyHashRate'))}
                  style={styles.buyView}>
                  <Text style={styles.buyText}>购买算力</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => checkLogin(() => nav.push('BuyVip'))}
                  style={styles.buyView}>
                  <Text style={styles.buyText}>会员充值</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}

            <View style={styles.itemView}>
              <Text style={styles.toolsTitle}>常用工具</Text>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => checkLogin(() => nav.push('Message'))}
              style={[styles.itemView, styles.item]}>
              <Text style={styles.itemText}>消息通知</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                nav.push('Protocol', {url: config.agreement, title: '用户协议'})
              }
              style={[styles.itemView, styles.item]}>
              <Text style={styles.itemText}>用户协议</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                nav.push('Protocol', {url: config.privacy, title: '隐私协议'})
              }
              style={[styles.itemView, styles.item]}>
              <Text style={styles.itemText}>隐私协议</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.itemView, styles.item]}
              onPress={() => nav.push('About')}>
              <Text style={styles.itemText}>关于我们</Text>
            </TouchableOpacity>

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
  },
  crown: {
    position: 'absolute',
    right: screen.calc(-4),
    top: screen.calc(-4),
  },
  codeView: {
    marginLeft: screen.calc(12),
    justifyContent: 'center',
  },
  codeTitle: {color: '#fff', fontSize: screen.calc(17), fontWeight: '500'},
  code: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screen.calc(6),
  },
  codeText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: screen.calc(13),
    marginRight: screen.calc(4),
  },
  noVipView: {
    flexDirection: 'row',
    borderRadius: screen.calc(12),
    marginHorizontal: screen.calc(22),
    height: screen.calc(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buyText: {
    color: '#fff',
    fontSize: screen.calc(13),
    marginLeft: screen.calc(3),
  },
  line: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
    height: screen.calc(20),
  },
  vipView: {marginHorizontal: screen.calc(18)},
  vipViewTop: {
    flexDirection: 'row',
    height: screen.calc(40),
    borderTopLeftRadius: screen.calc(22),
    borderTopRightRadius: screen.calc(22),
    borderBottomRightRadius: screen.calc(6),
    borderBottomLeftRadius: screen.calc(6),
    alignItems: 'center',
    paddingHorizontal: screen.calc(12),
  },
  vipViewTitle: {
    color: '#AE4800',
    fontSize: screen.calc(15),
    paddingLeft: screen.calc(6),
    flex: 1,
  },
  vipViewDate: {color: '#AE4800', fontSize: screen.calc(11)},
  vipViewBuyView: {
    flexDirection: 'row',
    backgroundColor: '#1F1763',
    borderBottomRightRadius: screen.calc(12),
    borderBottomLeftRadius: screen.calc(12),
    height: screen.calc(45),
    marginHorizontal: screen.calc(5),
  },
  itemView: {
    borderRadius: screen.calc(12),
    backgroundColor: '#1F1763',
    paddingLeft: screen.calc(16),
    paddingRight: screen.calc(20),
    marginTop: screen.calc(10),
    paddingVertical: screen.calc(12),
    marginHorizontal: screen.calc(22),
  },
  toolsTitle: {
    color: '#fff',
    fontSize: screen.calc(15),
  },
  toolsView: {
    flexDirection: 'row',
    marginTop: screen.calc(22),
  },
  toolsItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: screen.calc(16),
  },
  toolsImage: {
    width: screen.calc(55),
    height: screen.calc(55),
    borderRadius: screen.calc(20),
  },
  toolsText: {
    color: '#fff',
    fontSize: screen.calc(12),
    marginTop: screen.calc(10),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#fff',
    fontSize: screen.calc(15),
  },
  button: {
    width: screen.calc(200),
    alignSelf: 'center',
    marginTop: screen.calc(30),
  },
});
