import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
const PrivateRoute = ({ children }) => {
  const {
    authState: { isAuth },
  } = useContext(AuthContext);

 

  
  if (!isAuth) {
    return <Navigate to="/login"/>
  } else {
    return children;
  }
};

export default PrivateRoute;
