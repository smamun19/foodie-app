import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CardView from '../components/CardView';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import ProfileCard from '../components/ProfileCard';
import {DrawerScreensProps} from '../navigators/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface SocialCardProps {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const SocialCard = ({icon, title, color, onPress}: SocialCardProps) => {
  return (
    <CardView cardView={styles.cardView}>
      <View style={styles.cardViewLeft}>
        <MaterialIcons
          style={styles.cardViewTitle}
          name={icon}
          color={color}
          size={30}
        />
        <Text>{title}</Text>
      </View>

      <Pressable onPress={onPress}>
        <Text style={styles.socialBtnText}>Connect</Text>
      </Pressable>
    </CardView>
  );
};

const Profile = ({navigation}: DrawerScreensProps<'Profile'>) => {
  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title="Profile"
          onLeftPress={() => navigation.navigate('Home')}
        />
      }>
      <ProfileCard onPress={() => console.log('working')} title="name" />
      <ProfileCard onPress={() => console.log('working')} title="Email" />
      <ProfileCard onPress={() => console.log('working')} title="Password" />
      <ProfileCard
        onPress={() => console.log('working')}
        title="Mobile number"
      />
      <Text style={styles.cAccounts}>Connected accounts</Text>
      <SocialCard
        icon="facebook"
        title="Facebook"
        color="blue"
        onPress={() => console.log('working')}
      />
      <SocialCard
        icon="eco"
        title="Eco"
        color="green"
        onPress={() => console.log('working')}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {margin: 10},
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollview: {
    flex: 1,
  },
  cAccounts: {
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  socialBtnText: {color: 'red'},
  cardViewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardViewTitle: {marginRight: 8},
});

export default Profile;
