import { createStore, combineReducers, applyMiddleware } from 'redux'
import { userReducer } from './reducers/userReducers'
import thunk from 'redux-thunk'

// Pass in localStorageToken to get userInfo from /persist route and pass that response to inital state 8)
// REVISIT IF LOCALSTORAGE ADDS A KEY OF USERINFO TO STATE. WE DO NOT WANT THIS.
const initialState = {
  userState: null,
}

const middleware = [thunk]

// ...obviously all userState related things should point to all the user reducers
const rootReducer = combineReducers({
  userState: userReducer,
})

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)

export default store
