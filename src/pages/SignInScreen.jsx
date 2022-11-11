import React, {memo} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import * as yup from 'yup';

const SignInScreen = ({navigation}) => {
  const loginValidationSchema = yup.object({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email Required'),
    password: yup
      .string()
      .max(25, 'Must be 25 characters or less')
      .min(8, 'Must be 8 characters or More')
      .required('Password Required'),
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidationSchema}
      onSubmit={async values => (
        console.log(values),
        await AsyncStorage.setItem('userInfo', JSON.stringify(values)),
        navigation.navigate('Tabs')
      )}>
      {({handleChange, handleBlur, handleSubmit, errors, touched, values}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.inputEmail}
            value={values.email}
            onBlur={handleBlur('email')}
            placeholder="Enter Your Email"
            onChangeText={handleChange('email')}
          />
          {errors.email && touched.email && (
            <View style={styles.errors}>
              <Text
                style={{
                  color: '#f00',
                  fontSize: 16,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  paddingLeft: 5,
                  paddingTop: 5,
                }}>
                {errors.email}
              </Text>
            </View>
          )}
          <TextInput
            style={styles.inputPassword}
            value={values.password}
            onBlur={handleBlur('password')}
            cursorColor="#000"
            placeholder="Enter Your Password"
            onChangeText={handleChange('password')}
          />
          {errors.password && touched.password && (
            <View style={styles.errors}>
              <Text
                style={{
                  color: '#f00',
                  fontSize: 16,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  paddingLeft: 5,
                  paddingTop: 5,
                }}>
                {errors.password}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Tabs')}>
            <Button
              style={styles.buttonText}
              title="Sign In"
              onPress={handleSubmit}
            />
          </TouchableOpacity>
          <View style={styles.registerWrapper}>
            <Text style={styles.registerText}>Don't Hava an Account!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
              <Text style={styles.registerNavigate}>Register Now.</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default memo(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000076',
  },
  inputEmail: {
    width: '90%',
    height: 50,
    borderRadius: 25,
    borderColor: 'black',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 265,
  },
  inputPassword: {
    width: '90%',
    height: 50,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  registerWrapper: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    paddingVertical: 10,
    paddingRight: 6,
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerNavigate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00a',
    textDecorationLine: 'underline',
  },
  button: {
    width: '50%',
    height: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: '#00f9',
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  errors: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
