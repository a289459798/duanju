import React, {Ref, useImperativeHandle, useState} from 'react';
import {useRef} from 'react';
import {BackHandler, Linking} from 'react-native';

import {ModalRef} from '../';
import ConfirmModal from '../confirm';

export type UpdateModalRef = {
  show: (data: any) => void;
};

export default React.forwardRef((props, ref: Ref<UpdateModalRef>) => {
  const [data, setData] = useState({
    force: false,
    url: '',
  });

  useImperativeHandle(ref, () => ({
    show(d: any) {
      setData(d);
      modalRef?.current?.show();
    },
  }));

  const modalRef = useRef<ModalRef>(null);

  return (
    <ConfirmModal
      ref={modalRef}
      title="更新提示"
      content={
        data.force ? '请更新到新版本，才可使用' : '检查到新版本，是否更新？'
      }
      onCancel={() => {
        if (data.force) {
          BackHandler.exitApp();
        } else {
          modalRef?.current?.hide();
        }
      }}
      onPress={() => {
        Linking.openURL(data.url);
        modalRef.current?.hide();
      }}
    />
  );
});
