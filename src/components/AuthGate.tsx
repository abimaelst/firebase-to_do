import { useLayoutEffect, useState } from 'react';
import { onAuthStateChange } from '../lib/auth';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { type User } from 'firebase/auth';

const AuthGate = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet context={{ user }} />;
};

export default AuthGate;
