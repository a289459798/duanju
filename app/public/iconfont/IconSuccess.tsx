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

let IconSuccess: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m256 397.3L485.3 680c-25 25-65.5 25-90.5 0L256 541.3c-12.5-12.5-12.5-32.8 0-45.3 6.3-6.3 14.4-9.4 22.6-9.4s16.4 3.1 22.6 9.4l127.4 127.4c6.2 6.2 16.4 6.2 22.6 0L722.7 352c12.5-12.5 32.8-12.5 45.3 0 6.3 6.3 9.4 14.4 9.4 22.6s-3.1 16.4-9.4 22.7z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconSuccess.defaultProps = {
  size: 18,
};

IconSuccess = React.memo ? React.memo(IconSuccess) : IconSuccess;

export default IconSuccess;
