import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  return <div>{isAuth ? children : null}</div>;
}

export default ProtectedRoute;
