// import { createContext, useContext, useState, type ReactNode } from "react";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   loginUser: (accessToken: string, refreshToken: string, role: string) => void;
//   logoutUser: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {

//   const [isAuthenticated, setIsAuthenticated] = useState(
//     !!localStorage.getItem("accessToken")
//   );

//   const loginUser = (accessToken: string, refreshToken: string, role: string) => {

//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     localStorage.setItem("role", role);

//     setIsAuthenticated(true);
//   };

//   const logoutUser = () => {

//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");

//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {

//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }

//   return context;
// };

import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ HOOK (TRÈS IMPORTANT)
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};