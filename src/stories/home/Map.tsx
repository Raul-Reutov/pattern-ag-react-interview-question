import mapboxgl from 'mapbox-gl';
import React from 'react';
import './map.css';

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

    const mapDiv = React.useRef<HTMLDivElement>(null);
    const [lng, setLng] = React.useState(-70.9);
    const [lat, setLat] = React.useState(42.35);
    const [zoom, setZoom] = React.useState(9);
    let [map, setMap] = React.useState(null);

    React.useEffect(() => {
        const attachMap = (setMap: React.Dispatch<React.SetStateAction<any>>, mapDiv: React.RefObject<HTMLDivElement>) => {
            if (!mapDiv.current) {
                return;
            }
            const map = new mapboxgl.Map({
                container: mapDiv.current || '',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-121.91390991210938, 40.316184625814095],
                zoom: zoom,
            })
            setMap(map);
        }

        !map && attachMap(setMap, mapDiv)

    }, [map]);

    return (
        <div>
            <div ref={mapDiv} className="map-container" />
        </div>
    );
};
