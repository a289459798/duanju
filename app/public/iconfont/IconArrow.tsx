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

let IconArrow: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M398.933333 98.133333c-17.066667-17.066667-46.933333-19.2-66.133333-2.13333299-19.2 17.066667-21.333333 44.8-4.266667 63.99999999l4.266667 4.266667L676.266667 512 330.666667 857.6c-17.066667 17.066667-19.2 44.8-4.266667 64l4.266667 4.266667c17.066667 17.066667 44.8 19.2 64 4.266666l4.266666-4.266666 379.733334-379.733334c17.066667-17.066667 19.2-44.8 4.266666-64l-4.266666-4.266666-379.733334-379.733334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconArrow.defaultProps = {
  size: 18,
};

IconArrow = React.memo ? React.memo(IconArrow) : IconArrow;

export default IconArrow;
