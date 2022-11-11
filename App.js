import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// importing provider and store for redux
import {Provider} from 'react-redux';
import store from './src/api/store';

// importing screens_name
import HomeScreen from './src/pages/HomeScreen';
import DetailsScreen from './src/pages/DetailsScreen';
import FavouritesScreen from './src/pages/FavouritesScreen';
import BuyNowScreen from './src/pages/BuyNowScreen';
import SplashScreen from './src/pages/SplashScreen';
import SignInScreen from './src/pages/SignInScreen';
import SignUpScreen from './src/pages/SignUpScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
            size = focused ? 28 : 24;
            color = focused ? 'black' : 'gray';
          } else if (route.name === 'Details') {
            iconName = 'info';
            size = focused ? 26 : 20;
            color = focused ? 'black' : 'gray';
          } else if (route.name === 'Favourites') {
            iconName = 'shopping-cart';
            size = focused ? 26 : 20;
            color = focused ? 'black' : 'gray';
          } else if (route.name === 'BuyNow') {
            iconName = 'paypal';
            size = focused ? 26 : 20;
            color = focused ? 'black' : 'gray';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: ({focused}) => {
          focused ? 'black' : 'gray';
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="BuyNow" component={BuyNowScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
