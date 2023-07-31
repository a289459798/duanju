import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {Button, Text} from '@/component';
import {CreatePage, Screen} from '@/utils';
import screen from '@/utils/screen';
import {Share} from 'react-native-umshare';
import Toast from '@attacks/react-native-toast';
import userAction from 'action/userAction';
import useNavigator from 'hooks/useNavigator';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';

const Page = CreatePage({
  navigationProps: () => ({
    title: '微信授权登录',
  }),
  Component: (props: any) => {
    const [loading, setLoading] = useState(false);
    const nav = useNavigator();
    console.log(props);
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('@/public/images/sq-logo.png')}
        />
        <Button
          title={'微信授权登录'}
          titleStyle={{fontSize: Screen.calc(16)}}
          style={styles.button}
          containerStyle={{marginTop: Screen.calc(112)}}
          loading={loading}
          onPress={async () => {
            setLoading(true);
            try {
              const info: any = await Share.loginWX();
              // 登录
              props.dispatch(
                userAction.login({
                  onSuccess: () => {
                    nav.pop();
                  },
                  onComplete: () => {
                    setLoading(false);
                  },
                  openId: info.openid,
                  unionId: info.unionid,
                  nickname: info.originalResponse.nickname,
                  avatar: info.originalResponse.headimgurl,
                  androidId: DeviceInfo.getAndroidIdSync(),
                }),
              );
            } catch (e) {
              setLoading(false);
              Toast.show('登录失败');
            }
          }}
        />
        <Text
          style={{
            color: '#999',
            fontSize: screen.calc(14),
            textAlign: 'center',
            marginTop: Screen.calc(28),
            lineHeight: Screen.calc(24),
          }}>
          为了您的账户安全，且管理方便{'\n'}我们选择微信登录
        </Text>
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
    alignItems: 'center',
    paddingTop: Screen.calc(112),
  },
  image: {},
  button: {
    width: Screen.calc(188),
    height: Screen.calc(50),
    backgroundColor: '#57BE6B',
    borderRadius: Screen.calc(6),
  },
});
