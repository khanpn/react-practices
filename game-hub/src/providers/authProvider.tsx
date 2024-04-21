import { ReactNode } from "react";
import avatarUrl from "../assets/avatars/1.jpg";
import AuthContext from "../contexts/authContext";
import { User } from "../models/user";

const user: User = {
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
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
