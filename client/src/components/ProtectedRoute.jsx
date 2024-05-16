import { useEffect } from "react";
import { currentUser } from "../apis/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";

import Header from "./Header/Header";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      
      <Header/>
      <div>{children}</div>

    </div>
  );
}

export default ProtectedRoute;
