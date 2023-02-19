export const isLogged = (state) => {
  return {
    type: state.type,
    name: state.name,
    email: state.email,
    password: state.password,

  };
};