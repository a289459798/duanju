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

let IconArrowDown: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M925.866667 398.933333c17.066667-17.066667 19.2-46.933333 2.133333-66.133333-17.066667-19.2-44.8-21.333333-64-4.266667l-4.266667 4.266667L512 676.266667 166.4 330.666667c-17.066667-17.066667-44.8-19.2-64-4.266667l-4.266667 4.266667c-17.066667 17.066667-19.2 44.8-4.266666 64l4.266666 4.266666 379.733334 379.733334c17.066667 17.066667 44.8 19.2 64 4.266666l4.266666-4.266666 379.733334-379.733334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconArrowDown.defaultProps = {
  size: 18,
};

IconArrowDown = React.memo ? React.memo(IconArrowDown) : IconArrowDown;

export default IconArrowDown;
