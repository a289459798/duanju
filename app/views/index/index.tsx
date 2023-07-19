import React, {useRef, useEffect} from 'react';
import {View, UIManager, findNodeHandle} from 'react-native';
import {connect} from 'react-redux';
import {Text} from '@/component';
import {CreatePage} from '@/utils';
import {CSJVideoManager} from '@/briage/view';

const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    //@ts-ignore
    UIManager.CSJVideoManager.Commands.create.toString(), // we are calling the 'create' command
    [viewId],
  );

const Page = CreatePage({
  navigationProps: () => ({
    hideSafe: true,
    hideHeader: true,
    statusBar: {translucent: true, backgroundColor: 'transparent'},
  }),
  Component: (props: any) => {
    const {user} = props;
    console.log('user1', user);
    const ref = useRef(null);
    useEffect(() => {
      const viewId = findNodeHandle(ref.current);
      createFragment(viewId!);
    }, []);

    return (
      <View>
        <Text>11111</Text>
        <CSJVideoManager
          ref={ref}
          id={'123'}
          style={{width: 100, height: 100}}
        />
      </View>
    );
  },
});

export default connect((state: any) => {
  const {user} = state;
  return {
    user,
  };
})(Page);
