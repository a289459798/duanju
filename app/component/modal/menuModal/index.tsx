import React, {Ref, useImperativeHandle, useRef} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import {Divider, Text} from '@/component';
import screen from '@/utils/screen';

import Modal, {ModalProps, ModalRef} from '../';

export interface MenuProps extends ModalProps {
  //   onSuccess: ({}) => void;
  //   onError: (err: string) => void;
  menu: MenuType[];
}

type MenuType = {
  title: string;
  onPress: () => void;
  icon?: React.ReactElement;
};

export default React.forwardRef((props: MenuProps, ref: Ref<ModalRef>) => {
  useImperativeHandle(ref, () => ({
    show: () => modalRef.current?.show(),
    hide: () => modalRef.current?.hide(),
  }));

  const modalRef = useRef<ModalRef>(null);
  return (
    <Modal ref={modalRef} {...props} style={[styles.container, props.style]}>
      {props.menu.map((v, k) => (
        <TouchableWithoutFeedback key={k} onPress={v.onPress}>
          <View>
            <View style={styles.menuView}>
              <Text style={styles.titleStyle}>{v.title}</Text>
              {v.icon}
            </View>
            {k < props.menu.length - 1 && (
              <Divider style={{marginVertical: screen.calc(10)}} />
            )}
          </View>
        </TouchableWithoutFeedback>
      ))}
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: screen.calc(8),
    paddingHorizontal: screen.calc(10),
    paddingVertical: screen.calc(10),
    position: 'absolute',
    minWidth: screen.calc(150),
  },
  menuView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyle: {},
});
