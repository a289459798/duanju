import React, {ReactNode, Ref, useImperativeHandle, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';

export type ModalProps = {
  disableBackdrop?: boolean;
  fromBottom?: boolean;
  fromUp?: boolean;
  style?: object;
  children?: ReactNode;
  onModalHide?: () => void;
};

export type ModalRef = {
  show: () => void;
  hide: () => void;
};

export default React.forwardRef((props: ModalProps, ref: Ref<ModalRef>) => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return (
    <Modal
      useNativeDriver={true}
      customBackdrop={
        <TouchableWithoutFeedback
          onPress={() => {
            !props.disableBackdrop && hide();
          }}>
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
      }
      isVisible={visible}
      animationIn={
        props.fromBottom ? 'slideInUp' : props.fromUp ? 'slideInDown' : 'fadeIn'
      }
      onModalHide={() => {
        props.onModalHide?.();
        hide();
      }}
      animationOut={
        props.fromBottom
          ? 'slideOutDown'
          : props.fromUp
          ? 'slideOutUp'
          : 'fadeOut'
      }
      onBackdropPress={() => hide()}
      {...props}>
      {props.children}
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {},

  mask: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0,0.7)',
  },
});
