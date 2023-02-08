import mapboxgl from 'mapbox-gl';
import React from 'react';
import ReactDOM from 'react-dom';
import './map.css';
import { Popup } from "../common/Popup"
import { useAppSelector } from '../../store/hook';
import * as turf from '@turf/turf'

// import json data
import earthquakeJson from "../../data/earthquakes.json"
import countriesJson from "../../data/countries.json"

export const Map = () => {
    const mapDiv = React.useRef<HTMLDivElement>(null);
    let [map, setMap] = React.useState<mapboxgl.Map | null>(null);
    const popUpRef = React.useRef(new mapboxgl.Popup({ offset: 15 }))
    const currentCountry = useAppSelector((state) => state.filter.country)

    React.useEffect(() => {
        // Init map
        const attachMap = (setMap: React.Dispatch<React.SetStateAction<any>>, mapDiv: React.RefObject<HTMLDivElement>) => {
            // Check if map has already been created
            if (!mapDiv.current) {
                return;
            }
            // Init map
            map = new mapboxgl.Map({
                container: mapDiv.current || '',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-121.91390991210938, 40.316184625814095],
                zoom: 3,
            })
            
            // Add map navigation controls
            map!.addControl(new mapboxgl.NavigationControl());

            // Load in all data and functionality for the map
            map!.on('load', () => {
                
                if (map) {
                    // >>>> Load Data >>>>
                    map.addSource('earthquakes', {
                        type: 'geojson',
                        data: earthquakeJson as any,
                    });

                    map.addSource('countries', {
                        type: 'geojson',
                        data: countriesJson as any,
                    });
                    // <<<< Load Data <<<<

                    // >>>> Add Layers to map based on source data >>>>
                    map.addLayer({
                        'id': 'earthquakes-layer',
                        'type': 'circle',
                        'source': 'earthquakes',
                        'paint': {
                            'circle-radius': 4,
                            'circle-stroke-width': 2,
                            'circle-color': 'red',
                            'circle-stroke-color': 'white'
                        }
                    });
                    map.addLayer({
                        'id': 'countries-layer-fill',
                        'type': 'fill',
                        'source': 'countries',
                        'paint': {
                            'fill-color': 'blue', 
                            'fill-opacity': 0.2
                        }
                    });
                    map.addLayer({
                        'id': 'countries-layer-line',
                        'type': 'line',
                        'source': 'countries',
                        'layout': {},
                        'paint': {
                            'line-color': '#000',
                            'line-width': 2
                        }
                    });
                    // <<<< Add Layers to map based on source data <<<<

                    // Earthquake popup functionality
                    map.on("click", "earthquakes-layer", (e) => {
                        const features = map!.queryRenderedFeatures(e.point, {
                            layers: ["earthquakes-layer"],
                        })
                        if (features.length > 0) {
                            const feature = features[0]
                            const popupNode = document.createElement("div")

                            // Render popup over feature
                            ReactDOM.render(
                                <Popup
                                    magnitude={feature?.properties?.mag}
                                    title={feature?.properties?.title}
                                    time={feature?.properties?.time}
                                    place={feature?.properties?.place}
                                />,
                                popupNode
                            )
                            popUpRef.current
                                .setLngLat(e.lngLat)
                                .setDOMContent(popupNode)
                                .addTo(map!)
                        }
                    });

                    // Change the cursor to a pointer when the mouse is over the earthquake layer.
                    map.on('mouseenter', "earthquakes-layer", () => {
                        map!.getCanvas().style.cursor = 'pointer';
                    });

                    // Change the cursor back to the original one when not over the earthquake layer.
                    map.on('mouseleave', "earthquakes-layer", () => {
                        map!.getCanvas().style.cursor = '';
                    });
                }
            });
            setMap(map);
        }

        // Any functionlity for when the country selection changes.
        if (map?.isStyleLoaded() && map?.isSourceLoaded("countries")) {
            // Get earthquake source data that needs to be updated
            const source: mapboxgl.GeoJSONSource = map!.getSource('earthquakes') as mapboxgl.GeoJSONSource;

            // Reset to display everything
            if (currentCountry === "All") { 
                map!.setFilter('countries-layer-line', null)
                map!.setFilter('countries-layer-fill', null)
                source.setData(earthquakeJson as any)

            } else { // Update map according to new country selected
                // Set country filters
                map!.setFilter('countries-layer-line', ['==', ['get', 'ADMIN'], currentCountry])
                map!.setFilter('countries-layer-fill', ['==', ['get', 'ADMIN'], currentCountry])
                
                // Get the feature for the selected country
                let countryFeature: any = null
                for (const feature of countriesJson["features"] as any) {
                    if (feature["properties"]["ADMIN"] === currentCountry) {
                        countryFeature = feature;
                        break;
                    }
                }

                // Filter the country feature against the earthquakes.
                // Check to see if an earthquake is inside of the chosen country.
                if (countryFeature) {
                    let updatedJson: any = { "type": "FeatureCollection", "features": [] };
                    
                    // check each point individually and see if it is inside the selected feature.
                    // if it is, add it to the updatedJson data
                    for (const feature of earthquakeJson["features"] as any) {
                        const point = turf.point(feature["geometry"]["coordinates"]);
                        if (turf.inside(point, countryFeature["geometry"])) {
                            updatedJson["features"].push(feature)
                        }
                    }

                    // Update source data for earthquakes.
                    source.setData(updatedJson as any)
                }
                
                // Zoom into selected country
                const bbox = turf.bbox(countryFeature)
                if (bbox.length >= 4){
                    // Only 4 points are allowed for "fitBounds"
                    map!.fitBounds([bbox[0], bbox[1], bbox[2], bbox[3]], {padding: 20})
                }
            }
        }
        !map && attachMap(setMap, mapDiv)
    }, [map, currentCountry]);

    return (
        <div className="map-parent">
            <div ref={mapDiv} className="map-container" />
        </div>
    );
};
