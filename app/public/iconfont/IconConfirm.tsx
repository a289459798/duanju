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

let IconConfirm: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M366.36444445 823.37564445L40.76657778 497.77777778l68.65351111-68.65351111L366.36444445 686.06862222l499.66648888-499.66648889 68.65351112 68.65351112z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconConfirm.defaultProps = {
  size: 18,
};

IconConfirm = React.memo ? React.memo(IconConfirm) : IconConfirm;

export default IconConfirm;
