import { getUser } from "@/utils/getUser";

export const hasRole = (allowedRoles: string[]) => {
  const user = getUser();

  if (!user || !user.roles) return false;

  return user.roles.some((role: string) =>
    allowedRoles.includes(role)
  );
};