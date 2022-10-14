import React, {useCallback, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {HelpCenterQuery} from '../utils/types/user';
import {useFocusEffect} from '@react-navigation/native';
import {getHelpCenterQuery} from '../services/public';
import {HelpCard} from './help';
import {RootStackScreensProps} from '../navigators/root-stack';

const HelpQuery = ({navigation, route}: RootStackScreensProps<'HelpQuery'>) => {
  const [data, setData] = useState<HelpCenterQuery>();
  useFocusEffect(
    useCallback(() => {
      getHelpCenterQuery(route.params.id)
        .then(result => setData(result.details))
        .catch(() => {
          Alert.alert(
            'Error!',
            'Unable to process your request at this moment',
            undefined,
            {
              cancelable: true,
            },
          );
        });
    }, [route.params.id]),
  );
  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title={data?.title}
          onLeftPress={() => navigation.goBack()}
        />
      }>
      {data?.query?.map(e => (
        <HelpCard title={e.title} icon={e.icon} key={e.id} />
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {margin: 0},
});

export default HelpQuery;
