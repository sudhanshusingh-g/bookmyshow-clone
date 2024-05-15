import { useEffect } from "react";
import { currentUser } from "../apis/users"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";
import { FiLogOut } from "react-icons/fi";

function ProtectedRoute({children}) {
    const {user}=useSelector((state)=>state.users);
    const navigate=useNavigate();
    const dispatch=useDispatch();
     const getCurrentUser = async () => {
       try {
         dispatch(ShowLoading());
         const response = await currentUser(); 
         dispatch(HideLoading());

         if (response.success) {
           dispatch(setUser(response.data));
         } else {
           dispatch(setUser(null));
           console.error(response.message);
           localStorage.removeItem("token");
           navigate("/login");
         }
       } catch (error) {
         dispatch(HideLoading());
         dispatch(setUser(null));
         console.error(error.message);
       }
     };

    useEffect(()=>{
        if(localStorage.getItem("token")){
            getCurrentUser();
        }
        else{
            navigate("/login");
        }
    },[])

    return(
      user && (
      <div>
        <div>
          <h1>Book any Show</h1>
          <p onClick={()=>{
            if(user.isAdmin){
              navigate("/admin");
            }
            else{
              navigate("/profile");
            }
          }}>{user.name.toUpperCase()}</p>
          <span onClick={()=>{
            localStorage.removeItem("token");
            navigate("/login");
          }}><FiLogOut/> Logout</span>
        </div>
        <div>
          {children}
        </div>
      </div>
    
    )
    );
  
}

export default ProtectedRoute