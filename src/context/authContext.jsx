import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
const userContext = createContext();

const authContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          setLoading(false);
        }
        const response = await axios.get(
          "http://localhost:5000/api/auth/verify",
          {
            headers: {
              Authorization: `Barrer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setUser(response.data.userData);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <userContext.Provider value={{ user, login, logOut, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(userContext);
};

export default authContext;
