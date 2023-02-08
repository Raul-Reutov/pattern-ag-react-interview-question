import mapboxgl from 'mapbox-gl';
import React from 'react';
import ReactDOM from 'react-dom';
import './map.css';
import { Popup } from "../common/Popup"
import { country, countryOptions } from "../../store/slices/filterSlice"
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useDispatch } from 'react-redux';
import { current } from 'immer';
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

    
    const getUniqueOptions = (options: Array<string>) => {
        const uniqueOptions: Array<string> = [];
        for (const option of options) {;
            if (!uniqueOptions.includes(option)) {
                uniqueOptions.push(option)
            }
        }
        return uniqueOptions;
    }

   /* const insideMultiPolygon = (point: Array<number>, multiPolygon: any) => {
        for(const polygon of multiPolygon) {
            
        }
    }

    const insidePolygon = (point: Array<number>, polygon:any) => {
        var x = point[0], y = point[1];

        var inside = false;
        for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            var xi = polygon[i][0], yi = polygon[i][1];
            var xj = polygon[j][0], yj = polygon[j][1];

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };*/
    
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
                        
                        let newCountryOptions: Array<string> = []
                        map!.querySourceFeatures("countries").map((feature) => {
                            newCountryOptions.push(feature["properties"]!["ADMIN"])
                        })
                        newCountryOptions = getUniqueOptions(newCountryOptions);
                        dispatch(countryOptions(newCountryOptions))

                        // Check which earthquakes to display
                        const source: mapboxgl.GeoJSONSource = map!.getSource('countries') as mapboxgl.GeoJSONSource;
                        
                        const renderedPolygons: mapboxgl.MapboxGeoJSONFeature[] = map!.queryRenderedFeatures(e.point, {
                            layers: ["countries-layer-fill"]
                        })

                        const earthquakeFeatures = map!.queryRenderedFeatures(e.point, {
                            layers: ['earthquakes-layer']
                        });
                        if (!earthquakeFeatures.length) {
                            return;
                        }

                        for(const geometry of renderedPolygons){
                            
                            //console.log(geometry["coordinates"])
                            const point:any = earthquakeFeatures[0];
                            if (point) {
                                console.log(point.geometry)
                                console.log(turf.inside(point.geometry["coordinates"] as turf.Coord, geometry as any))
                                //map!.setFilter('earthquakes-layer', ['==', ['get', 'coordinates'], currentCountry])
                            }
                            
                            
                        }
                        //console.log(map!.getFilter("countries-layer-line"))
                        // country name
                        //const countryName = map!.getFilter("countries-layer-line")
                        // if(countryName) {
                        //     console.log(countryName[2])
                        //     // filter earthquakes
                        //     map!.querySourceFeatures("earthquake").map((feature) => {
                        //         newCountryOptions.push(feature["properties"]!["ADMIN"])
                        //     })
                        // }

                        
                        const countryFeatures = map!.queryRenderedFeatures(e.point, {
                            layers: ["countries-layer-fill"],
                        });
                        //console.log(countryFeatures)

                        
                        //const insideEarthquakes: any = turf.inside(libraryFeature, countryFeatures);

                        ///source.setData({
                        //    'type': 'FeatureCollection',
                        //    'features': [insideEarthquakes]
                        //})
                    });
                    
                }
            });

            

            setMap(map);
            
        }

        if (map?.isStyleLoaded() && map?.isSourceLoaded("countries")) {
            // Filter countries
            if (currentCountry == "All") {
                map!.setFilter('countries-layer-line', null)
                map!.setFilter('countries-layer-fill', null)
            } else {
                map!.setFilter('countries-layer-line', ['==', ['get', 'ADMIN'], currentCountry])
                map!.setFilter('countries-layer-fill', ['==', ['get', 'ADMIN'], currentCountry])

            }

            map!.setFilter('earthquakes-layer')
            // Filter earthquakes

        }
        
        !map && attachMap(setMap, mapDiv)
        
    }, [map, currentCountry]);




    return (
        <div className="map-parent">
            <div ref={mapDiv} className="map-container" />
        </div>
    );
};
