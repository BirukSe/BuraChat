// LoginScreen.js
import axiosInstance from '../lib/axios';
import React, { useState,useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../context/userContext';
const SignupScreen = ({ navigation }) => {
  const {saveUserName, saveUserId}=useContext(UserContext);
  const [name, setName] = useState('');
  const [username, setUserName]=useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading]=useState(false);

  const handleLogin = () => {
    try{
      setIsLoading(true);
      const response=axiosInstance.post('/auth/signup', {name, username, password});
      if(!response.ok){
        console.log("Something went wrong")

    
        
      }
      saveUserId(response.data._id);
      saveUserName(response.data.name);
      navigation.navigate('Chat');


    }catch(error){

    }finally{
      setIsLoading(false);
    }
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BuraChat</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
         <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Already have an Account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Roboto',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'brown',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SignupScreen;