import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CardView from '../components/CardView';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {DrawerScreensProps} from '../navigators/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface HelpCardProps {
  title: string;
  icon?: string;
  onPress?: () => void;
}

const HelpCard = ({icon, title, onPress}: HelpCardProps) => {
  return (
    <Pressable onPress={onPress}>
      <CardView cardView={styles.cardView}>
        <View style={styles.cardLeft}>
          {!!icon && <MaterialCommunityIcons name={icon} size={30} />}
          <Text
            numberOfLines={1}
            style={[
              icon ? styles.cardTitleWithIcon : styles.cardTitleWithoutIcon,
            ]}>
            {title}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={30} color="red" />
      </CardView>
    </Pressable>
  );
};

const Help = ({navigation}: DrawerScreensProps<'Help'>) => {
  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title="Help center"
          onLeftPress={() => navigation.navigate('Home')}
        />
      }>
      <Text style={styles.text}>How can we help?</Text>
      <HelpCard
        icon="chart-timeline"
        onPress={() => console.log('1')}
        title="How can we help?"
      />
      <HelpCard
        icon="chart-timeline"
        onPress={() => console.log('1')}
        title="How can we help?"
      />
      <HelpCard
        icon="chart-timeline"
        onPress={() => console.log('1')}
        title="How can we help?"
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {margin: 0},
  cardView: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderLeftWidth: 0,

    borderRightWidth: 0,
  },
  text: {color: 'red', fontSize: 25, fontWeight: 'bold', margin: 10},
  cardTitleWithIcon: {fontSize: 17, marginHorizontal: 20},
  cardTitleWithoutIcon: {fontSize: 17, marginRight: 20},
  cardLeft: {flex: 1, flexDirection: 'row', alignItems: 'center'},
});

export default Help;
