import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import {Screen} from 'utils';

export type CustomButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  imageProps?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  image?: any;
  title: string;
};

export default (props: CustomButtonProps) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={[styles.container, props.style]}>
          {props.image && (
            <Image
              style={[styles.image, props.imageProps]}
              source={props.image}
            />
          )}
          <Text style={[styles.textStyle, props.textStyle]}>{props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Screen.calc(6),
    paddingVertical: Screen.calc(8),
    paddingHorizontal: Screen.calc(15),
  },
  image: {
    marginRight: Screen.calc(2),
  },
  textStyle: {
    fontSize: Screen.calc(14),
    color: '#fff',
    fontWeight: 'bold',
  },
});
