import React from 'react';
import {View, ScrollView, StyleSheet, ViewStyle} from 'react-native';

interface ContainerProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const Container = ({
  children,
  header,
  footer,
  containerStyle,
}: ContainerProps) => {
  return (
    <View style={styles.view}>
      {header}
      <ScrollView style={[styles.scrollview, containerStyle]}>
        {children}
      </ScrollView>
      {footer}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
  },
});

export default Container;
