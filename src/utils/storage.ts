import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../interface/task";

const STORAGE_KEY = 'tasks';


export const getTasks = async (): Promise<Task[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Reading erro", e);
    return [];
  }
};


export const saveTask = async (task: Task): Promise<{ ok: boolean }> => {
  try {
    const tasks = await getTasks();
    const newId = tasks.length > 0 
      ? Math.max(...tasks.map((item: Task) => item.id || 0)) + 1 
      : 1;


    const newTask = { 
      id: newId, 
      title: task.title, 
      date: task.date,
      status: task.status 
    };
    const updatedTasks = [...tasks, newTask];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    return { ok: true };
  } catch (e) {
    console.error("Error saving", e);
    return { ok: false };
  }
};


export const removeTask = async (id: number): Promise<void> => {
  const tasks = await getTasks();
  const filteredTasks = tasks.filter(t => t.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
};