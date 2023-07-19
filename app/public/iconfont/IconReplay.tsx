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

let IconReplay: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 216.27259221V22.09185222L269.27407445 264.81777777l242.72592555 242.72592554V313.36296334a291.27111111 291.27111111 0 0 1 291.27111111 291.27111111 291.27111111 291.27111111 0 0 1-291.27111111 291.2711111 291.27111111 291.27111111 0 0 1-291.27111111-291.2711111H123.6385189a388.3614811 388.3614811 0 0 0 388.3614811 388.3614811 388.3614811 388.3614811 0 0 0 388.3614811-388.3614811 388.3614811 388.3614811 0 0 0-388.3614811-388.36148224z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconReplay.defaultProps = {
  size: 18,
};

IconReplay = React.memo ? React.memo(IconReplay) : IconReplay;

export default IconReplay;
