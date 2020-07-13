import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
const { width, height } = Dimensions.get("window");
interface Itodo {
  text: string;
  completed: boolean;
}
const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};

const storeDataList = async (list: Itodo[]) => {
  try {
    const jsonValue = JSON.stringify(list);
    console.log(jsonValue);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const storeData = async (list: Itodo[], value: Itodo) => {
  try {
    const data = await [...list, value];
    console.log(data);
    const jsonValue = JSON.stringify(data);
    console.log(jsonValue);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData: any = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e);
  }
};

export function Todos() {
  const [value, setValue] = useState<string>("");
  const [toDosList, setToDos] = useState<Itodo[]>([]);
  const [error, setError] = useState<Boolean>(false);
  useEffect(() => {
    const fn = async () => {
      console.log("here");
      const data = await getData();
      console.log(data);
      setToDos(data);
    };
    fn();
  }, []);
  const handleSubmit = (): void => {
    if (value.trim()) {
      const newData = { text: value, completed: false };
      storeData(toDosList, newData);
      setToDos([...toDosList, newData]);
    } else {
      setError(true);
    }
    setValue("");
  };

  const removeItem = (index: number): void => {
    const fn = async () => {
      const changedTodos = await toDosList.filter(
        (todo: Itodo, ind: number) => {
          return ind !== index;
        }
      );
      setToDos(changedTodos);
      storeDataList(toDosList);
    };
    fn();
  };

  const toggleComplete = (index: number): void => {
    const fn = async () => {
      const changedTodos = await toDosList.map((todo: Itodo, ind: number) => {
        if (index === ind) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      setToDos(changedTodos);
      storeDataList(toDosList);
    };
    fn();
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
      {(toDosList === null || toDosList.length === 0) && (
        <Text>No to do task available</Text>
      )}
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
