import { useSelector } from "react-redux";


function Profile() {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="">
      <h1>Account Information</h1>
      
      {user.name}
    </div>
  );
}

export default Profile