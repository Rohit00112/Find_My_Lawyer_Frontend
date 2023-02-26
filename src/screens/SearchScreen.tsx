import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Searchbar, Button, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const onChangeSearch = (query: any) => setSearchQuery(query);

  const [lawyers, setLawyers] = useState([
    {
      id: "1",
      name: "John Doe",
      speciality: "Criminal Lawyer",
      experience: "5 years",
      image: "https://picsum.photos/700",
      rating: 4.5,
    },
  ]);

  const handleLoadMore = () => {
    if (!hasMore) return;
    setPage(page + 1);
    setLoading(true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setLawyers([]);
  };

  useEffect(() => {
    const fetchLawyers = async () => {
      const response = await fetch(
        `https://lawyer-app-api.herokuapp.com/api/lawyers?page=${page}`
      );
      const data = await response.json();
      setLawyers([...lawyers, ...data.data]);
      setHasMore(data.data.length > 0);
      setLoading(false);
      setRefreshing(false);
    };
    fetchLawyers();
  }, [page]);

  const CardItem = ({ item }: any) => {
    return (
      <Card style={{ margin: 10 }}>
        <Card.Cover source={{ uri: item.image }} />
        <Card.Content>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>{item.specialization}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="star" size={16} color="gold" />
            <Text style={{ marginLeft: 5 }}>{item.rating}</Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for Lawyers"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ marginBottom: 10 }}
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {/* Horizontal List of Lawyers */}
      </ScrollView>
      <FlatList
        data={lawyers}
        keyExtractor={(item: any) => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" /> : null
        }
        renderItem={({ item }) => <CardItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
