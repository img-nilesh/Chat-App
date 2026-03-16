import { loginUser, registerUser } from "../api";

export const useAuth = () => {

  const login = async (data) => {
    const res = await loginUser(data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  };

  const register = async (data) => {
    const res = await registerUser(data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return { login, register, logout };
};