import React, {useContext} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import CardView from '../components/CardView';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import ProfileCard from '../components/ProfileCard';
import {DrawerScreensProps} from '../navigators/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../services/userContext';

import ThemedText from '../components/ThemedText';

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
        <ThemedText>{title}</ThemedText>
      </View>

      <Pressable onPress={onPress}>
        <ThemedText style={styles.socialBtnText}>Connect</ThemedText>
      </Pressable>
    </CardView>
  );
};

const Profile = ({navigation}: DrawerScreensProps<'Profile'>) => {
  const userInfo = useContext(UserContext);

  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title="Profile"
          onLeftPress={() => navigation.navigate('Home')}
        />
      }>
      <ProfileCard
        onPress={() => navigation.navigate('ProfileEdit', {title: 'name'})}
        title="Name"
        data={userInfo.name}
      />
      <ProfileCard
        onPress={() => navigation.navigate('ProfileEdit', {title: 'email'})}
        title="Email"
        data={userInfo.email}
      />
      <ProfileCard
        onPress={() => navigation.navigate('ProfileEdit', {title: 'password'})}
        title="Password"
        data="***********"
      />
      <ProfileCard
        onPress={() => navigation.navigate('ProfileEdit', {title: 'phone'})}
        title="Mobile number"
        data={userInfo.phone}
      />
      <ThemedText style={styles.cAccounts}>Connected accounts</ThemedText>
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
  cAccounts: {
    fontWeight: 'bold',
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
