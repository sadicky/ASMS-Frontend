import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: JSX.Element;
  roles: string[];
}

const RoleGuard = ({ children, roles }: Props) => {

  const { role } = useAuth();

  if (!roles.includes(role || "")) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default RoleGuard;