import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const DiseaseGraph = ({ selectedLocation }) => {
  const data = [
    {
      name: 'Active',
      Amount: selectedLocation
        ? Math.round(selectedLocation.active / 6)
        : 'Please select a country above',
      pv: selectedLocation
        ? selectedLocation.active
        : 'Please select a country above',
      amt: selectedLocation
        ? selectedLocation.active
        : 'Please select a country above',
    },
    {
      name: 'Confirmed',
      Amount: selectedLocation
        ? Math.round(selectedLocation.confirmed / 6)
        : 'Please select a country above',
      pv: selectedLocation
        ? selectedLocation.confirmed
        : 'Please select a country above',
      amt: selectedLocation
        ? selectedLocation.confirmed
        : 'Please select a country above',
    },
    {
      name: 'Deaths',
      Amount: selectedLocation
        ? Math.round(selectedLocation.deaths / 6)
        : 'Please select a country above',
      pv: selectedLocation
        ? selectedLocation.deaths
        : 'Please select a country above',
      amt: selectedLocation
        ? selectedLocation.deaths
        : 'Please select a country above',
    },
    {
      name: 'Recovered',
      Amount: selectedLocation
        ? Math.round(selectedLocation.recovered / 6)
        : 'Please select a country above',
      pv: selectedLocation
        ? selectedLocation.recovered
        : 'Please select a country above',
      amt: selectedLocation
        ? selectedLocation.recovered
        : 'Please select a country above',
    },
    {
      name: 'Vaccinations',
      Amount: selectedLocation
        ? Math.round(selectedLocation.vaccinations / 6)
        : 'Please select a country above',
      pv: selectedLocation
        ? selectedLocation.vaccinations
        : 'Please select a country above',
      amt: selectedLocation
        ? selectedLocation.vaccinations
        : 'Please select a country above',
    },
  ]

  //CHART SCALES WITH EACH COUNTRY DUE TO LARGE DIFFERENCES BETWEEN COUNTRY DATA
  // MAKE USER KNOWN TO THIS FACT

  return (
    <div>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ left: 30, right: -10 }}
      >
        <XAxis dataKey='name' stroke='#8884d8' />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 165, backgroundColor: '#ccc' }} />
        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
        <Bar dataKey='Amount' fill='#8884d8' barSize={30} />
      </BarChart>
    </div>
  )
}

export default DiseaseGraph
