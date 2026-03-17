// useRole.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRole = (roles: string[], userRoles: string[]) => {
  const navigate = useNavigate();

  useEffect(() => {
    const allowed = roles.some(r => userRoles.includes(r));
    if (!allowed) navigate('/unauthorized');
  }, [roles, userRoles]);
};