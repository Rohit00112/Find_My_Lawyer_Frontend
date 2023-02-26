import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import {
  IconButton,
  Text,
  TextInput,
  Avatar,
  Caption,
  Title,
} from "react-native-paper";
import moment from "moment";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hey, what's up?",
      createdAt: new Date(),
      sender: {
        id: 2,
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=38",
      },
    },
  ]);
  const scrollViewRef = useRef<any>();

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        id: Math.random().toString(36).substr(2, 9),
        text: message.trim(),
        createdAt: new Date(),
        sender: {
          id: 1,
          name: "John Doe",
          avatar: "https://i.pravatar.cc/150?img=37",
        },
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.header}>
        <Avatar.Image
          source={{ uri: "https://i.pravatar.cc/150?img=38" }}
          size={40}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Title style={styles.userName}>Jane Smith</Title>
          <Caption style={styles.lastSeen}>Last seen 10 minutes ago</Caption>
        </View>
        <IconButton icon="phone" onPress={() => {}} />
        <IconButton icon="video" onPress={() => {}} />
        <IconButton icon="dots-vertical" onPress={() => {}} />
      </View>
      <FlatList
        ref={scrollViewRef}
        data={messages}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <MessageBubble message={item} isMe={item.sender.id === 1} />
        )}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <IconButton icon="camera" onPress={() => {}} />
        <TextInput
          style={styles.textInput}
          mode="flat"
          placeholder="Type a message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <IconButton icon="microphone" onPress={() => {}} />
        <IconButton
          icon="send"
          disabled={message.trim() === ""}
          onPress={sendMessage}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const MessageBubble = ({ message, isMe }: any) => {
  return (
    <View
      style={[
        styles.messageBubble,
        isMe ? styles.sentBubble : styles.receivedBubble,
      ]}
    >
      {!isMe && (
        <Avatar.Image
          source={{ uri: message.sender.avatar }}
          size={30}
          style={styles.avatar}
        />
      )}
      <View style={styles.messageContent}>
        <Text style={styles.messageText}>{message.text}</Text>
        <Caption style={styles.messageTime}>
          {moment(message.createdAt).format("LT")}
        </Caption>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastSeen: {
    fontSize: 14,
    color: "#666",
  },
  messagesContainer: {
    padding: 16,
  },
  messageBubble: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sentBubble: {
    justifyContent: "flex-end",
  },
  receivedBubble: {
    justifyContent: "flex-start",
  },
  messageContent: {
    maxWidth: "80%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  textInput: {
    flex: 1,
    marginRight: 16,
  },
});

export default ChatScreen;
