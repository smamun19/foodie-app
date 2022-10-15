import React from 'react';
import {StyleSheet} from 'react-native';
import Container from '../components/Container';
import CustomCard from '../components/CustomCard';
import CustomHeader from '../components/CustomHeader';
import {DrawerScreensProps} from '../navigators/drawer';

const Favourites = ({navigation}: DrawerScreensProps<'Favourites'>) => {
  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title="Favourites"
          onLeftPress={() => navigation.navigate('Home')}
        />
      }>
      <CustomCard
        cardStyle={styles.card}
        iconName="favorite"
        imgBorderRadius={10}
        imgStyle={styles.img}
        title="Name"
      />
      <CustomCard
        imgBorderRadius={10}
        iconName="favorite"
        cardStyle={styles.card}
        imgStyle={styles.img}
        title="Name"
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {margin: 10},
  card: {marginBottom: 15},
  img: {width: '100%', borderRadius: 20},
});

export default Favourites;
