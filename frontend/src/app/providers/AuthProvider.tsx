import {type PropsWithChildren, useEffect, useState} from "react";
import {AuthContext, type User} from "@/context/AuthContext.tsx";

const AuthProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const url = import.meta.env.VITE_API_URL

  const fetchMe = async () => {
    try {
      const response = await fetch(`${url}/api/me/`, {
        credentials: "include",
      })

      if (!response.ok) {
        setUser(null)
        setLoading(false)
        return
      }

      const data = await response.json()

      setUser(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setUser(null)
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const response = await fetch(`${url}/api/logout/`, {
        method: 'POST',
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Logout failed")
      }

      setUser(null)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMe()
  }, [url])

  const value = {
    user: user,
    loading: loading,
    logout: logout,
    fetchMe: fetchMe,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider


