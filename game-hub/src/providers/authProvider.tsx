import { ReactNode, useState } from "react";
import avatarUrl from "../assets/avatars/1.jpg";
import AuthContext from "../contexts/authContext";
import { User } from "../models/user";

export const demoUser: User = {
  id: 1,
  username: "khanhn",
  firstName: "Khanh",
  lastName: "Nguyen",
  avatar: avatarUrl,
};

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>(demoUser);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
