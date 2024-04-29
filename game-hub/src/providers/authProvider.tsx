import { ReactNode, useState } from "react";
import avatarUrl from "../assets/avatars/1.jpg";
import AuthContext from "../contexts/authContext";
import { User } from "../models/user";

export const demoUser: User = {
  id: 1,
  username: "demo",
  password: "demo",
  gender: "male",
  firstName: "Khanh",
  lastName: "Nguyen",
  jobTitle: "Software Engineer",
  email: "khanh.p.nguyen@outlook.com",
  phone: "(641)-451-3937",
  avatar: avatarUrl,
  attributes: [
    { name: "Java", value: "Advanced" },
    { name: "Microservices", value: "Intermediate" },
    { name: "Angular", value: "Intermediate" },
    { name: "React", value: "Beginner" },
  ],
};

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
