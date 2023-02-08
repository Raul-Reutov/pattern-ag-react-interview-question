import React from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Home } from "./stories/home/Home"
import "./app.css"
import { countryOptions } from "./store/slices/filterSlice"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import "mapbox-gl/src/css/mapbox-gl.css"
import countriesJson from "./data/countries.json"
import { useAppDispatch } from './store/hook';
mapboxgl.accessToken = "pk.eyJ1IjoicmFyZXV0b3YiLCJhIjoiY2xkdGs5dGJrMDdtZTNwbnd0Z3A2bHpqcSJ9.7ydo5bWko3uZOBS4FpPcFw";

function App() {
  const dispatch = useAppDispatch()

  // Init country options
  let newCountryOptions: Array<string> = []
  for (const feature of countriesJson["features"] as any) {
    newCountryOptions.push(feature["properties"]["ADMIN"])
  }
  newCountryOptions.sort();
  dispatch(countryOptions(newCountryOptions))

  return (
    
    <Home />
  );
}

export default App;
