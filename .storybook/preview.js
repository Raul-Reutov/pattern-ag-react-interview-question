import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1IjoicmFyZXV0b3YiLCJhIjoiY2xkdGs5dGJrMDdtZTNwbnd0Z3A2bHpqcSJ9.7ydo5bWko3uZOBS4FpPcFw";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}