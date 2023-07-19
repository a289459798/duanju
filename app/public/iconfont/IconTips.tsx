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

let IconTips: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M509.7244448 209.35111147c-31.85777813 0-56.88888853 25.03111147-56.8888896 56.88888853v325.4044448c0 31.85777813 25.03111147 56.88888853 56.8888896 56.88888853s56.88888853-25.03111147 56.88888853-56.88888853V266.24c0-31.85777813-25.03111147-56.88888853-56.88888853-56.88888853z m0 489.24444373c-31.85777813 0-56.88888853 25.03111147-56.8888896 56.8888896v4.5511104c0 31.85777813 25.03111147 56.88888853 56.8888896 56.8888896s56.88888853-25.03111147 56.88888853-56.8888896v-4.5511104c0-31.85777813-25.03111147-56.88888853-56.88888853-56.8888896zM512 34.13333333c263.9644448 0 477.86666667 213.90222187 477.86666667 477.86666667s-213.90222187 477.86666667-477.86666667 477.86666667S34.13333333 775.9644448 34.13333333 512 248.0355552 34.13333333 512 34.13333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconTips.defaultProps = {
  size: 18,
};

IconTips = React.memo ? React.memo(IconTips) : IconTips;

export default IconTips;
