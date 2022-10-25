import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';

interface ContainerProps extends ScrollViewProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const Container = React.forwardRef(
  (
    {children, header, footer, containerStyle, ...rest}: ContainerProps,
    ref: React.ForwardedRef<ScrollView>,
  ) => {
    return (
      <View style={styles.view}>
        {header}
        <ScrollView
          ref={ref}
          {...rest}
          style={[styles.scrollview, containerStyle]}>
          {children}
        </ScrollView>
        {footer}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
  },
});

export default Container;
