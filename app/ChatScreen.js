import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import axiosInstance from '../lib/axios';


const ChatScreen = ({navigation}) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const userFetcher = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/auth/getter');
        console.log("Response data:", response.data);
        setArray(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
   
    userFetcher();
  }, []);
  const handleUser = (id, name) => {
    navigation.navigate('Message', { HisId: id, name: name });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Screen</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          array.map((user, index) => (
            <Pressable onPress={() => handleUser(user._id, user?.fullName || user?.name || "Unknown")}>

            <View key={index} style={styles.flexer}>
              <View style={styles.icon}>
                <Text style={styles.iconText}>
                  {user.name?.charAt(0) || user.fullName?.charAt(0)}
                </Text>
              </View>
              <Text style={styles.name}>{user.name || user.fullName}</Text>
            </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#b4b1b1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  flexer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, 
    
  },
  iconText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  name: {
    fontSize: 18,
  },
});

export default ChatScreen;
