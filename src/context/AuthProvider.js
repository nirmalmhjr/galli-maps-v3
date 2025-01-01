import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // const [auth,setAuth] = useState({})
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // const role = sessionStorage.getItem("role");

    if (token) {
      //   setAuth(token, role);
      setAuth(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
