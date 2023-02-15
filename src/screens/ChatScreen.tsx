import React, { useState } from "react";
import { View, FlatList, StyleSheet, TextInput } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";

const ChatScreen = ({ route }: any) => {
  console.log(route.param);

  const { name, avatar } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, type: "received", text: "Hi there!" },
    { id: 2, type: "sent", text: "Hello! How are you?" },
    { id: 3, type: "received", text: "I am good, thanks for asking!" },
  ]);
  const [typing, setTyping] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleSend = () => {
    setMessages([
      ...messages,
      { id: Math.random(), type: "sent", text: message },
    ]);
    setMessage("");
  };

  const handleShareDocument = () => {
    DocumentPicker.getDocumentAsync()
      .then((document: any) => {
        setSelectedDocument(document);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderMessage = ({ item }: any) => {
    if (item.type === "received") {
      return (
        <View style={styles.receivedMessage}>
          <Text>{item.text}</Text>
        </View>
      );
    }
    return (
      <View style={styles.sentMessage}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  const handleDeleteDocument = () => {
    setSelectedDocument(null);
  };
  return (
    <View style={styles.container}>
      <FlatList data={messages} renderItem={renderMessage} />
      {typing && (
        <View style={styles.typingIndicator}>
          <Text>{name} is typing...</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        {selectedDocument && (
          <View style={styles.selectedDocumentContainer}>
            <IconButton
              icon="close"
              size={24}
              onPress={handleDeleteDocument}
              style={styles.deleteDocumentButton}
            />
          </View>
        )}
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          onFocus={() => setTyping(true)}
          onBlur={() => setTyping(false)}
          style={styles.input}
        />
        <Button style={styles.sendButton} mode="contained" onPress={handleSend}>
          Send
        </Button>
        <IconButton icon="paperclip" size={24} onPress={handleShareDocument} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  receivedMessage: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginRight: 60,
    marginTop: 20,
  },
  sentMessage: {
    backgroundColor: "#aaa",
    padding: 10,
    borderRadius: 20,
    alignSelf: "flex-end",
    marginLeft: 60,
    marginBottom: 20,
  },
  typingIndicator: {
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  inputContainer: {
    height: 60,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#4caf50",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDocumentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 15,
    height: 30,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  selectedDocumentName: {
    fontSize: 14,
  },
  deleteDocumentButton: {
    height: 30,
    width: 60,
    borderRadius: 15,
    backgroundColor: "#f44336",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatScreen;
