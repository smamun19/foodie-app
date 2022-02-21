import React, {useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {RootStackScreensProps} from '../navigators/root-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Loader = ({navigation}: RootStackScreensProps<'Loader'>) => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.button}>
        <Text style={styles.text}>Lets Order</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'yellow',
    padding: 20,
    width: '90%',
    borderRadius: 5,
    flexDirection: 'row',
  },
  text: {fontSize: 20, fontWeight: 'bold', color: 'black'},
});

export default Loader;
