import React from 'react';
import {StyleSheet} from 'react-native';
import {ListView} from '@/component';
import {Screen} from '@/utils';
import useNavigator from 'hooks/useNavigator';
import DramaItem from 'component/custom/dramaItem';

type HistoryProps = {
  history: [];
  dispatch: Function;
};
export default (props: HistoryProps) => {
  const nav = useNavigator();

  return (
    <ListView
      style={styles.container}
      columnWrapperStyle={{
        justifyContent: 'flex-start',
      }}
      numColumns={3}
      data={props.history}
      renderItem={({item}) => (
        <DramaItem
          video={item}
          onPress={video => {
            nav.push('Play', {id: video.id, index: video.index});
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Screen.calc(100),
    paddingHorizontal: Screen.calc(12),
  },
  itemView: {
    marginBottom: Screen.calc(16),
    width: Screen.calc(110),
    marginRight: Screen.calc(10),
  },
  itemImageView: {},
  itemImage: {
    width: Screen.calc(110),
    height: Screen.calc(147),
    borderRadius: Screen.calc(6),
  },
  statusView: {
    position: 'absolute',
    top: Screen.calc(6),
    left: 0,
    zIndex: 9,
  },
  titleText: {
    color: '#222',
    fontSize: Screen.calc(16),
    marginTop: Screen.calc(11),
    lineHeight: Screen.calc(19),
  },
  lookText: {
    color: '#999',
    fontSize: Screen.calc(12),
    lineHeight: Screen.calc(19),
    marginTop: Screen.calc(3),
  },
});
