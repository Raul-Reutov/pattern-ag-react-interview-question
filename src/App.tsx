import React from 'react';

import { Home } from "./stories/home/Home"
import "./app.css"
import { countryOptions } from "./store/slices/filterSlice"
import countriesJson from "./data/countries.json"
import { useAppDispatch } from './store/hook';

// Bootstrap init
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

// map box init
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/src/css/mapbox-gl.css"
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string;

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
