import GraphAndMap from '../components/GraphAndMap'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  text-align: center;
`

const HomeScreen = () => {
  // const userState = useSelector((state) => state.userState)

  // const { userInfo } = userState

  return (
    <StyledWrapper>
      <GraphAndMap />
    </StyledWrapper>
  )
}

export default HomeScreen
