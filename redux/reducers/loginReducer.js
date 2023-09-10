import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SET_USERNAME } from "../actions/loginActions";

const initialState = {
  isLoggedIn: false,
  username: "", // Dodajemy pole "username" do przechowywania nazwy zalogowanego użytkownika
  loggedAt: null,
};

const formatCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loggedAt: formatCurrentDate(),
      };
    case LOGIN_FAILURE:
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        username: "", // Resetujemy pole "username" po wylogowaniu lub błędzie logowania
        loggedAt: null,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload, // Ustawiamy nazwę zalogowanego użytkownika na podstawie przekazanego "action.payload"
      };
    default:
      return state;
  }
};

export default loginReducer;
