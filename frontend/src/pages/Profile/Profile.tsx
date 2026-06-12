import Button from "@/widgets/Button";
import Header from "@/widgets/Header";
import useAuth from "@/shared/hooks/useAuth.ts";

const Profile = () => {
  const {logout} = useAuth()

  return (
    <div>
      <Header />
      <h1>Profile</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default Profile