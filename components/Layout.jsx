import React from "react";
import { StyleSheet, View } from "react-native";
import { Headline } from "react-native-paper";

const Layout = ({ title, children }) => {
  return (
      <View style={styles.container}>
        <Headline style={styles.headline}>{title}</Headline>
        {children}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 0,
    flex: 1,
  },
  headline: {
    fontWeight: "bold",
    paddingBottom: 10,
  },
  spacing: {
    paddingBottom: 10,
  },
});

export default Layout;
