import {Text, TextProps} from '@rneui/themed';
import * as React from 'react';

interface SMTextProps extends TextProps {
  eventId?: string;
}
export default (props: SMTextProps) => {
  if (!props.onPress && !props.eventId) {
    return (
      <Text
        selectable={true}
        allowFontScaling={false}
        {...props}
        style={[props.style]}>
        {props.children}
      </Text>
    );
  }
  return (
    <Text
      selectable={true}
      allowFontScaling={false}
      {...props}
      style={[props.style]}
      //     onPress={(e) => {
      //         if (props.eventId) {
      //             Analytics.event(props.eventId);
      //         }
      //         props.onPress && props.onPress(e);
      //     }}
    >
      {props.children}
    </Text>
  );
};
