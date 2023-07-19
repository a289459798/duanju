import React, {Ref} from 'react';
import {BackHandler, Linking, StyleSheet} from 'react-native';

import {Text} from '@/component';
import config from '@/config/config';
import screen from '@/utils/screen';

import {ModalRef} from '..';
import ConfirmModal from '../confirm';

export type AgreementModalProps = {
  onPress: () => void;
};

export default React.forwardRef(
  (props: AgreementModalProps, ref: Ref<ModalRef>) => {
    return (
      <ConfirmModal
        ref={ref}
        title="服务协议和隐私政策"
        onCancel={() => BackHandler.exitApp()}
        onPress={props.onPress}>
        <Text style={styles.content}>
          请你务必审慎阅读、充分理解“服务协议”和'“隐私政策”各条款，包括但不限于：为了向你提供商品信息、智能推荐等服务，我们需要收集你的设备信息、操作日志、MAC地址、软件安装列表等个人信息。你可以在"设置“中查看、变更、删除个人信息并管理你的授权。你可阅读
          <Text
            style={{color: '#BC7AFF'}}
            onPress={() => {
              Linking.openURL(config.agreement);
            }}>
            《服务协议》
          </Text>
          和
          <Text
            style={{color: '#BC7AFF'}}
            onPress={() => {
              Linking.openURL(config.privacy);
            }}>
            《隐私政策》
          </Text>
          了解详细信息。如你同意，请点击”同意“开始接受我们的服务
        </Text>
      </ConfirmModal>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: screen.calc(14),
    lineHeight: screen.calc(24),
  },
});
