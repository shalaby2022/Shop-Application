import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {memo} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const BuyNowScreen = ({route, navigation}) => {
  // const {id} = route.params;
  const logOutHandler = async () => {
    await AsyncStorage.removeItem('userInfo');
    navigation.navigate('Sign In');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.Welcome}>Welcome</Text>
      <View style={styles.askContainer}>
        <Text style={styles.txt}>create account. New to Shopify</Text>
        <Text numberOfLines={1}>
          _______________________________________________________
        </Text>
        <Text style={styles.txt}>sign in</Text>
        <Text numberOfLines={1}>
          _______________________________________________________
        </Text>
        <Text style={styles.txt}>Deliver to Home (10 am to 5 pm)</Text>
        <Text style={styles.txt}>Deliver to Work (05 pm to 12 am)</Text>
        <Text style={styles.txt}>Deliver to selected place.</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button style={styles.btnOut} title="Log Out" onPress={logOutHandler} />
      </View>
    </View>
  );
};

export default memo(BuyNowScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000076',
  },
  Welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    paddingLeft: 20,
  },
  askContainer: {
    width: '90%',
    height: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  btnContainer: {
    width: '60%',
    height: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    backgroundColor: 'red',
    borderRadius: 5,
    overflow: 'hidden',
  },
  txt: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 7,
  },
});
