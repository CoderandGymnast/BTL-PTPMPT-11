const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        token: null,
        name: null,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        token: action.payload.access_token,
        name: action.payload.name,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        token: null,
        name: null,
        isFetching: false,
        error: true,
      };
    case 'LOGOUT':
      return {
        token: null,
        name: null,
        isFetching: false,
        error: false,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
