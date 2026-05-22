export const getAuthUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user) return null;

    return JSON.parse(user);
  } catch {
    return null;
  }
};