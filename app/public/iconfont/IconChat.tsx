/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconChat: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M891.733333 840.533333l-32-32c-6.4-6.4-14.933333-10.666667-25.6-10.666666H420.266667c-57.6 0-102.4-46.933333-102.4-102.4v-57.6h288c96 0 172.8-76.8 172.8-172.8V362.666667h10.666666c57.6 0 102.4 46.933333 102.4 102.4v375.466666z m-704-270.933333c-8.533333 0-19.2 4.266667-25.6 10.666667l-32 32V236.8c0-57.6 46.933333-102.4 102.4-102.4h366.933334c57.6 0 102.4 46.933333 102.4 102.4v230.4c0 57.6-46.933333 102.4-102.4 102.4H187.733333z m599.466667-275.2h-10.666667v-57.6c0-96-76.8-172.8-172.8-172.8H236.8C140.8 64 64 140.8 64 236.8v458.666667c0 14.933333 8.533333 25.6 21.333333 32 12.8 4.266667 27.733333 2.133333 38.4-8.533334l78.933334-81.066666h44.8v57.6c0 96 76.8 172.8 172.8 172.8h401.066666l78.933334 81.066666c10.666667 10.666667 25.6 12.8 38.4 8.533334 12.8-4.266667 21.333333-17.066667 21.333333-32V465.066667c0-93.866667-76.8-170.666667-172.8-170.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconChat.defaultProps = {
  size: 18,
};

IconChat = React.memo ? React.memo(IconChat) : IconChat;

export default IconChat;
