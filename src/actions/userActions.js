import axios from 'axios'

export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  } //we want to send this as a header.

  // response isn't being populated with an error on wrong login info submission for some reason
  const response = await axios.post(
    'https://agile-mesa-08799.herokuapp.com/login',
    { username, password },
    config
  )

  if (response.data.status === 500) {
    dispatch({ type: 'USER_LOGIN_FAIL', payload: response.data })
  } else {
    localStorage.setItem('token', response.data.token)
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data.user })
  }
}

// LOGOUT USER

export const logout = () => (dispatch) => {
  localStorage.removeItem('token')
  dispatch({ type: 'USER_LOGOUT' })
}

// REGISTER USER

export const register = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  } //we want to send this as a header

  const response = await axios.post(
    'https://agile-mesa-08799.herokuapp.com/users',
    { username, password },
    config
  ) //pass all these arguments in and then extract data from the response
  if (response.data.status === 500) {
    dispatch({ type: 'USER_REGISTER_FAIL', payload: response.data })
  } else {
    localStorage.setItem('token', response.data.token)
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data })
  } //we want the user to be immediately logged in if registration is successful
}

export const updateUser = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`,
      },
    }
    const newPayload = {
      id: user.id,
      country: user.location[0].country,
    }
    const { data } = await axios.put(
      `https://agile-mesa-08799.herokuapp.com/update_location`,
      newPayload,
      config
    ) //pass the id into this route as well as the config and extract data

    dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data.location })
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const persistUser = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  }
  const response = await axios.get(
    'https://agile-mesa-08799.herokuapp.com/persist',
    config
  )
  dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data.user })
}
