import React, {Ref, useImperativeHandle, useRef, useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {Share} from 'react-native-umshare';

import {Button, Checkbox, Text} from '@/component';
import config from '@/config';
import {IconClose, IconWechat} from '@/public/iconfont';
import screen from '@/utils/screen';

import Modal, {ModalRef} from '../';

export type LoginProps = {
  onSuccess: ({}) => void;
  onError: (err: string) => void;
};

export default React.forwardRef((props: LoginProps, ref: Ref<ModalRef>) => {
  useImperativeHandle(ref, () => ({
    show: () => modalRef.current?.show(),
    hide: () => modalRef.current?.hide(),
  }));

  const [loading, setLoading] = useState(false);
  const modalRef = useRef<ModalRef>(null);
  return (
    <Modal ref={modalRef} disableBackdrop={true}>
      <View style={styles.container}>
        <IconClose
          onPress={() => modalRef.current?.hide()}
          style={{
            position: 'absolute',
            right: screen.calc(10),
            top: screen.calc(10),
          }}
        />
        <View style={styles.titleView}>
          <IconWechat color={'#0abb56'} size={screen.calc(20)} />
          <Text style={styles.title}>微信快捷登录</Text>
        </View>
        <Button
          isRadius
          loading={loading}
          gradient={{colors: ['#BC7AFF', '#7E99FF']}}
          containerStyle={[styles.button]}
          title={'点击登录'}
          onPress={async () => {
            setLoading(true);
            try {
              const info: any = await Share.loginWX();
              await props.onSuccess?.(info);
              setLoading(false);
            } catch (e) {
              props.onError?.('登录失败');
              setLoading(false);
            }
          }}
        />
        <View style={styles.xyView}>
          <Checkbox checked={true} />
          <Text style={styles.content}>
            登录即代表您同意
            <Text
              onPress={() => {
                Linking.openURL(config.agreement);
              }}
              style={styles.xy}>
              用户协议
            </Text>
            和
            <Text
              onPress={() => {
                Linking.openURL(config.privacy);
              }}
              style={styles.xy}>
              隐私协议
            </Text>
          </Text>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: screen.calc(8),
    marginHorizontal: screen.calc(40),
    paddingHorizontal: screen.calc(20),
    paddingVertical: screen.calc(20),
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: screen.calc(20),
  },
  title: {
    color: '#0abb56',
    alignSelf: 'center',
    fontSize: screen.calc(16),
    marginLeft: screen.calc(5),
  },
  content: {
    color: '#333',
    fontSize: screen.calc(12),
    marginLeft: screen.calc(3),
  },
  xyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screen.calc(20),
  },
  xy: {
    color: '#0abb56',
  },
  button: {
    // width: screen.calc(100),
  },
});
