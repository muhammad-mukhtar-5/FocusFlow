import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
     useEffect(() => {
     const storedUser = JSON.parse(localStorage.getItem("currentUser"));
     if (storedUser) setUser(storedUser);
   }, []);

    const signup = (username, password) => {

    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check duplicate
    const exists = users.find(u => u.username === username);
  
    if (exists) {
      return { success:false, message:"User already exists" };
    }
   
  
    const newUser = { username, password };
  
    users.push(newUser);
  
    localStorage.setItem("users", JSON.stringify(users));
  
    return { success:true };
  };
  // Login function
  
  const login = (username, password) => {
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const match = users.find(
      u => u.username === username && u.password === password
    );
  
    if (!match) {
      return { success:false, message:"Invalid credentials" };
    }
  
    localStorage.setItem("currentUser", JSON.stringify(match));
    setUser(match);
  
    return { success:true };
  };
  
  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };
  return (
  <AuthContext.Provider value={{ user, signup, login, logout }}>
    {children}
  </AuthContext.Provider>
);
};

  