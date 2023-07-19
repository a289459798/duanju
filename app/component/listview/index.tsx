'use strict';

import React, {useImperativeHandle, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  Text,
  View,
} from 'react-native';

interface ListViewProps<ItemT> extends FlatListProps<ItemT> {
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}
export default React.forwardRef((props: ListViewProps<any>, ref) => {
  const listRef = useRef<FlatList>(null);

  const _renderFooter = (): any => {
    let {loading} = props;
    return (
      props.ListFooterComponent || (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          {loading ? (
            <View style={{flexDirection: 'row'}}>
              <ActivityIndicator size="small" />
              <View style={{justifyContent: 'center', marginLeft: 5}}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#666',
                  }}>
                  正在加载更多
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      )
    );
  };

  useImperativeHandle(ref, () => ({
    scrollToItem,
    scrollToOffset,
    scrollToIndex,
    scrollToEnd,
  }));
  const scrollToItem = (params: any) => {
    listRef?.current?.scrollToOffset(params);
  };

  const scrollToOffset = (params: any) => {
    listRef?.current?.scrollToOffset(params);
  };

  const scrollToIndex = (params: any) => {
    listRef?.current?.scrollToIndex(params);
  };

  const scrollToEnd = () => {
    listRef?.current?.scrollToEnd();
  };

  return (
    <FlatList
      ref={listRef}
      ListFooterComponent={() => _renderFooter()}
      onEndReached={() =>
        props.hasMore && !props.loading ? props.onLoadMore?.() : null
      }
      onEndReachedThreshold={0.5}
      keyExtractor={(item, key) => key + ''}
      {...props}
    />
  );
});
