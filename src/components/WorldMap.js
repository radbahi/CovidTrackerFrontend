import React, { useState, useEffect } from 'react'
import { scaleQuantile } from 'd3-scale'
import axios from 'axios'
import ReactTooltip from 'react-tooltip'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'

// import styled from 'styled-components'

// const StyledMap = styled.div`
//   margin-right: 60vh;
//   margin-left: 1vh;
//   margin-top: -35vh;
// `

const geoUrl = require('./world-110m.json')

const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618',
]

// USE SELECTEDLOCATION TO HIGHLIGHT THAT COUNTRY ON MAP

const WorldMap = ({ selectedLocation }) => {
  const [infectedAreas, setInfected] = useState([])

  const colorScale = scaleQuantile()
    .domain(infectedAreas.map((d) => d.active))
    .range(COLOR_RANGE)

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 0.65 })

  const [tooltipContent, setTooltipContent] = useState('')

  const onMouseEnter = (
    current = {
      country: 'Cannot find country',
      active: 'Cannot find data',
      confirmed: 'Cannot find data',
      deaths: 'Cannot find data',
      recovered: 'Cannot find data',
      vaccinations: 'Cannont find data',
    }
  ) => {
    return () => {
      setTooltipContent(
        `${current.country}: Active: ${current.active}. Confirmed: ${current.confirmed}. Deaths: ${current.deaths}. Recovered: ${current.recovered}. Vaccinations: ${current.vaccinations}`
      )
    }
  }

  const onMouseLeave = () => {
    setTooltipContent('')
  }

  function handleZoomIn() {
    if (position.zoom >= 4) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }))
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }))
  }

  function handleMoveEnd(position) {
    setPosition(position)
  }

  useEffect(() => {
    const fetchInfected = async () => {
      try {
        const { data } = await axios.get(
          'https://agile-mesa-08799.herokuapp.com/locations'
        )
        setInfected(data)
      } catch (error) {
        console.log(`There was a problem: ${error}`)
        return
      }
    }
    fetchInfected()
  }, [])

  if (infectedAreas.length > 0) {
    return (
      <div className='worldmap' style={{ height: '60vh', width: '443vw' }}>
        <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap width={800} height={500} data-tip=''>
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const current = infectedAreas.find(
                    (location) => location.ISO === geo.properties.ISO_A3
                  )
                  if (
                    current &&
                    selectedLocation &&
                    selectedLocation.ISO === current.ISO
                  )
                    console.log('Map loaded')
                  return current &&
                    selectedLocation &&
                    selectedLocation.ISO === current.ISO ? (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={onMouseEnter(current)}
                      onMouseLeave={onMouseLeave}
                      fill={current ? colorScale(current.active) : '#EEE'}
                      stroke='blue'
                      strokeOpacity='1'
                    />
                  ) : (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={onMouseEnter(current)}
                      onMouseLeave={onMouseLeave}
                      fill={current ? colorScale(current.active) : '#EEE'}
                      stroke='black'
                      strokeOpacity='0.1'
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <div className='controls'>
          <button onClick={handleZoomIn}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='3'
            >
              <line x1='12' y1='5' x2='12' y2='19' />
              <line x1='5' y1='12' x2='19' y2='12' />
            </svg>
          </button>
          <button onClick={handleZoomOut}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='3'
            >
              <line x1='5' y1='12' x2='19' y2='12' />
            </svg>
          </button>
        </div>
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}

export default WorldMap
