import {useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';

import useNavigator from '@/hooks/useNavigator';
import {CreatePage, Screen} from '@/utils';

export default CreatePage({
  navigationProps: () => ({
    headerStyle: Screen.android ? {} : {height: 44},
  }),
  Component: () => {
    const route = useRoute();
    const params: any = route.params;
    const nav = useNavigator();
    useLayoutEffect(() => {
      nav.setTitle(params?.title);
      return () => {};
    }, []);
    return (
      <Pdf
        source={{uri: params?.url, cache: true}}
        style={styles.container}
        trustAllCerts={false}
      />
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
