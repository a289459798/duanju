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

let IconAbout: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M426.666667 456.533333s89.6-78.933333 123.733333-64c23.466667 6.4 10.666667 113.066667 6.4 125.866667 0 12.8-21.333333 174.933333-17.066667 181.333333 6.4 25.6 14.933333 6.4 40.533334-14.933333 0 0 59.733333-40.533333-4.266667 42.666667-51.2 55.466667-102.4 49.066667-110.933333 6.4-4.266667-29.866667 21.333333-221.866667 27.733333-264.533334 2.133333-14.933333-14.933333 0-14.933333 0s-49.066667 29.866667-59.733334 10.666667c-4.266667-6.4 0-14.933333 8.533334-23.466667z m128-219.733333c29.866667 6.4 44.8 42.666667 38.4 72.533333-6.4 29.866667-34.133333 55.466667-64 46.933334-29.866667-6.4-40.533333-40.533333-34.133334-70.4 4.266667-29.866667 29.866667-55.466667 59.733334-49.066667z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 889.6c-209.066667 0-377.6-168.533333-377.6-377.6S302.933333 134.4 512 134.4 889.6 302.933333 889.6 512 721.066667 889.6 512 889.6zM512 64C264.533333 64 64 266.666667 64 512s202.666667 448 448 448 448-202.666667 448-448S757.333333 64 512 64z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconAbout.defaultProps = {
  size: 18,
};

IconAbout = React.memo ? React.memo(IconAbout) : IconAbout;

export default IconAbout;
