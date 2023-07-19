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

let IconStop: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 994.41777778a482.53155555 482.53155555 0 0 1-187.79022222-926.90204445 482.53155555 482.53155555 0 0 1 375.58044444 888.97991112A479.4368 479.4368 0 0 1 512 994.41777778z m0-873.81333333c-215.81368889 0-391.39555555 175.58186667-391.39555555 391.39555555s175.58186667 391.39555555 391.39555555 391.39555555 391.39555555-175.58186667 391.39555555-391.39555555-175.58186667-391.39555555-391.39555555-391.39555555z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M327.39555555 327.39555555m65.024 0l239.1608889 0q65.024 0 65.024 65.024l0 239.1608889q0 65.024-65.024 65.024l-239.1608889 0q-65.024 0-65.024-65.024l0-239.1608889q0-65.024 65.024-65.024Z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconStop.defaultProps = {
  size: 18,
};

IconStop = React.memo ? React.memo(IconStop) : IconStop;

export default IconStop;
