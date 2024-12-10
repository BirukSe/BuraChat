import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId]=useState(null);

  
  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedId=await AsyncStorage.getItem('userId');
        if (storedName) {
          setUserName(storedName);
          setUserId(storedId);
        }
      } catch (error) {
        console.error('Failed to load user name from storage:', error);
      }
    };

    loadUserName();
  }, []);

  // Save user name to AsyncStorage
  const saveUserName = async (name) => {
    try {
      await AsyncStorage.setItem('userName', name);
      setUserName(name);
    } catch (error) {
      console.error('Failed to save user name to storage:', error);
    }
  };
  const saveUserId=async(id)=>{
    try{
        await AsyncStorage.setItem('userId', id);
        setUserId(id);

    }catch(error){
        console.log('Failed to save user id to storage:', error);
    }

  }

  return (
    <UserContext.Provider value={{ userName, saveUserName, userId, saveUserId }}>
      {children}
    </UserContext.Provider>
  );
};
