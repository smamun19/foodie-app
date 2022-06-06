import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

interface ContainerProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const Container = ({children, header, footer}: ContainerProps) => {
  return (
    <View style={styles.view}>
      {header}
      <ScrollView style={styles.scrollview}>{children}</ScrollView>
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
