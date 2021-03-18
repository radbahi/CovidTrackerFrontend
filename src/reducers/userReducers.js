// reducers take in 2 things: the initial state and the action. the action object gets dispatched to the reducer.
// actions can have types or payloads. types get evaluated in the reducer and the reducer does certain things according to the type.
// payload is data fetched from the server.
// the initial state for the reducer below is an empty object

export const userReducer = (state = {}, action) => {
  switch (
    action.type // this is where the reducer does things according to each type.
  ) {
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, ...action.payload } //we send this once the data is fetched. remember that payload = data.
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload }
    // what happens here depends on us! lol
    case 'USER_LOGOUT':
      return null //clears everything
    case 'USER_REGISTER_FAIL':
      return { loading: false, error: action.payload }
    // REDEFINE BELOW UPDATE TO REFLECT ONLY LOCATION OR MAKE IT DYNAMIC TO ENTIRE USER UPDATE
    case 'USER_UPDATE_SUCCESS':
      return { ...state, loading: false, location: action.payload } //we send this once the data is fetched. remember that payload = data.
    case 'USER_UPDATE_FAIL':
      return { loading: false, error: action.payload }
    default:
      //always have a default
      return state
  }
}

// //MIGHT NOT EVEN NEED THIS REDUCER. IF USERNAME/PASSWORD IS WRONG, WE CAN TELL USER IN OTHER WAYS
// export const userRegisterReducer = (state = {}, action) => {
//   switch (
//     action.type // this is where the reducer does things according to each type.
//   ) {
//     case 'USER_REGISTER_REQUEST':
//       return { loading: true } //we send loading: true to let the component know it's fetching the data
//     case 'USER_REGISTER_SUCCESS':
//       return { loading: false } //we send this once the data is fetched. remember that payload = data.
//     case 'USER_REGISTER_FAIL':
//       return { loading: false, error: action.payload }
//     default:
//       //always have a default
//       return state
//   }
// }

// // BUG WITH TRYING TO UPDATE NESTED DATA FOR USER LOCATION. CAN'T SEEM TO ACCESS.
// export const userUpdateReducer = (state = {}, action) => {
//   switch (
//     action.type // this is where the reducer does things according to each type.
//   ) {
//     case 'USER_UPDATE_REQUEST':
//       return { ...state, loading: true } //we send loading: true to let the component know it's fetching the data. not sure why passing in whole state here is necessary
//     case 'USER_UPDATE_SUCCESS':
//       return {
//         loading: false,
//       } //we send this once the data is fetched. remember that payload = data.
//     case 'USER_UPDATE_FAIL':
//       return { loading: false, error: action.payload }
//     // case 'USER_UPDATE_RESET':
//     //   return {}
//     default:
//       //always have a default
//       return state
//   }
// }
