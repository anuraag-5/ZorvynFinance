export const signOut = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("password");
};
