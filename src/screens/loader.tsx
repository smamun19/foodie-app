import React, {useContext, useEffect} from 'react';
import {Text, StyleSheet, SafeAreaView, Image, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';
import CustomButton from '../components/CustomButton';
import Spacer from '../components/Spacer';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const Loader = ({navigation}: RootStackScreensProps<'Loader'>) => {
  const userInfo = useContext(UserContext);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  const loaderHandler = () => {
    if (userInfo.token) {
      return navigation.navigate('Drawer');
    }
    return navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar
        animated
        backgroundColor="#4846B1"
        barStyle={'light-content'}
      />
      <Text style={styles.foodie}>FOODIE</Text>
      <View style={styles.mid}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/food.png')}
        />
        <Text style={[styles.midText, styles.bigBoldText]}>Your culinary</Text>
        <Text style={[styles.midText, styles.bigBoldText]}>
          adventure awaits...
        </Text>
        <Spacer height={10} />
        <Text style={styles.midText}>
          feel the taste of most authentic foods
        </Text>
        <Text style={styles.midText}>from anywhere and anytime.</Text>
      </View>
      <CustomButton
        onPress={loaderHandler}
        containerStyle={styles.button}
        textStyle={styles.text}
        title="Lets Order"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4846B1',
    padding: 30,
  },
  button: {
    backgroundColor: 'white',
    width: '70%',
    borderRadius: 40,
  },
  text: {fontSize: 20, fontWeight: 'bold', color: '#4846B1'},
  foodie: {fontSize: 30, fontWeight: 'bold', color: 'white'},
  imageStyle: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  mid: {justifyContent: 'center', alignItems: 'center'},
  midText: {alignSelf: 'flex-start', color: 'white'},
  bigBoldText: {fontWeight: 'bold', fontSize: 30},
});

export default Loader;
