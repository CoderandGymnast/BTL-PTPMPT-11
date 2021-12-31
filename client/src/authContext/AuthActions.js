export const loginStart = () => ({
  type: 'LOGIN_START',
});
export const loginSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
  payload: data,
});
export const loginFailure = () => ({
  type: 'LOGIN_FAILURE',
});

//logout

export const logout = () => ({
  type: 'LOGOUT',
});
