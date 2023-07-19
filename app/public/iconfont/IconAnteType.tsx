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

let IconAnteType: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M352 352a32 32 0 0 0-32 32v256a32 32 0 1 0 64 0v-256a32 32 0 0 0-32-32zM672 352a32 32 0 0 0-32 32v256a32 32 0 1 0 64 0v-256a32 32 0 0 0-32-32zM560 432a48 48 0 1 1-96 0 48 48 0 0 1 96 0zM560 592a48 48 0 1 1-96 0 48 48 0 0 1 96 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M948.90666667 184.32a109.22666667 109.22666667 0 0 0-109.22666667-109.22666667H184.32a109.22666667 109.22666667 0 0 0-109.22666667 109.22666667v655.36a109.22666667 109.22666667 0 0 0 109.22666667 109.22666667h655.36a109.22666667 109.22666667 0 0 0 109.22666667-109.22666667V184.32zM220.72888889 876.08888889a72.81777778 72.81777778 0 0 1-72.81777778-72.81777778V220.72888889a72.81777778 72.81777778 0 0 1 72.81777778-72.81777778h582.54222222a72.81777778 72.81777778 0 0 1 72.81777778 72.81777778v582.54222222a72.81777778 72.81777778 0 0 1-72.81777778 72.81777778H220.72888889z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconAnteType.defaultProps = {
  size: 18,
};

IconAnteType = React.memo ? React.memo(IconAnteType) : IconAnteType;

export default IconAnteType;
