import { combineReducers } from "redux";

const isLogged = (
  state = {
    logged: false,
    name: "",
    email: "",
    password: "",
  },
  action
) => {
  switch (action.type) {
    case "log":
      return {
        logged: true,
        name: action.name,
        email: action.email,
        password: action.password,
      };
    case "logout":
      return {
        logged: false,
        name: "",
        email: "",
        password: "",
      };
    default:
      return state;
  }
};

const store = combineReducers({
  login: isLogged,
});

export default store;
