import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
   full_name: string;
   email: string;
   username: string;
   role: string;
}

interface UserContextType {
   user: User | null;
   setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [user, setUser] = useState<User | null>(null);

   return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = (): UserContextType => {
   const context = useContext(UserContext);
   if (!context) {
      throw new Error('useUser must be used within a UserProvider');
   }
   return context;
};
