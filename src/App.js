import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import './App.css';
import { sortData } from './utils';
import Map from './Map';
import Table from './Table';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const proxy = "https://cors-anywhere.herokuapp.com/";

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
      });
  };

  const { cases, recovered, deaths, todayCases, todayRecovered, todayDeaths } = countryInfo;

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Confirmed" total={cases} todayCases={todayCases} />
          <InfoBox title="Recovered" total={recovered} todayCases={todayRecovered} />
          <InfoBox title="Deceased" total={deaths} todayCases={todayDeaths} />
        </div>

        <Map />
      </div>


      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />

          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
