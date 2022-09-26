import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import RadioButton from '../components/RadioButton';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import Spacer from '../components/Spacer';
import {RootStackScreensProps} from '../navigators/root-stack';
import CustomButton from '../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomInput from '../components/TextInput';
import {UserContext} from '../services/userContext';

const FoodDetails = ({navigation}: RootStackScreensProps<'Restaurant'>) => {
  const foodDetails = {
    id: 1,
    name: 'Burger',
    variation: [
      {name: 'small', price: 100},
      {name: 'medium', price: 150},
      {name: 'large', price: 200},
      {name: ' extra large', price: 300},
    ],
    price: undefined,
  };

  const [check, setCheck] = useState<Record<string, any>>({});
  const [counter, setCounter] = useState<number>(1);
  const [instructions, setInstructions] = useState<string>('');

  const userInfo = useContext(UserContext);

  const addToCart = () => {
    if (check.name) {
      userInfo.addItem({
        id: foodDetails.id,
        variation: check.name,
        price: check.price,
        quantity: counter,
        name: foodDetails.name,
        compositeId: `${foodDetails.id}${check.name}`,
      });
      return navigation.goBack();
    }

    userInfo.addItem({
      id: foodDetails.id,
      price: foodDetails.price ?? 0,
      quantity: counter,
      name: foodDetails.name,
      compositeId: `${foodDetails.id}`,
    });
    navigation.goBack();
  };
  return (
    <Container
      header={
        <CustomHeader
          title="Details"
          onLeftPress={() => navigation.navigate('Restaurant')}
        />
      }
      footer={
        <View style={styles.footerContainer}>
          <View style={styles.counter}>
            <Pressable
              disabled={counter === 1 ? true : false}
              onPress={() => setCounter(counter - 1)}>
              <MaterialIcons
                name="remove-circle"
                size={30}
                color={counter === 1 ? 'grey' : 'red'}
              />
            </Pressable>
            <Text style={styles.counterText}>{counter}</Text>
            <Pressable onPress={() => setCounter(counter + 1)}>
              <MaterialIcons name="add-circle" size={30} color="red" />
            </Pressable>
          </View>

          <CustomButton
            disabled={foodDetails.variation && !check.name}
            onPress={addToCart}
            containerStyle={[
              styles.btn,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor: !foodDetails.variation
                  ? 'red'
                  : !check.name
                  ? 'grey'
                  : 'red',
              },
            ]}
            title="Add to card"
          />
        </View>
      }>
      <Image
        style={styles.imageStyle}
        source={require('../assets/burger.jpeg')}
      />
      <View style={styles.view1}>
        <View style={styles.left}>
          <Text style={styles.titleText}>Food name</Text>
          <Text numberOfLines={2} style={styles.desText}>
            description
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.priceText}>
            Tk {check.price ?? foodDetails.price}
          </Text>
        </View>
      </View>
      <Spacer />
      <View>
        {foodDetails.variation && (
          <View>
            <View style={styles.view1}>
              <View style={styles.left}>
                <Text style={styles.titleText}>Variation</Text>
                <Text numberOfLines={2} style={styles.desText}>
                  Select one
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.priceText}>1 Required</Text>
              </View>
            </View>
            <View>
              <RadioButton
                check={check}
                setCheck={setCheck}
                data={foodDetails.variation}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.extra}>
        <Text style={styles.titleText}>Special instructions</Text>
        <Text>
          Please let us know if you are allergic to anything or if we need to
          avoid anything
        </Text>
        <CustomInput
          placeholder="e.g. no mayo"
          multiline
          textAlignVertical="top"
          textStyle={styles.input}
          maxLength={200}
          onChangeText={setInstructions}
          containerStyle={styles.inputContainer}
        />
        <Text style={styles.textCounter}>{instructions.length}/200</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageStyle: {height: 150, width: '100%'},
  view1: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  left: {flex: 1, paddingRight: 10},
  right: {},
  titleText: {fontWeight: 'bold', color: 'black', fontSize: 15},
  desText: {},
  priceText: {},
  footerContainer: {
    flexDirection: 'row',
    padding: 5,
    borderTopWidth: 0.5,
    borderTopColor: '#00000033',
    justifyContent: 'space-between',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    width: 25,
    textAlign: 'center',
  },
  btn: {width: '70%', borderRadius: 15},
  extra: {padding: 5, paddingVertical: 15},
  inputContainer: {
    width: '100%',
    margin: 0,
    alignItems: 'center',
    paddingTop: 15,
  },
  input: {height: 100},
  textCounter: {
    alignSelf: 'flex-end',
  },
});

export default FoodDetails;
