import React from "react";
import { User } from "../models/user";

interface AuthContextType {
  user?: User;
  setUser: (user?: User) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
});

export default AuthContext;
