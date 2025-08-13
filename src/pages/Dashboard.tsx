import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useOutletContext } from 'react-router-dom';
import { type User } from 'firebase/auth';

const Dashboard = () => {
  const { user } = useOutletContext<{ user: User }>();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      <main className="container p-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <TaskForm user={user} />
          <TaskList user={user} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
