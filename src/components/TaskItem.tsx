import { useState } from 'react';
import { type Task } from '../types/task';
import { updateTask, deleteTask } from '../lib/firestore';
import toast from 'react-hot-toast';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleToggleComplete = async () => {
    try {
      await updateTask(task.id, { completed: !task.completed });
      toast.success(`Task ${task.completed ? 'marked as incomplete' : 'marked as complete'}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
        toast.success('Task deleted successfully');
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title cannot be empty');
      return;
    }
    try {
      await updateTask(task.id, { title, description });
      setIsEditing(false);
      toast.success('Task updated successfully');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <li className={`p-4 rounded-md shadow-sm ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-2">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full px-2 py-1 border rounded-md"
          />
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full px-2 py-1 border rounded-md"
            rows={2}
          ></textarea>
          <div className="flex space-x-2">
            <button type="submit" className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={handleToggleComplete}
              className="w-5 h-5 mt-1 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <div>
              <h4 className={`font-bold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h4>
              {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
              <p className="text-xs text-gray-400">Created: {new Date(task.createdAt?.toDate()).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setIsEditing(true)} className="px-3 py-1 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600">Edit</button>
            <button onClick={handleDelete} className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
