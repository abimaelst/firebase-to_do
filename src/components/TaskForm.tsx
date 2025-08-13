import { useState } from 'react';
import { addTask } from '../lib/firestore';
import { type User } from 'firebase/auth';
import toast from 'react-hot-toast';

interface TaskFormProps {
  user: User;
}

const TaskForm = ({ user }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (user) {
      console.log('User UID:', user.uid);
      try {
        await addTask(user.uid, title, description);
        setTitle('');
        setDescription('');
        toast.success('Task added successfully!');
      } catch (err: any) {
        console.error('Error adding task:', err);
        toast.error(err.message);
      }
    } else {
      toast.error('User not authenticated. Please log in.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-8 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-lg font-bold">Add New Task</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={120}
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <button type="submit" className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
