import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, HelperText, TextInput, Button } from "react-native-paper";

const AddHabit = ({
  habitName,
  onChangeText,
  frequency,
  setFrequency,
  error,
  errorText,
  handleCancel,
  handleOK,
}) => {
  return (
    <Card style={styles.container}>
      <Card.Content>
        <TextInput
          required={true}
          mode="outlined"
          label="Habit *"
          value={habitName}
          error={error}
          onChangeText={onChangeText}
        />
        {error && <HelperText type="error">{errorText}</HelperText>}
        <TextInput
          mode="outlined"
          label="Frequency"
          value={frequency}
          caretHidden={true}
          disabled={true}
        />
        <Card.Actions>
          <Button onPress={handleCancel}>Cancel</Button>
          <Button onPress={handleOK}>OK</Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3b3b3b",
    marginBottom: 5,
  },
});

export default AddHabit;
