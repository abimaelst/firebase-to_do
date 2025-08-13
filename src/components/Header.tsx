import { useNavigate } from 'react-router-dom';
import { logOut } from '../lib/auth';
import toast from 'react-hot-toast';
import { type User } from 'firebase/auth';

interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container flex items-center justify-between p-4 mx-auto">
        <h1 className="text-xl font-bold">Firebase To-Do</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
