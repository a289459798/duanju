import React, {Ref, useImperativeHandle, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Text} from '@/component';
import screen from '@/utils/screen';

import Modal, {ModalRef} from '../';

export type ConfirmProps = {
  onPress: () => void;
  onCancel?: () => void;
  title: string;
  children?: any;
  content?: string;
  cancelText?: string;
  confirmText?: string;
};

export default React.forwardRef((props: ConfirmProps, ref: Ref<ModalRef>) => {
  useImperativeHandle(ref, () => ({
    show: () => modalRef.current?.show(),
    hide: () => modalRef.current?.hide(),
  }));

  const modalRef = useRef<ModalRef>(null);
  return (
    <Modal ref={modalRef} disableBackdrop={true}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        {props.content ? (
          <Text style={styles.content}>{props.content}</Text>
        ) : (
          props.children
        )}
        <View style={styles.bottom}>
          <Button
            isRadius
            containerStyle={[styles.button, styles.refuse]}
            style={styles.refuseButton}
            title={props.cancelText || '取消'}
            titleStyle={{color: '#666'}}
            onPress={() => {
              if (props.onCancel) {
                props.onCancel();
              } else {
                modalRef.current?.hide();
              }
            }}
          />
          <Button
            isRadius
            gradient={{colors: ['#BC7AFF', '#7E99FF']}}
            containerStyle={[styles.button]}
            title={props.cancelText || '确定'}
            onPress={props.onPress}
          />
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1B1B27',
    borderRadius: screen.calc(8),
    marginHorizontal: screen.calc(20),
    paddingHorizontal: screen.calc(20),
    paddingVertical: screen.calc(20),
  },
  title: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: screen.calc(18),
    marginBottom: screen.calc(15),
  },
  content: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: screen.calc(14),
    lineHeight: screen.calc(24),
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: screen.calc(20),
  },
  refuse: {
    marginRight: screen.calc(20),
  },
  refuseButton: {
    backgroundColor: '#fff',
  },
  button: {
    width: screen.calc(100),
  },
});
