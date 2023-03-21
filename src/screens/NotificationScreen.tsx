import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, FlatList } from "react-native";
import { Appbar, List, Divider } from "react-native-paper";

function NotificationScreen() {
  const translateY = useRef(new Animated.Value(500)).current;

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New job offer",
      description: "You have received a new job offer from XYZ law firm.",
      date: "Today",
      icon: { name: "briefcase-outline", color: "#FFC107" },
      isSeen: false,
    },
    {
      id: 2,
      title: "New message",
      description: "You have a new message from John Doe.",
      date: "Today",
      icon: { name: "email-outline", color: "#FFC107" },
      isSeen: false,
    },
    {
      id: 3,
      title: "New review",
      description: "You have a new review from John Doe.",
      date: "2 days ago",
      icon: { name: "star-outline", color: "#FFC107" },
      isSeen: true,
    },
  ]);

  const groupedNotifications = notifications.reduce((acc: any, curr) => {
    if (!acc[curr.date]) {
      acc[curr.date] = [];
    }
    acc[curr.date].push(curr);
    return acc;
  }, {});

  const notificationGroups = Object.entries(groupedNotifications).map(
    ([date, items]) => ({
      date,
      notifications: items,
    })
  );

  const markAsSeen = (id: number) => {
    const updatedNotifications = [...notifications];
    const notificationIndex = updatedNotifications.findIndex(
      (notification) => notification.id === id
    );
    if (notificationIndex !== -1) {
      updatedNotifications[notificationIndex].isSeen = true;
      setNotifications(updatedNotifications);
    }
  };

  const renderNotificationGroup = ({ item }: any) => (
    <>
      <Text style={styles.subheader}>{item.date}</Text>
      {item.notifications.map((notification: any) => (
        <List.Item
          key={notification.id}
          title={notification.title}
          description={notification.description}
          titleStyle={[styles.title, notification.isSeen && styles.seenTitle]}
          descriptionStyle={[
            styles.description,
            notification.isSeen && styles.seenDescription,
          ]}
          left={(props) => (
            <List.Icon
              {...props}
              icon={notification.icon.name}
              color={notification.icon.color}
            />
          )}
          onPress={() => markAsSeen(notification.id)}
        />
      ))}
    </>
  );

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Notifications" />
      </Appbar.Header>
      <FlatList
        data={notificationGroups}
        renderItem={renderNotificationGroup}
        keyExtractor={(item) => item.date}
        ItemSeparatorComponent={() => <Divider />}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    elevation: 0,
  },
  subheader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#000",
  },
  seenTitle: {
    color: "#999",
  },
  seenDescription: {
    color: "#999",
  },
});

export default NotificationScreen;
