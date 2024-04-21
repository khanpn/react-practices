import React from "react";
import { User } from "../models/user";

interface AuthContextType {
  user?: User;
}

const AuthContext = React.createContext<AuthContextType>({
  user: undefined,
});

export default AuthContext;
