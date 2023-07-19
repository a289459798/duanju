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

let IconClean: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M410.59104995 173.97016652L850.02983348 613.40895005 625.22894793 932.93551692a55.23363335 55.23363335 0 0 1-84.23129065 7.29083955l-79.39834689-79.39834818v-169.42916899h-169.40155261L83.77364353 483.00234272a55.23363335 55.23363335 0 0 1 7.29083955-84.23129065l319.52656687-224.77326917z m49.68265325-34.93527325l85.61213059-60.23227672a55.23363335 55.23363335 0 0 1 70.83713423 6.10331688l115.38305961 115.41067599 121.40352472-121.40352473a27.61681602 27.61681602 0 0 1 39.05017805 0l45.56774717 45.56774716a27.61681602 27.61681602 0 0 1 0 39.07779443l-121.37590835 121.37590835 122.34249735 122.34249735a55.23363335 55.23363335 0 0 1 6.10331688 70.83713423l-60.20466034 85.61213059-424.7466376-424.69140353z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconClean.defaultProps = {
  size: 18,
};

IconClean = React.memo ? React.memo(IconClean) : IconClean;

export default IconClean;
