import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import CardView from '../components/CardView';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import ProfileCard from '../components/ProfileCard';
import {DrawerScreensProps} from '../navigators/drawer';

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
      <CardView cardView={styles.cardView}>
        <Text>Facebook</Text>
        <Pressable onPress={() => console.log('working')}>
          <Text style={styles.socialBtnText}>Connect</Text>
        </Pressable>
      </CardView>
      <CardView cardView={styles.cardView}>
        <Text>Google</Text>
        <Pressable onPress={() => console.log('working')}>
          <Text style={styles.socialBtnText}>Connect</Text>
        </Pressable>
      </CardView>
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
});

export default Profile;
