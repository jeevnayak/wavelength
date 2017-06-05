import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  MediumText,
} from './Text';
import touchable from './Touchable';

export const Button = touchable((props) => (
  <MediumText style={[
      Styles.Button,
      props.touchableActive ? Styles.ButtonActive : null,
      props.style]}>
    {props.text}
  </MediumText>
));

export const BackButton = (props) => (
  <Button
    onPress={props.navigator.pop}
    style={[Styles.Back, props.style]}
    text="Back" />
);

const Styles = StyleSheet.create({
  Button: {
    height: 64,
    textAlign: "center",
    lineHeight: 64,
  },
  ButtonActive: {
    backgroundColor: "#f00",
  },
  Back: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
