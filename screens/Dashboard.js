import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

const DashboardScreen = ({ route, navigation }) => {
  const { itemId, otherParams } = route.params;
  const [postText, setPostText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Dashboard Page</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParams: {JSON.stringify(otherParams)}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Home", { post: postText })}
      >
        Submit
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate("Home")}>
        Go home
      </Button>
      <Button mode="contained" onPress={() => navigation.goBack("Home")}>
        Go back
      </Button>
      <Button mode="contained" onPress={() => navigation.popToTop()}>
        Go back to first screen in stack
      </Button>
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
});

export default DashboardScreen;
