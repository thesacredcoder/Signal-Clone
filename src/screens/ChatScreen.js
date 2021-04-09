import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import * as firebase from "firebase";

function ChatScreen({ navigation, route }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

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
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data,
          }))
        )
      );

    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.insideContainer}
        // keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) => {
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar
                      rounded
                      size={30}
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View style={styles.sender}>
                    <Avatar
                      rounded
                      size={30}
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.senderText}>{data.messages}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                );
              })}
            </ScrollView>

            <View style={styles.footer}>
              <TextInput
                placeholder="Type here"
                style={styles.textInput}
                value={input}
                onSubmitEditing={sendMessage}
                onChangeText={(text) => setInput(text)}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  headerText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "700",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 20,
  },
  insideContainer: {
    flex: 1,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  sender: {
    padding: 15,
    backgroundColor: "#2868E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});

export default ChatScreen;
