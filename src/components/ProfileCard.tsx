import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardView from './CardView';

interface ProfileCardProps {
  title: string;
  data?: string;
  onPress: () => void;
}

const ProfileCard = ({title, data, onPress, ...rest}: ProfileCardProps) => {
  return (
    <CardView cardView={styles.cardView}>
      <View style={styles.top}>
        <Text>{title}</Text>
        <Pressable {...rest}>
          <MaterialIcons onPress={onPress} name="edit" size={25} color="red" />
        </Pressable>
      </View>
      <Text style={styles.dataText}>{data}</Text>
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
  dataText: {fontWeight: 'bold', color: 'black'},
});

export default ProfileCard;
