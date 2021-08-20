export default function (state = { users_list: false }, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, login: action.payload };
    case "AUTH_CHECK":
      return { ...state, login: action.payload };
    case "LIST_USERS":
      return { ...state, users_list: action.payload };
    case "USER_LOGIN_CLEAN":
      return { ...state, login: action.payload };
    case "USER_lOGOUT":
      return { ...state, logout: action.payload };
    case "CHANGE_PASSWORD":
      return { ...state, changePassword: action.payload };
    case "DELETE_USER":
      return { ...state, deleteUser: action.payload };
    default:
      return state;
  }
}
