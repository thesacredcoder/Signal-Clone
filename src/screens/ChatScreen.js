import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

function ChatScreen({ navigation, route }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri:
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
          />
          <Text style={styles.headerText}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{ marginLeft: 10 }}
        >
          <AntDesign name="arrowleft" color="white" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {},
  headerText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "700",
  },
});

export default ChatScreen;
