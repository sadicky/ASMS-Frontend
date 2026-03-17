import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { logout } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

const Logout = () => {

  const { logoutUser } = useAuth();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {

    const doLogout = async () => {

      try {
        await logout(); // appel API NestJS
      } catch (e) {
        console.log("Logout API error", e);
      }

      // supprimer tokens
      logoutUser();

      // activer redirection
      setRedirect(true);
    };

    doLogout();

  }, []);

  // redirection sûre
  if (redirect) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      Logging out...
    </div>
  );
};

export default Logout;