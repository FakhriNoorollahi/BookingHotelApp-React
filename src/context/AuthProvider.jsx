import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

function AuthReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuth: true,
      };

    case "logout":
      return {
        user: null,
        isAuth: false,
      };
    default:
      return "Error";
  }
}

const FAKE_USER = {
  name: "PersiaRose",
  email: "user@gmail.com",
  password: "1234",
};
const InitState = {
  user: null,
  isAuth: false,
};

export default function AuthProvider({ children }) {
  const [{ isAuth, user }, dispatch] = useReducer(AuthReducer, InitState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ login, logout, isAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
