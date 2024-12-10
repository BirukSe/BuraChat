import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const NoMessage = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/chat.png')} style={styles.image} />
      <Text style={styles.text}>Start Chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'black', 
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10, 
  },
  text: {
    color: 'white', 
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NoMessage;
