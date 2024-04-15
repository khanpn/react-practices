import React from "react";
import { User } from "../models/user";

interface SecurityContextData {
  loggedInUser?: User;
}

const SecurityContext = React.createContext<SecurityContextData>({
  loggedInUser: undefined,
});

export default SecurityContext;
