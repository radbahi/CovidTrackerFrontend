import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown, Button } from 'react-bootstrap'
import { updateUser } from '../actions/userActions.js'
import styled from 'styled-components'
// import useScript from './Marquee.js'

import axios from 'axios'

import DiseaseGraph from './DiseaseGraph'
import WorldMap from './WorldMap'
import StoryBox from './StoryBox'

const StyledGraphAndMap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 100px;
`
const StyledDropdown = styled.div``

const GraphAndMap = () => {
  const dispatch = useDispatch()

  const [diseaseData, setDiseaseData] = useState([])
  const [selectedLocation, setSelectedLocation] = useState({})
  const [showStories, setShowStories] = useState(false)
  const [stories, setStories] = useState([])
  const [worldData, setWorldData] = useState({})

  const userState = useSelector((state) => state.userState)
  // useScript("./Marquee.js")

  useEffect(() => {
    const addDiseaseData = async () => {
      const { data } = await axios.get(
        'https://agile-mesa-08799.herokuapp.com/locations'
      )
      setDiseaseData(data)
      setWorldData(data[58])
    }
    addDiseaseData()
    console.log('addDiseaseData done')

    userState && setSelectedLocation(userState.location)

    const addStories = async () => {
      const { data } = await axios.get(
        'https://agile-mesa-08799.herokuapp.com/stories'
      )
      setStories(data)
    }
    addStories()
    console.log('setStories done')
  }, [userState])

  const selectLocationHandler = (location) => {
    dispatch(updateUser({ id: userState.id, location: [location] }))
    // setSelectedLocation(location)
    console.log(location.country)
  }

  // PASS SELECTED LOCATION AS PROP INTO DISEASEGRAPH AND JUST PASS ALL DATA INTO WORLD MAP
  // CREATE FUNCTION TO MAKE A SELECTED LOCATION ONCLICK TO THE DROPDOWN ITEMS

  // CHANGES I MADE ON 3/10
  // Changed to ul/li for marquee.
  // Script page is just for marquee fix.
  // Current issue with marquee is that there's a slight overlap.
  // Also, the current way to create the marquee uses cloned elements for the loop.
  // The script is made to clone elements.
  return (
    <div>
      <div className='marquee'>
        <h2 className='marquee-title'>Global Statistics</h2>
        <ul className='marquee-content'>
          <li className='liOdd'>Active: {worldData.active}</li>
          <li className='liEven'>Deaths: {worldData.deaths}</li>
          <li className='liOdd'>Recovered: {worldData.recovered}</li>
          <li className='liEven'>Vaccinations: {worldData.vaccinations}</li>

          {/* The below isn't needed when the script on Marquee.js works */}
          <li className='liOdd'>Active: {worldData.active}</li>
          <li className='liEven'>Deaths: {worldData.deaths}</li>
          <li className='liOdd'>Recovered: {worldData.recovered}</li>
          <li className='liEven'>Vaccinations: {worldData.vaccinations}</li>
        </ul>
      </div>
      <StyledGraphAndMap>
        <WorldMap selectedLocation={selectedLocation} />
        {showStories ? (
          <div>
            <Button
              className='story-button'
              onClick={() => setShowStories(!showStories)}
            >
              Switch to graph
            </Button>
            <StoryBox stories={stories} />
          </div>
        ) : (
          <div>
            <Button
              className='story-button'
              onClick={() => setShowStories(!showStories)}
            >
              Switch to stories
            </Button>
            <StyledDropdown>
              <Dropdown
                menualign='right'
                title='Select a location'
                id='dropdown-menu-align-right'
              >
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                  Select a location
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {diseaseData.map((location) => {
                    return (
                      <Dropdown.Item
                        onClick={() => selectLocationHandler(location)}
                        key={location.country}
                      >
                        {location.country}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
              {selectedLocation
                ? `${selectedLocation.country}`
                : 'Please select a country'}
              <DiseaseGraph selectedLocation={selectedLocation} />
            </StyledDropdown>
          </div>
        )}
      </StyledGraphAndMap>
    </div>
  )
}

export default GraphAndMap
