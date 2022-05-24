import React, {useEffect, useRef} from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
} from 'react-native';
import FoodItem from '../components/FoodItemCardView';
import FoodItemHeader from '../components/FoodItemHeader';
import {RootStackScreensProps} from '../navigators/root-stack';
import {FOOD_DATA} from '../utils/testData';

const Restaurant = ({navigation}: RootStackScreensProps<'Restaurant'>) => {
  const sectionRef = useRef<SectionList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const translation = scrollY.interpolate({
    inputRange: [100, 130],
    outputRange: [-100, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={styles.container}>
      {console.log(scrollY)}
      <StatusBar hidden />
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          backgroundColor: 'tomato',
          transform: [{translateY: translation}],
        }}>
        <Text>This is for test</Text>
        <Text>This is for test</Text>
        <Text>This is for test</Text>
        <Text>This is for test</Text>
        <Text>This is for test</Text>
      </Animated.View>
      <Animated.SectionList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: scrollY},
              },
            },
          ],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        ref={sectionRef}
        sections={FOOD_DATA}
        // ListHeaderComponent={
        //   <FoodItemHeader
        //     onLeftPress={() => navigation.navigate('Drawer')}
        //     onSectionPress={e =>
        //       sectionRef.current?.scrollToLocation({
        //         sectionIndex: e,
        //         itemIndex: 0,
        //       })
        //     }
        //     flatListData={FOOD_DATA}
        //   />
        // }
        renderSectionHeader={({section}) => (
          <Text style={styles.headerText}>{section.title}</Text>
        )}
        renderItem={({item}) => (
          <FoodItem
            price={item.price}
            name={item.name}
            description={item.description}
          />
        )}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  headerText: {fontWeight: 'bold', fontSize: 20, color: 'black', padding: 5},
});

export default Restaurant;
