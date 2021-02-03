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

const HabitCard = ({ title, time, frequency, onEdit }) => {
  return (
    <Card style={styles.container} onPress={onEdit}>
      <Card.Content>
        <Title style={styles.title}>{title}</Title>
        <View style={styles.chipContainer}>
          <Chip>{frequency}</Chip>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    paddingBottom: 10,
    lineHeight: 25,
  },
});

export default HabitCard;
