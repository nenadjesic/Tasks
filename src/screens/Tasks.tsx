import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimeControl  from "../components/DateTimeControl";
import DropdownPicker from "../components/DropDownPicker";
import { Task } from "../interface/task"
import { Status } from "../interface/status";
import { getTasks, saveTask } from "../utils/storage";
 


const validationSchema = Yup.object().shape({
  title: Yup.string().required("Naslov je obvezen").min(10, "Prekratko"),
  date: Yup.date().required("Datum je obvezen").nullable(),
  status: Yup.string().required("Izberite status").nullable(),
});




export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    getTasks();
  }, []);

  
  const statuses: Status[] = [
    { label: 'Created', value: 'created' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'progress' },
    { label: 'Done', value: 'done' },
  ];


  const handleSaveTask = async (values: any, { resetForm }: any) => {
    const newTask: Task = {
      id: null,
      title: values.title,
      completed: false,
      date: values.date,
      status: values.status
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTask(newTask);
    resetForm();
  };

  const removeTask = async (id: number) => {
    const filtered = tasks.filter(t => t.id !== id);
    setTasks(filtered);
    removeTask(id);
 };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      <Formik
        initialValues={{ title: '', date: null, status: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSaveTask}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.formWrapper}>
            <TextInput
              style={styles.inputBox}
              placeholder="Task Title"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
            
            <DateTimeControl label="Time" value={values.date}  mode="date" onChange={(selectedDate) => setFieldValue('date', selectedDate)} />
            {touched.date && errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

            <DropdownPicker label="Status zadatka" data={statuses} value={values.status}labelField="label" valueField="value" onChange={(val) => setFieldValue('status', val)} />
            {touched.status && errors.status && <Text style={styles.errorText}>{errors.status}</Text>}
       
            <View style={{ marginTop: 10 }}>
              <Button title="Save Task" onPress={() => handleSubmit()} color="purple" />
            </View>
          </View>
        )}
      </Formik>

      <Text style={styles.subtitle}>Your Tasks:</Text>
      {tasks.map((task) => (
        <View key={task.id} style={styles.listItem}>
          <View>
            <Text style={styles.taskText}>{task.title}</Text>
            <Text style={styles.statusTag}>{task.date}</Text>
            <Text style={styles.statusTag}>{task.status}</Text>
          </View>
          <Button title="X" onPress={() => removeTask(task.id!)} color="crimson" />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: 'center', marginBottom: 20 },
  formWrapper: { marginBottom: 30, backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10 },
  inputBox: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 5 },
  subtitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 5, elevation: 2 },
  taskText: { fontSize: 16, fontWeight: '500' },
  statusTag: { fontSize: 12, color: 'gray' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 10 },
  error: { color: "red" }
});
