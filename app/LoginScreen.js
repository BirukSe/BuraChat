
import axiosInstance from '../lib/axios';
import React, { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const {saveUserName, saveUserId}=useContext(UserContext);
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading]=useState(false);

  const handleLogin = async() => {
    try{
      setIsLoading(true);
     const response=await axiosInstance.post('/auth/login', {username, password});
     if(!response.ok){
      console.log("Something went wrong")
      
     }
     saveUserId(response.data._id);
     saveUserName(response.data.name);

    


    }
    catch(error){
      console.log("Error:", error);
    }finally{
      setIsLoading(false);
      navigation.navigate('Chat');
    }
    
 
    // navigation.navigate('Chat');
  };

  return (
    <>
    {isLoading && <Text>Loading...</Text>}
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN TO BURACHAT</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text>Dont have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
    </>
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

export default LoginScreen;
