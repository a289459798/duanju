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

let IconRun: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M272 151.64373333c0-66.07786667 43.30346667-88.14933333 97.3856-48.81706666l465.22986667 338.34773333c53.78453333 39.11573333 54.08106667 102.32 0 141.65226667l-465.22986667 338.34773333c-53.78346667 39.11573333-97.3856 17.15413333-97.3856-48.81813333v-720.71253334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconRun.defaultProps = {
  size: 18,
};

IconRun = React.memo ? React.memo(IconRun) : IconRun;

export default IconRun;
