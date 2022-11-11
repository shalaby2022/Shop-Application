import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    navigationHandler();
  }, []);

  const navigationHandler = async () => {
    const info = await AsyncStorage.getItem('userInfo');
    if (info) {
      setTimeout(() => navigation.navigate('Tabs'), 2000);
    } else {
      setTimeout(() => navigation.navigate('Sign In'), 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.text}>Welcome to Shopify 😊</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/splashScreen.png')}
          style={styles.img}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000076',
    padding: 2,
  },
  welcomeContainer: {
    width: '100%',
    height: '10%',
  },
  imgContainer: {
    width: '100%',
    height: '86%',
    paddingBottom: 3,
  },
  text: {
    textAlign: 'center',
    lineHeight: 80,
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
  },
  img: {
    width: '95%',
    height: '100%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
