import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimeControl from "../components/DateTimeControl";
import DropdownPicker from "../components/DropDownPicker";
import { Task } from "../interface/task";
import { Status } from "../interface/status";
import { getTasks, saveTask } from "../utils/storage";
import { GuidGenerator } from "../utils/generator";


//VALIDACIJA 
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required.").min(10, "Title is too short."),
  date: Yup.date().required("Date is required.").nullable(),
  status: Yup.string().required("Status is required.").nullable(),
});

//SIFRANT Status-a
const statuses: Status[] = [
  { label: 'Created', value: 'created' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'progress' },
  { label: 'Done', value: 'done' },
];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const lastClick = useRef<number>(0);
  const lastId = useRef<string | null>(null);
  const formikRef = useRef<any>(null);

  //IZVEDI NA STARTU
  useEffect(() => {
    const loadInitialTasks = async () => {
      try {
        const storedTasks = await getTasks();
        if (storedTasks) setTasks(storedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadInitialTasks();
  }, []);

  //DOGODEK SAVE
  const handleSaveTask = async (values: any, { resetForm }: any) => {
    const taskData: Task = {
      id: values.id || GuidGenerator.short(), 
      title: values.title,
      completed: values.status === 'done',
      date: values.date,
      status: values.status
    };

    let updatedTasks;
    const existingIndex = tasks.findIndex(t => t.id === taskData.id);

    if (existingIndex > -1) {
      updatedTasks = [...tasks];
      updatedTasks[existingIndex] = taskData;
    } else {
      updatedTasks = [...tasks, taskData];
    }

    setTasks(updatedTasks);
    await saveTask(taskData);
    resetForm();
  };
 
  //KLIK NA BUTTON-U 
  const removeTask = async (id: string) => {
    const filtered = tasks.filter(t => t.id !== id);
    setTasks(filtered);
    // Logic for permanent deletion from storage can be added here
    if (formikRef.current?.values.id === id) {
        formikRef.current?.resetForm();
    }
  };
  // DVOKLIK NA IZBRANI ZAPIS KATERI GRE V EDIT
  const handleDoubleClick = (task: Task) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (now - lastClick.current < DOUBLE_PRESS_DELAY && lastId.current === task.id) {
      formikRef.current?.setValues({
        id: task.id,
        title: task.title,
        date: task.date ? new Date(task.date) : null,
        status: task.status
      });
    } else {
      lastClick.current = now;
      lastId.current = task.id || null;
    }
  };

  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === filterStatus);
  //FORMA UNOSA IN LIST-A
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      
      <Formik
        innerRef={formikRef}
        initialValues={{ id: null, title: '', date: null, status: '' }}
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

            <DateTimeControl
              label="Date"
              value={values.date}
              mode="date"
              onChange={(selectedDate) => setFieldValue('date', selectedDate)}
            />
            {touched.date && errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

            <DropdownPicker
              label="Task Status"
              data={statuses}
              value={values.status}
              labelField="label"
              valueField="value"
              onChange={(val) => setFieldValue('status', val)}
            />
            {touched.status && errors.status && <Text style={styles.errorText}>{errors.status}</Text>}

            <View style={{ marginTop: 15 }}>
              <Button 
                title={values.id ? "Update Task" : "Save Task"} 
                onPress={() => handleSubmit()} 
                color={values.id ? "#28a745" : "purple"} 
              />
            </View>
          </View>
        )}
      </Formik>

      <Text style={styles.subtitle}>Filter by Status:</Text>
      <View style={styles.filterContainer}>
        {['all', ...statuses.map(s => s.value)].map((status) => (
          <TouchableOpacity 
            key={status} 
            style={[styles.filterBtn, filterStatus === status && styles.filterBtnActive]}
            onPress={() => setFilterStatus(status)}
          >
            <Text style={[styles.filterText, filterStatus === status && styles.filterTextActive]}>
              {status.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>Your Tasks ({filteredTasks.length}):</Text>
      {filteredTasks.map((task) => (
        <View key={task.id} style={styles.listItem}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleDoubleClick(task)}
            style={styles.content}
          >
            <Text style={styles.taskTitle}>{task.title}</Text>
            <View style={styles.badgeContainer}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateText}>{task.date ? new Date(task.date).toLocaleDateString() : 'No date'}</Text>
              </View>
              <View style={[styles.statusBadge, task.status === 'done' ? styles.done : styles.pending]}>
                <Text style={styles.statusText}>{task.status}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => task.id && removeTask(task.id)} style={styles.deleteBtn}>
            <Text style={styles.deleteIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
// STILIZIRNJE
const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: "bold", textAlign: 'center', marginBottom: 20 },
  formWrapper: { marginBottom: 30, backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, elevation: 1 },
  inputBox: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 5, backgroundColor: '#fff' },
  subtitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10, color: '#333' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 10 },
  filterContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#F0F2F5', borderWidth: 1, borderColor: '#DDD' },
  filterBtnActive: { backgroundColor: 'purple', borderColor: 'purple' },
  filterText: { fontSize: 10, fontWeight: 'bold', color: '#666' },
  filterTextActive: { color: '#FFF' },
  listItem: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 15, padding: 16, marginBottom: 12, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  content: { flex: 1 },
  taskTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 },
  badgeContainer: { flexDirection: 'row', gap: 8 },
  dateBadge: { backgroundColor: '#F0F2F5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  dateText: { fontSize: 11, color: '#64748B', fontWeight: '500' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '600', color: '#444', textTransform: 'capitalize' },
  pending: { backgroundColor: '#FFF4E5' },
  done: { backgroundColor: '#E3F9E5' },
  deleteBtn: { backgroundColor: '#FFE5E5', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  deleteIcon: { color: '#FF3B30', fontSize: 14, fontWeight: 'bold' },
});
