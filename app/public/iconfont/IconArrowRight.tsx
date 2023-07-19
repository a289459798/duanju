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

let IconArrowRight: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M652.8 878.933333L945.066667 554.666667c21.333333-23.466667 21.333333-61.866667 0-85.333334L652.8 145.066667c-21.333333-23.466667-55.466667-23.466667-76.8 0s-21.333333 61.866667 0 85.333333l196.266667 219.733333H119.466667C89.6 450.133333 64 477.866667 64 512c0 34.133333 25.6 61.866667 55.466667 61.866667h657.066666L576 791.466667c-21.333333 23.466667-21.333333 61.866667 0 85.333333 21.333333 25.6 57.6 25.6 76.8 2.133333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconArrowRight.defaultProps = {
  size: 18,
};

IconArrowRight = React.memo ? React.memo(IconArrowRight) : IconArrowRight;

export default IconArrowRight;
