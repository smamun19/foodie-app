import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardView from './CardView';
import ThemedText from './ThemedText';

interface ProfileCardProps {
  title: string;
  data?: string;
  onPress: () => void;
}

const ProfileCard = ({title, data, onPress, ...rest}: ProfileCardProps) => {
  return (
    <CardView cardView={styles.cardView}>
      <View style={styles.top}>
        <ThemedText>{title}</ThemedText>
        <Pressable {...rest}>
          <MaterialIcons onPress={onPress} name="edit" size={25} color="red" />
        </Pressable>
      </View>
      <ThemedText style={styles.dataText}>{data}</ThemedText>
    </CardView>
  );
};

const styles = StyleSheet.create({
  cardView: {
    marginVertical: 10,
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#6b6b6b',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataText: {fontWeight: 'bold'},
});

export default ProfileCard;
