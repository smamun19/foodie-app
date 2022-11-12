import React from 'react';
import {StyleSheet} from 'react-native';
import Container from './Container';
import ThemedText from './ThemedText';

const FailedView = () => {
  return (
    <Container
      contentContainerStyle={styles.contentContainerStyle}
      containerStyle={styles.containerStyle}>
      <ThemedText style={styles.text}>Failed to access the server</ThemedText>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {margin: 0},
  text: {color: 'red', fontSize: 25, fontWeight: 'bold', margin: 10},
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FailedView;
