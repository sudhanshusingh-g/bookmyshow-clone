import { useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Header() {
  const { user } = useSelector((state) => state.users);
  const[showLogout,setShowLogout]=useState(false);
  const navigate = useNavigate();
  const logoutRef=useRef(null);


  useEffect(()=>{
    function handleClickOutside(event){
      if(logoutRef.current && !logoutRef.current.contains(event.target)){
        setShowLogout(false);
      }
    }

    document.addEventListener("click",handleClickOutside);

    return ()=>{
      document.removeEventListener("click",handleClickOutside);
    }
  },[])

  
  return (
    <div className="bg-red-400 flex justify-between items-center p-4">
      <h1
        className="text-white text-2xl cursor-pointer font-sans"
        onClick={() => {
          navigate("/");
        }}
      >
        bookmyshow
      </h1>
      <div className="flex items-center relative" ref={logoutRef}>
        <p className="flex items-center gap-1 p-1 border rounded-xl bg-white cursor-pointer">
          <CiUser
            onClick={() => {
              if (user.isAdmin) {
                navigate("/admin");
              } else {
                navigate("/profile");
              }
            }}
          />
          <FaCaretDown onClick={() => setShowLogout(!showLogout)} />
        </p>
        {showLogout && (
          <span
            className="flex items-center absolute top-8 right-0 bg-white p-2 rounded shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            {" "}
            Logout
          </span>
        )}
      </div>
    </div>
  );
}

export default Header;
