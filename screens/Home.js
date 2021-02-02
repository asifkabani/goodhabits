import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

const HomeScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require("./assets/bg1.png")}
        style={styles.image}
      > */}
      <Text style={styles.logo}>Good Habits</Text>
      <Text>{route?.params?.post}</Text>
      <TextInput
        textContentType="username"
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        textContentType="password"
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("Dashboard", {
            itemId: 86,
            otherParams: "anything you want",
          })
        }
      >
        Go dashboard
      </Button>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2345FF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
  },
  input: {
    width: 300,
    marginBottom: 4,
  },
  image: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
});

export default HomeScreen;
