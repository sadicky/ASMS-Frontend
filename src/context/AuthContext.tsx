import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: (accessToken: string, refreshToken: string, role: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  const loginUser = (accessToken: string, refreshToken: string, role: string) => {

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", role);

    setIsAuthenticated(true);
  };

  const logoutUser = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};