import {CheckBox, CheckBoxProps} from '@rneui/themed';
import React from 'react';

import {IconSuccess} from '@/public/iconfont';

export default (props: CheckBoxProps | any) => {
  return (
    <CheckBox
      checkedIcon={<IconSuccess color={'#0abb56'} />}
      uncheckedIcon={<IconSuccess />}
      containerStyle={{
        padding: 0,
        marginRight: 0,
        marginLeft: 0,
      }}
      {...props}
    />
  );
};
