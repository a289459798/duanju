import React from 'react';

import Navigation, {NavigationProps} from '@/component/navigation';

export default ({
    Component,
    navigationProps,
  }: {
    Component: any;
    navigationProps: (props: any) => NavigationProps;
  }) =>
  ({...props}: any) => {
    // useLayoutEffect(() => {
    //   console.log('页面加载');
    //   return () => {
    //     console.log('页面卸载');
    //   };
    // }, []);

    let navProps: NavigationProps = {
      hideSafe: false,
      hideHeader: false,
    };

    if (navigationProps) {
      navProps = {
        ...navigationProps({...props}),
      };
    }

    return (
      <Navigation {...navProps}>
        <Component {...props} />
      </Navigation>
    );
  };
