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

let IconAdd: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M514.133333 42.666667c29.866667 0 55.466667 21.333333 57.6 51.2v358.4h349.866667c32 0 57.6 23.466667 57.6 55.466666 2.133333 32-21.333333 57.6-51.2 61.866667H571.733333v352c0 32-23.466667 57.6-55.466666 57.6-32 2.133333-57.6-21.333333-61.866667-51.2V569.6H100.266667c-32 0-57.6-23.466667-57.6-55.466667-2.133333-32 21.333333-57.6 51.2-61.866666H454.4V100.266667c0-14.933333 6.4-29.866667 17.066667-40.533334 12.8-10.666667 27.733333-17.066667 42.666666-17.066666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconAdd.defaultProps = {
  size: 18,
};

IconAdd = React.memo ? React.memo(IconAdd) : IconAdd;

export default IconAdd;
