import React from 'react';
import {View} from 'react-native';

export interface SpacerProp {
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
}

const Spacer = ({width, height, backgroundColor}: SpacerProp) => {
  return (
    <View
      style={{
        width: width ? width : (width = '100%'),
        height: height ? height : (height = 10),
        backgroundColor: backgroundColor
          ? backgroundColor
          : (backgroundColor = 'white'),
      }}
    />
  );
};

export default Spacer;
