import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../actions/userActions.js'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const Title = styled.h1`
  padding: 10px;
  font-size: 1.5em;
  text-align: center;
  color: black;
  font-weight: bold;
`

const Form = styled.form`
  padding: 10px;
  font-size: 1em;
  text-align: left;
  color: black;
`

const LoginDiv = styled.div`
  padding: 10px;
  padding-top: 50px;
  padding-bottom: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  border-radius: 25px;
  width: 300px;
  position: center;
  justify-content: center;
  box-shadow: 0px 0px 5px 7px #ced1db;
`

const LoginWrapper = styled.div`
  margin: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-style: line;
  border-color: black;
`
const SubMessage = styled.h2`
  padding: 5px;
  color: #c6d0df;
  font-size: 22px;
  text-align: center;
`

// button currently uses bootstrap
// const RegButton = styled.button`
// color: palevioletred;
// background-color: purple;
// `

const LoginScreen = ({ loginError }) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  // LOGS IN BUT DOES NOT REDIRECT TO ROOT URL. STAYS /login
  const submitLoginHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  //PULL FROM LOCALSTORAGE INSTEAD for persistence?
  // const userState = useSelector((state) => state.userState)

  // const { userInfo } = userState
  return (
    <LoginWrapper>
      <LoginDiv>
        <div className="log-error-message">{loginError && loginError}</div>
        <Title>Login</Title>
        <Form onSubmit={submitLoginHandler}>
          <label>Username</label>
          <div></div>
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div></div>
          <label>Password</label>
          <div></div>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div></div>
          <div className='logregbutt'>
            <input type='submit' value='Submit' />
          </div>
        </Form>
        <SubMessage>First time here?</SubMessage>
        <div className='screen-switch-butt'>
          <Button href='/register'>Click here to Register</Button>
        </div>
      </LoginDiv>
    </LoginWrapper>
  )
}

export default LoginScreen
