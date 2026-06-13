import {createContext} from "react";

type Profile = {
  avatar: string | null
}

export type User = {
  id: number,
  username: string,
  email: string,
  profile: Profile,
}

type AuthContextType = {
  user: User | null,
  loading: boolean,
  fetchMe: () => Promise<void>,
  logout: () => Promise<void>,
}



export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  fetchMe: async () => {},
  logout: async () => {},
})