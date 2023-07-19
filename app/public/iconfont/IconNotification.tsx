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

let IconNotification: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M610.133333 870.4h-196.266666c-23.466667 0-44.8 19.2-44.8 44.8s19.2 44.8 44.8 44.8h196.266666c23.466667 0 44.8-19.2 44.8-44.8s-21.333333-44.8-44.8-44.8z m-377.6-140.8l27.733334-142.933333v-185.6c0-136.533333 110.933333-249.6 249.6-249.6 138.666667 0 249.6 110.933333 249.6 249.6v177.066666l29.866666 151.466667H232.533333z m618.666667-155.733333v-172.8C851.2 215.466667 697.6 64 512 64S172.8 215.466667 172.8 403.2V576L123.733333 819.2h774.4l-46.933333-245.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconNotification.defaultProps = {
  size: 18,
};

IconNotification = React.memo ? React.memo(IconNotification) : IconNotification;

export default IconNotification;
