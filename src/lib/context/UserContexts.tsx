// src/context/UserContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// User interface to represent the user object
interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile_picture: string;
  address?: string;
  phone?: string;
  date_of_birth?: string;
  avatar: string;
}

// User context interface
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => void;
}

// Create the UserContext with default undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook to use the UserContext in components
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// UserProvider component that wraps around your app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to fetch user data from the backend
  const fetchUser = async () => {
    try {
      const response = await axios.get('https://blockchainbinaryopt.shop/payfly/backend/api/current_user.php');
      if (response.data && response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null); // User not found or not logged in
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null); // Set user to null in case of error
    }
  };

  // Fetch the user when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
