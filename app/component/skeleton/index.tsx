import {Skeleton, SkeletonProps} from '@rneui/themed';
import React from 'react';

export default (props: SkeletonProps) => {
  return <Skeleton animation="pulse" {...props} />;
};
