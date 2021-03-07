import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Chip, Title, useTheme } from "react-native-paper";

const HabitCard = ({ title, frequency, onEdit, onDelete }) => {
  const { colors } = useTheme();

  return (
    <Card style={styles.container} onPress={onEdit}>
      <Card.Content>
        <Title style={styles.title}>{title}</Title>
        <View style={styles.chipContainer}>
          <Chip>{frequency}</Chip>
          <Chip
            icon="delete"
            textStyle={{ color: colors.error }}
            onPress={onDelete}
          >
            Delete
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    paddingBottom: 10,
    lineHeight: 25,
  },
  delete: {},
  deleteText: {},
});

export default HabitCard;
