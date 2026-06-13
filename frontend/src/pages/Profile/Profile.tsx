import Button from "@/widgets/Button";
import Header from "@/widgets/Header";
import useAuth from "@/shared/hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";

const Profile = () => {
  const {user, logout, loading} = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if(!user) {
    return null
  }

  return (
    <div>
      <Header />
      <h1>Profile</h1>
      <h2>{user?.username}</h2>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Profile