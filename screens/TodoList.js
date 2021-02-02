import React, { useState } from "react";
import { View, Image, FlatList, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Text,
  Button,
  Card,
  Checkbox,
  Caption,
  FAB,
  Appbar,
} from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const TodoList = ({ route, navigation }) => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 0,
      name: "text goes here",
      complete: false,
      time: "7:45 AM",
      frequency: "Daily",
    },
    {
      id: 1,
      name: "text goes here",
      complete: false,
      time: "9:00 AM",
      frequency: "Weekly",
    },
    {
      id: 2,
      name: "text goes here",
      complete: false,
      time: "7:45 AM",
      frequency: "Monthly",
    },
  ]);
  const [error, setError] = useState(false);

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

  const onChangeText = (text) => {
    if (error) {
      setError(!error);
    }

    setText(text);
  };

  const addTodo = (text, id) => {
    if (text.length <= 0) {
      setError(true);
      return;
    }

    setTodos([...todos, { id: todos.length++, name: text, complete: false }]);
    setText("");
  };

  const markTodo = (index) => {
    const arr = todos.map((item, i) => {
      if (i === index) {
        return { ...item, complete: !item.complete };
      } else return { ...item };
    });

    setTodos(arr);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => console.log("action")} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" onPress={() => console.log("action")} />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => console.log("action")}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <TextInput
          label="Habit name"
          value={text}
          onChangeText={onChangeText}
          error={error}
          style={{ width: 200 }}
        />
        <TextInput
          label="Time"
          value={text}
          onChangeText={onChangeText}
          error={error}
          style={{ width: 200 }}
        />
        <TextInput
          label="Frequency"
          value={text}
          onChangeText={onChangeText}
          error={error}
          style={{ width: 200 }}
        />
        {error && <Text style={{ color: "red" }}>Error</Text>}
        <Button mode="contained" onPress={() => addTodo(text)}>
          Add
        </Button>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Card style={{ margin: 5 }}>
              <Checkbox.Item
                label={
                  <TodoLabel
                    text={item.name}
                    time={item.time}
                    frequency={item.frequency}
                  />
                }
                status={item.complete ? "checked" : "unchecked"}
                onPress={() => markTodo(item.id)}
                style={{ padding: 15 }}
              />
            </Card>
          )}
        />
        <FAB icon="plus" onPress={() => alert("pressed")} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2345FF",
    flex: 1,
    alignItems: "center",
  },
  logo: {
    marginTop: 50,
    width: 200,
    height: 100,
  },
});

export default TodoList;
