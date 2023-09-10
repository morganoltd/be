export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const SET_USERNAME = "SET_USERNAME"; // Dodajemy akcję do ustawiania nazwy użytkownika

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setUsername = (username) => ({
  type: SET_USERNAME,
  payload: username,
});
