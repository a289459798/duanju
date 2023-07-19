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

let IconNotice: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M814.9 179.1c-18.5-12.5-43.1-6.8-55.3 12.7-12.1 19.6-6.8 45.8 11.7 58.8 4.4 3 107.4 77.1 107.4 261.7 0 184.7-98.8 259-102.9 261.8-18.5 13.1-23.6 39.4-11.2 58.8 7.8 12.2 20.5 18.9 33.4 18.9 7.7 0 15.4-2.4 22.3-7.3 5.7-3.9 138.6-99.9 138.6-332.5 0.2-232.7-138.1-328.8-144-332.9z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M689.9 303.7c-19.8-10-43.4-0.8-53 20-9.7 21-1.4 46.2 18.3 56.7 2.6 1.4 62.8 34.4 62.8 128.5 0 100.5-56.3 133.9-58.1 135-19.9 10.5-27.8 36.1-17.9 57 7.1 14.9 21.2 23.6 36.1 23.6 6 0 12.2-1.5 17.9-4.4 4.3-2.4 102.6-56.1 102.6-210.9-0.3-149.7-104.5-203.1-108.7-205.5zM544 91.6c-14.1-7.1-30.7-4.6-42.9 5.7L270 300.7l-163.9-0.8h-0.2c-10.7 0-20.9 4.4-28.3 12.4-7.7 8-11.8 18.8-11.8 30L65 681.7c0 11.4 4.3 22.2 11.7 30 7.4 8 17.8 12.5 28.4 12.5h166l230.1 202.5c7.3 6.7 16.6 9.8 25.7 9.8 6 0 11.5-1.3 16.9-4.1 14.1-7 23-21.9 23-38.5V130c0.4-16.4-8.6-31.3-22.8-38.4z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconNotice.defaultProps = {
  size: 18,
};

IconNotice = React.memo ? React.memo(IconNotice) : IconNotice;

export default IconNotice;
