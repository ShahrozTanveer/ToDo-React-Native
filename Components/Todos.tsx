import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
interface Itodo {
  text: string;
  completed: boolean;
}
export function Todos() {
  const [value, setValue] = useState<string>("");
  const [toDosList, setToDos] = useState<Itodo[]>([]);
  const [error, setError] = useState<Boolean>(false);

  const handleSubmit = (): void => {
    if (value.trim()) {
      setToDos([...toDosList, { text: value, completed: false }]);
    } else {
      setError(true);
    }
    setValue("");
  };

  const removeItem = (index: number): void => {
    const changedTodos = toDosList.filter((todo: Itodo, ind: number) => {
      return ind !== index;
    });
    setToDos(changedTodos);
  };

  const toggleComplete = (index: number): void => {
    const changedTodos = toDosList.map((todo: Itodo, ind: number) => {
      if (index === ind) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setToDos(changedTodos);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Your ToDo..."
          value={value}
          onChangeText={(e) => {
            setValue(e);
            setError(false);
          }}
          style={styles.inputBox}
        />
        <Button title="Add Task" onPress={handleSubmit} color="#30336b" />
      </View>
      {error && <Text style={styles.error}>Error: ToDo Field is empty.</Text>}
      <Text style={styles.subtitle}>Your Tasks :</Text>
      {toDosList.length === 0 && <Text>No to do task available</Text>}
      {toDosList.map((toDo: Itodo, index: number) => (
        <View style={styles.listItem} key={`${index}_${toDo.text}`}>
          <Text
            style={[
              styles.task,
              {
                textDecorationLine: toDo.completed ? "line-through" : "none",
                fontWeight: toDo.completed ? "300" : "normal",
              },
            ]}
          >
            {toDo.text}
          </Text>
          <Button
            title={toDo.completed ? "Completed" : "Complete"}
            onPress={() => toggleComplete(index)}
            color="#30336b"
          />
          <Button
            title="X"
            onPress={() => {
              removeItem(index);
            }}
            color="#d63031"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    // justifyContent: "center",
    // backgroundImage: image,
    alignItems: "center",
    backgroundColor: "black",
    height: height,
    width: width,
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputBox: {
    width: 200,
    borderColor: "#130f40",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
    color: "#686de0",
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#4834d4",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "#a29bfe",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  addButton: {
    alignItems: "flex-end",
  },
  task: {
    width: 200,
    color: "#686de0",
  },
  error: {
    color: "#e056fd",
  },
});
