import React, { useState, useEffect, Suspense } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import './App.css';
import { proxy, sortData } from './utils';
import Map from './Map';
import Table from './Table';
import BarChart from './BarChart';
import 'leaflet/dist/leaflet.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] = useState('cases');

  useEffect(() => {
    fetch(`${proxy}https://disease.sh/v3/covid-19/all`)
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);


  useEffect(() => {
    const getCountries = async () => {
      await fetch(`${proxy}https://disease.sh/v3/covid-19/countries`)
        .then(res => res.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));

          const sortedData = sortData(data);

          setMapCountries(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountries();
  }, []);


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === "worldwide" ? `${proxy}https://disease.sh/v3/covid-19/all` : `${proxy}https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);

        if (event.target.value !== "worldwide") {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          console.log(mapCenter);
          setMapZoom(4);
        }
      });
  };

  const { cases, recovered, deaths, todayCases, todayRecovered, todayDeaths } = countryInfo;
  const closedCases = recovered + deaths;
  const recoveredPercent = (recovered / closedCases) * 100;
  const deathPercent = (deaths / closedCases) * 100;

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Suspense>
            <InfoBox active={caseType === 'cases'} onClick={e => setCaseType('cases')} title="Confirmed" total={cases} todayCases={todayCases} />
            <InfoBox active={caseType === 'recovered'} onClick={e => setCaseType('recovered')} title="Recovered" total={recovered} todayCases={todayRecovered} percentage={recoveredPercent} />
            <InfoBox active={caseType === 'deaths'} onClick={e => setCaseType('deaths')} title="Deceased" total={deaths} todayCases={todayDeaths} percentage={deathPercent} />
          </Suspense>
        </div>

        <Suspense>
          <Map countries={mapCountries} caseType={caseType} center={mapCenter} zoom={mapZoom} />
        </Suspense>
      </div>


      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
        </CardContent>

        <CardContent>
          <h3>Worldwide new {caseType}</h3>
          <BarChart className="app__chart" caseType={caseType} />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
