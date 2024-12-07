import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  saveUser: () => {},
  logout: () => {},
  isLoading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/get-user`).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
        setIsLoading(false);
      }
    });
  }, []);

  function saveUser(user) {
    axios.post(`${import.meta.env.VITE_API_URL}/set-user`, user).then((res) => {
      if (res.status === 200) {
        setUser(user);
      }
    });
  }

  const logout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/logout`
      );
      if (res.status === 200) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, saveUser, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
