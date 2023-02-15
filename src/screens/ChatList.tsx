import React, { useState } from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Text,
  Button,
  List,
  TouchableRipple,
  Searchbar,
} from "react-native-paper";

export default function ChatList({ navigation }: any) {
  const [data, setData] = useState([
    {
      id: "1",
      name: "John Doe",
      message: "Hey there! How are you doing?",
      time: "9:30 AM",
      unread: true,
      avatar: "",
    },
    {
      id: "2",
      name: "Jane Doe",
      message: "Hey! I just wanted to check in.",
      time: "8:45 AM",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1556740752-6a3a7d7b0f8a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FycmF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "3",
      name: "Bob Smith",
      message: "Are we still on for tonight?",
      time: "7:00 PM",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1556740752-6a3a7d7b0f8a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FycmF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "4",
      name: "Sarah Johnson",
      message: "Can you send me the details again?",
      time: "5:30 PM",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1556740752-6a3a7d7b0f8a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FycmF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ]);

  const handlePress = () => {
    navigation.navigate("ChatScreen", {
      data: data,
    });
  };

  const [searchQuery, setSearchQuery] = useState("");

  const renderItem = ({ item }: any) => (
    <TouchableRipple onPress={handlePress}>
      <List.Item
        title={item.name}
        description={item.message}
        left={(props) => <Avatar.Image size={50} source={item.avatar} />}
        right={(props) => (
          <View style={styles.rightContainer}>
            <Text style={styles.time}>{item.time}</Text>
            {item.unread && (
              <View style={styles.unread}>
                <Text style={styles.unreadText}>New</Text>
              </View>
            )}
          </View>
        )}
      />
    </TouchableRipple>
  );

  const filterData = (text: any) => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => {
          setSearchQuery(text);
          filterData(text);
        }}
        value={searchQuery}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    marginRight: 10,
  },
  unread: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 5,
  },
  unreadText: {
    color: "#fff",
  },
});
