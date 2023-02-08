import mapboxgl from 'mapbox-gl';
import React from 'react';
import ReactDOM from 'react-dom';
import './map.css';
import { Popup } from "../common/Popup"
import { country, countryOptions } from "../../store/slices/filterSlice"
import { useAppDispatch, useAppSelector } from '../../store/hook';
import * as turf from '@turf/turf'
import { Coord } from '@turf/turf';
import earthquakeJson from "../../data/earthquakes.json"
import countriesJson from "../../data/countries.json"

interface MapProps {
    countries?: Array<any>,
    earthquakes?: Array<any>
}

/**
 * Primary UI component for user interaction
 */
export const Map = ({
    countries = [],
    ...props
}: MapProps) => {
    const dispatch = useAppDispatch()
    const [content, setContent] = React.useState<any>([]);
    const [popupLngLat, setPopupLngLat] = React.useState<any | null>(null);
    const mapDiv = React.useRef<HTMLDivElement>(null);
    const [lng, setLng] = React.useState(-70.9);
    const [lat, setLat] = React.useState(42.35);
    const [zoom, setZoom] = React.useState(9);
    let [map, setMap] = React.useState<mapboxgl.Map | null>(null);
    const [data, setData] = React.useState({geojson: "", loaded: 1})
    const popUpRef = React.useRef(new mapboxgl.Popup({ offset: 15 }))
    const currentCountry = useAppSelector((state) => state.filter.country)


    // Init map
    React.useEffect(() => {

        const attachMap = (setMap: React.Dispatch<React.SetStateAction<any>>, mapDiv: React.RefObject<HTMLDivElement>) => {
            if (!mapDiv.current) {
                return;
            }
            map=new mapboxgl.Map({
                container: mapDiv.current || '',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-121.91390991210938, 40.316184625814095],
                zoom: zoom,
            })
            map!.addControl(new mapboxgl.NavigationControl());

            // Add earthquake data
            map!.on('load', () => {
                // inital resize to the container
                if (map) {
                    map.resize();
                    console.log("earth: " + data.geojson)
                    map.addSource('earthquakes', {
                        type: 'geojson',
                        // Use a URL for the value for the `data` property.
                        data: earthquakeJson as any,
                    });
                    map.addSource('displayed-earthquakes', {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: []
                        }
                    });
                    

                    map.addSource('countries', {
                        type: 'geojson',
                        // Use a URL for the value for the `data` property.
                        data: countriesJson as any,
                    });

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

                    // earthquake click functionality
                    map.on("click", "earthquakes-layer", (e) => {
                        const features = map!.queryRenderedFeatures(e.point, {
                            layers: ["earthquakes-layer"],
                        })
                        if (features.length > 0) {
                            const feature = features[0]
                            // create popup node
                            const popupNode = document.createElement("div")
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

                    // Change the cursor to a pointer when the mouse is over the places layer.
                    map.on('mouseenter', "earthquakes-layer", () => {
                        map!.getCanvas().style.cursor = 'pointer';
                    });

                    // Change it back to a pointer when it leaves.
                    map.on('mouseleave', "earthquakes-layer", () => {
                        map!.getCanvas().style.cursor = '';
                    });

                    // Init filters
                    map.on('moveend', (e) => {

                        

                    });
                    
                }
            });

            

            setMap(map);
            
        }

        if (map?.isStyleLoaded() && map?.isSourceLoaded("countries")) {
            // Filter countries
            const source: mapboxgl.GeoJSONSource = map!.getSource('earthquakes') as mapboxgl.GeoJSONSource;

            if (currentCountry === "All") { // Reset to display everything
                map!.setFilter('countries-layer-line', null)
                map!.setFilter('countries-layer-fill', null)
                source.setData(earthquakeJson as any)
            } else { // Update map according to new countr selected
                
                map!.setFilter('countries-layer-line', ['==', ['get', 'ADMIN'], currentCountry])
                map!.setFilter('countries-layer-fill', ['==', ['get', 'ADMIN'], currentCountry])
                
                // get polygons for selected country
                let countryFeature: any = null
                for (const feature of countriesJson["features"] as any) {
                    if (feature["properties"]["ADMIN"] === currentCountry) {
                        countryFeature = feature;
                        break;
                    }
                }

                // filter polygon against earthquake. if true, add feature.
                if (countryFeature) {
                    console.log("Filtering Earthqaukes")
                    let updatedJson: any = { "type": "FeatureCollection", "features": [] };
                    for (const feature of earthquakeJson["features"] as any) {
                        const point = turf.point(feature["geometry"]["coordinates"]);
                        if (turf.inside(point, countryFeature["geometry"])) {
                            updatedJson["features"].push(feature)
                        }
                    }

                    source.setData(updatedJson as any)
                    console.log(updatedJson["features"])
                }
                const bbox = turf.bbox(countryFeature)

                if (bbox.length >= 4){
                    map!.fitBounds([bbox[0], bbox[1], bbox[2], bbox[3]], {padding: 20})
                }
                console.log(countryFeature)
                

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
