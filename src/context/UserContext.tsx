import React, { createContext, useEffect, useState } from "react";
import { fetchUser } from "../services/userService";
import { User } from "../types/user";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetchUser();
      setUser(userData);
      setLoading(false);
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
