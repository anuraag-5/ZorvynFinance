export const signOut = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("password");
  localStorage.removeItem("income");
  localStorage.removeItem("transactions");
};
