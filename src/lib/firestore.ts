import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Task } from '../types/task';

const tasksCollection = collection(db, 'tasks');

export const addTask = (userId: string, title: string, description?: string) => {
  return addDoc(tasksCollection, {
    userId,
    title,
    description: description || '',
    completed: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateTask = (id: string, data: Partial<Omit<Task, 'id' | 'userId'>>) => {
  const taskDoc = doc(db, 'tasks', id);
  return updateDoc(taskDoc, { ...data, updatedAt: serverTimestamp() });
};

export const deleteTask = (id: string) => {
  const taskDoc = doc(db, 'tasks', id);
  return deleteDoc(taskDoc);
};

export const getTasks = (userId: string, callback: (tasks: Task[]) => void) => {
  const q = query(
    tasksCollection, 
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (querySnapshot) => {
    const tasks: Task[] = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() } as Task);
    });
    callback(tasks);
  });
};
