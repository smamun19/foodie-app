import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

interface ContainerProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

const Container = ({children, header}: ContainerProps) => {
  return (
    <View style={styles.view}>
      {header}
      <ScrollView style={styles.scrollview}>{children}</ScrollView>
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
