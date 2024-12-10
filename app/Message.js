
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Image } from 'react-native';
import { UserContext } from '../context/userContext';
import axiosInstance from '../lib/axios';
import NoMessage from './components/NoMessage';

const Message = ({ route }) => {
  const { HisId, name } = route.params;
  const { userId } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [tbs, setTBS] = useState('');
  const [nomessage, setNoMessage] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.post(`/message/receive/${HisId}`, { senderId: userId });
        if (response.status === 200) {
          setMessages(response.data);
          setNoMessage(response.data.length === 0);
        }
      } catch (error) {
        console.log('Could not fetch messages', error);
      }
    };

    fetchMessages();

    // Polling for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [HisId, userId]);

  const sendMessage = async () => {
    if (!tbs.trim()) {
      console.log('Message cannot be empty');
      return;
    }

    const newMessage = {
      senderId: userId,
      message: tbs,
    };

    // Optimistically add the message to the state
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTBS('');

    try {
      const response = await axiosInstance.post(`/message/send/${HisId}`, {
        senderId: userId,
        message: tbs,
      });

      if (response.status !== 201) {
        console.log('Error sending message');
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexer}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>{name.charAt(0)}</Text>
        </View>
        <Text style={styles.namer}>{name}</Text>
      </View>

      {nomessage && <NoMessage />}

      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.TextBox,
              msg.senderId === userId ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.message}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputer}>
        <TextInput
          style={styles.messanger}
          placeholder="Enter your Message..."
          value={tbs}
          onChangeText={(text) => setTBS(text)}
        />
        <Pressable onPress={sendMessage}>
          <Image source={require('../assets/images/send.png')} style={styles.image} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  messagesContainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  TextBox: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
  },
  messageText: {
    color: 'white',
  },
  flexer: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  icon: {
    height: 50,
    width: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  iconText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  namer: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    paddingTop: 5,
  },
  inputer: {
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  messanger: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingLeft: 10,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 15,
  },
});

export default Message;
