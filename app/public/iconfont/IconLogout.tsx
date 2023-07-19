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

let IconLogout: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M556.8 849.066667H145.066667V177.066667h411.733333c23.466667 0 40.533333-17.066667 40.533333-40.533334s-17.066667-40.533333-40.533333-40.533333H145.066667C100.266667 96 64 132.266667 64 177.066667v667.733333c0 44.8 36.266667 81.066667 81.066667 81.066667h411.733333c23.466667 0 40.533333-17.066667 40.533333-36.266667 0-23.466667-17.066667-40.533333-40.533333-40.533333z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M947.2 484.266667l-187.733333-187.733334c-17.066667-17.066667-40.533333-17.066667-57.6 0-21.333333 21.333333-21.333333 42.666667 0 61.866667 17.066667 17.066667 53.333333 55.466667 110.933333 113.066667H418.133333c-23.466667 0-40.533333 17.066667-40.533333 40.533333s17.066667 40.533333 40.533333 40.533333h403.2L704 669.866667c-17.066667 17.066667-17.066667 40.533333 0 57.6 17.066667 17.066667 44.8 17.066667 57.6 0l187.733333-187.733334c14.933333-14.933333 14.933333-40.533333-2.133333-55.466666z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconLogout.defaultProps = {
  size: 18,
};

IconLogout = React.memo ? React.memo(IconLogout) : IconLogout;

export default IconLogout;
