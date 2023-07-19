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

let IconPhotoFail: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M398.678 171.008l-18.944 56.89h-265.5V626.12l73.556-73.557c20.533-20.534 52.796-22.113 75.133-4.74l5.366 4.74 73.5 73.557 105.359-126.464 122.196 183.352-56.89 170.667H114.232c-29.16 0-53.217-21.975-56.505-50.258l-0.382-6.63v-568.89c0-29.212 21.975-53.225 50.258-56.507l6.631-0.382h284.445z m512 0c29.213 0 53.225 21.926 56.507 50.248l0.382 6.641v568.89c0 29.16-21.926 53.217-50.247 56.506l-6.642 0.383H626.233l56.89-170.668L510.35 423.822l72.819-87.324c21.026-25.274 58.554-27.207 82.058-5.613l4.811 4.987 240.64 280.747V227.897H493.512l18.944-56.889h398.223zM313.373 284.763c15.88 0 30.75 4.345 43.489 11.91l-15.073 45.002 46.368 69.534c-14.528 26.354-42.583 44.221-74.784 44.221-47.104 0-85.333-38.229-85.333-85.334 0-47.104 38.229-85.333 85.333-85.333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPhotoFail.defaultProps = {
  size: 18,
};

IconPhotoFail = React.memo ? React.memo(IconPhotoFail) : IconPhotoFail;

export default IconPhotoFail;
