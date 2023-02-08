// Init bootstrap for storybook
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

// Init redux for storybook
import { Provider } from 'react-redux'
import { store } from '../src/store/store'
import { addDecorator } from '@storybook/react';

// init mapboxgl for storybook
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/src/css/mapbox-gl.css"
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


// Init redux decorator
const withProvider = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
)
addDecorator(withProvider)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}