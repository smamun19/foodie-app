import React, {useCallback, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import CardView from '../components/CardView';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {DrawerScreensProps} from '../navigators/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HelpCenter} from '../utils/types/user';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {getHelpCenter} from '../services/public';

interface HelpCardProps {
  title: string;
  icon?: string;
  onPress?: () => void;
}

export const HelpCard = ({icon, title, onPress}: HelpCardProps) => {
  const {colors} = useTheme();
  return (
    <Pressable onPress={onPress}>
      <CardView cardView={styles.cardView}>
        <View style={styles.cardLeft}>
          {!!icon && <MaterialCommunityIcons name={icon} size={30} />}
          <Text
            numberOfLines={1}
            style={[
              icon ? styles.cardTitleWithIcon : styles.cardTitleWithoutIcon,
              {color: colors.text},
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
  const [data, setData] = useState<HelpCenter[]>();
  const {colors} = useTheme();
  useFocusEffect(
    useCallback(() => {
      getHelpCenter()
        .then(result => setData(result.details))
        .catch(() => {
          Alert.alert(
            'Error!',
            'Unable to process your request at this moment',
            undefined,
            {
              cancelable: true,
            },
          );
        });
    }, []),
  );
  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title="Help center"
          onLeftPress={() => navigation.navigate('Home')}
        />
      }>
      <Text style={[styles.text, {color: colors.text}]}>How can we help?</Text>
      {data?.map(e => (
        <HelpCard
          onPress={() => navigation.navigate('HelpQuery', {id: e.id})}
          title={e.title}
          icon={e.icon}
          key={e.id}
        />
      ))}
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
