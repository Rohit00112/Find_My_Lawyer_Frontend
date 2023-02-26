import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Searchbar, Text, List, Avatar, Badge } from "react-native-paper";

const DATA = [
  {
    id: "1",
    name: "John Doe",
    message: "Hey, what's up?",
    time: "11:30 AM",
    avatar: "https://i.pravatar.cc/150?img=37",
    seen: false,
    date: "Yesterday",
  },
  {
    id: "2",
    name: "Jane Smith",
    message: "Can you send me the files?",
    time: "10:45 AM",
    avatar: "https://i.pravatar.cc/150?img=38",
    seen: true,
    date: "Yesterday",
  },
  {
    id: "3",
    name: "Bob Johnson",
    message: "Thanks for the help!",
    time: "9:00 AM",
    avatar: "https://i.pravatar.cc/150?img=39",
    seen: true,
    date: "2 days ago",
  },
];

export default function ChatList({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: any) => setSearchQuery(query);

  const renderItem = ({ item }: any) => (
    <List.Item
      title={item.name}
      description={item.message}
      left={() => <Avatar.Image source={item.avatar} size={50} />}
      right={() => (
        <View style={styles.rightContainer}>
          <View style={styles.rightTop}>
            {item.isNew ? (
              <View style={styles.unseenContainer}>
                <Badge style={styles.unseenBadge} />
                <Text style={styles.unseenText}>New</Text>
              </View>
            ) : item.seen ? (
              <Text style={styles.seenText}>{item.time}</Text>
            ) : (
              <View style={styles.unseenContainer}>
                <Badge style={styles.unseenBadge}>New</Badge>
                <Text style={styles.unseenText}>{item.time}</Text>
              </View>
            )}
          </View>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      )}
      onPress={() =>
        navigation.navigate("ChatScreen", {
          name: item.name,
          avatar: item.avatar,
        })
      }
    />
  );

  const filteredData = DATA.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  searchBar: {
    marginVertical: 16,
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  rightTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  unseenContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unseenBadge: {
    backgroundColor: "#2979FF",
    marginRight: 8,
  },
  unseenText: {
    fontSize: 12,
    color: "#757575",
  },
  seenText: {
    fontSize: 12,
    color: "#757575",
    marginRight: 8,
  },
  date: {
    fontSize: 12,
    color: "#757575",
    marginTop: 4,
  },
});
