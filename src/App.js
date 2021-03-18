import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import AboutUsScreen from './screens/AboutUsScreen'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { persistUser } from './actions/userActions'
import NavBar from './screens/NavBar.js'

import './App.css'

function App() {
  const userState = useSelector((state) => state.userState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(persistUser())
  }, [dispatch])

  // const { userInfo } = userState
  return (
    <Router>
      <NavBar />
      <Route exact path='/'>
        {!userState ? <Redirect to='/login' /> : <HomeScreen />}
      </Route>
      <Route exact path='/login'>
        {userState && !userState.error ? (
          <Redirect to='/' />
        ) : (
          <LoginScreen
            loginError={
              userState && userState.error ? userState.error.message : null
            }
          />
        )}
      </Route>
      <Route exact path='/register'>
        {userState && userState.error ? (
          <RegisterScreen registerError={userState.error.message} />
        ) : (
          <RegisterScreen />
        )}
      </Route>
      <Route exact path='/aboutus' component={AboutUsScreen} />
    </Router>
  )
}

export default App
