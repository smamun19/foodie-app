import React, {useContext, useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {RootStackScreensProps} from '../navigators/root-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Image} from 'react-native-elements/dist/image/Image';
import {UserContext} from '../services/userContext';

const Loader = ({navigation}: RootStackScreensProps<'Loader'>) => {
  const userInfo = useContext(UserContext);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  const loaderHandler = () => {
    if (userInfo?.token) {
      return navigation.navigate('Drawer');
    }
    return navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.text2}>Think Food</Text>
      <Image
        style={styles.imageStyle}
        source={require('../assets/foodie.jpeg')}
      />

      <TouchableOpacity onPress={loaderHandler} style={styles.button}>
        <Text style={styles.text}>Lets Order</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'yellow',
    padding: 20,
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
  },
  text: {fontSize: 20, fontWeight: 'bold', color: 'black'},
  text2: {fontSize: 30, fontWeight: 'bold', color: '#e3ac14'},
  imageStyle: {
    width: 200,
    height: 200,
  },
  imgView: {},
});

export default Loader;
