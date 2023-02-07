import React from 'react';
import logo from './logo.svg';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Home } from "./stories/home/Home"
import "./app.css"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import "mapbox-gl/src/css/mapbox-gl.css"
mapboxgl.accessToken = "pk.eyJ1IjoicmFyZXV0b3YiLCJhIjoiY2xkdGs5dGJrMDdtZTNwbnd0Z3A2bHpqcSJ9.7ydo5bWko3uZOBS4FpPcFw";

function App() {


  return (
    
    <Home />
  );
}

export default App;
