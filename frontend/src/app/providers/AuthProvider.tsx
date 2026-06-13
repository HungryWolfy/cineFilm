import {type PropsWithChildren, useEffect, useState} from "react";
import {AuthContext, type User} from "@/context/AuthContext.tsx";

const AuthProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const url = import.meta.env.VITE_API_URL

  const refreshToken = async () => {
    const response = await fetch(`${url}/api/refresh/`, {
      method: "POST",
      credentials: "include",
    })

    return response.ok
  }

  const fetchMe = async () => {
    try {
      let response = await fetch(`${url}/api/me/`, {
        credentials: "include",
      })

      if(response.status === 401) {
        const refreshed = await refreshToken()

        if(!refreshed) {
          setUser(null)
          setLoading(false)
          return
        }

        response = await fetch(`${url}/api/me/`, {
          credentials: "include",
        })
      }

      if(!response.ok) {
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
      await fetch(`${url}/api/logout/`, {
        method: 'POST',
        credentials: "include",
      })

      setUser(null)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMe()
  }, [])

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


