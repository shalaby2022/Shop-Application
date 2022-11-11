import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('test');
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('ex:12*********');
  const inpRef = useRef();

  useEffect(() => {
    inpRef.current.focus();
  }, []);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputUsername}
        value={username}
        ref={inpRef}
        placeholder="Enter Your Username"
        onChangeText={e => setUsername(e)}
      />
      <TextInput
        style={styles.inputEmail}
        value={email}
        placeholder="Enter Your Email"
        onChangeText={e => setEmail(e)}
      />
      <TextInput
        style={styles.inputPassword}
        value={password}
        cursorColor="#000"
        placeholder="Enter Your Password"
        onChangeText={e => setPassword(e)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Sign Up')}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <View style={styles.registerWrapper}>
        <Text style={styles.registerText}>Already Hava an Account!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.registerNavigate}>Sign In.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000076',
  },
  inputUsername: {
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
    marginTop: 200,
  },
  inputEmail: {
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
    height: 45,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: '#00f9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 40,
  },
});
