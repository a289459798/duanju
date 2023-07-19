import {Input, InputProps} from '@rneui/themed';
import React, {Ref} from 'react';
import {TextInput} from 'react-native';

export default React.forwardRef((props: InputProps, ref: Ref<TextInput>) => {
  return (
    <Input
      ref={ref}
      underlineColorAndroid={'transparent'}
      {...props}
      inputContainerStyle={[{borderBottomWidth: 0}, props.inputContainerStyle]}
    />
  );
});
