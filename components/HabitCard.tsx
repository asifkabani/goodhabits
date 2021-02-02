import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Button,
  Card,
  Caption,
  Chip,
  Divider,
  Title,
} from "react-native-paper";

const TodoLabel = ({ text, time, frequency }) => (
  <>
    <Text>{text}</Text>
    {"\n"}
    {"\n"}
    <Caption>TIME</Caption>
    {"\n"}
    <Text>{time}</Text>
    {"\n"}
    {"\n"}
    <Caption>FREQUENCY</Caption>
    {"\n"}
    <Text>{frequency}</Text>
  </>
);

const HabitCard = ({ title, time, frequency, id }) => {
  return (
    <Card style={styles.container} key={id}>
      <Card.Content>
        <Title style={styles.title}>{title}</Title>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Chip>{frequency}</Chip>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    paddingBottom: 10,
    lineHeight: 25,
  },
});

export default HabitCard;
