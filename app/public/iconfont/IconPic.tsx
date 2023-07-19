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

let IconPic: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M268.8 439.466667c-23.466667-23.466667-32-55.466667-23.466667-87.466667 8.533333-32 32-55.466667 64-64 32-8.533333 64 2.133333 87.466667 23.466667 34.133333 34.133333 34.133333 91.733333-2.133333 125.866666-34.133333 36.266667-89.6 36.266667-125.866667 2.133334z m332.8 64L279.466667 825.6h590.933333v-53.333333L601.6 503.466667zM870.4 198.4H153.6v627.2l448-448 268.8 268.8v-448zM189.866667 915.2H108.8C83.2 915.2 64 896 64 870.4V153.6c0-25.6 19.2-44.8 44.8-44.8h806.4c25.6 0 44.8 19.2 44.8 44.8v716.8c0 23.466667-19.2 44.8-44.8 44.8h-725.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPic.defaultProps = {
  size: 18,
};

IconPic = React.memo ? React.memo(IconPic) : IconPic;

export default IconPic;
