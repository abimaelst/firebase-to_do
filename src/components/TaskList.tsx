import { useEffect, useState } from 'react';
import { getTasks } from '../lib/firestore';
import { type User } from 'firebase/auth';
import { type Task } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  user: User;
}

const TaskList = ({ user }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const unsubscribe = getTasks(user.uid, (tasks) => {
        setTasks(tasks);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-lg font-bold">Your Tasks</h3>
      {tasks.length === 0 ? (
        <p className="text-gray-500">You have no tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
