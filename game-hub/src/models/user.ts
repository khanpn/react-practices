export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender?: "male" | "female";
  jobTitle?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  attributes?: { name: string; value: string }[];
}
