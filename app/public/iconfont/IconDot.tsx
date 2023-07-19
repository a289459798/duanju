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

let IconDot: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M560.24519111 997.74236441l437.9648-447.97496889c26.35776-26.95850667 25.86965333-70.18040889-1.08999111-96.53703111A68.26666667 68.26666667 0 0 0 949.39591111 433.77777774H73.46631111c-37.70368 0-68.26666667 30.56412445-68.26666666 68.26666667a68.26666667 68.26666667 0 0 0 19.45144888 47.72295111l437.96593778 447.97496889c26.35662222 26.95964445 69.57852445 27.44775111 96.53703111 1.09226667 0.36864-0.36067555 0.73159111-0.72362667 1.09112889-1.09226667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDot.defaultProps = {
  size: 18,
};

IconDot = React.memo ? React.memo(IconDot) : IconDot;

export default IconDot;
