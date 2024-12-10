// index.js or App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from '../context/userContext';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ChatScreen from './ChatScreen';
import { NavigationIndependentTree } from '@react-navigation/native';
import Message from './Message.js';
const Stack = createStackNavigator();

const App = () => {
  return (
    <>
    <UserProvider>
    <NavigationIndependentTree>
      
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Message" component={Message}/>
      </Stack.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
    </UserProvider>
    </>
  );
};

export default App;
