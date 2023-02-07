import React from 'react';
import './map.css';

interface MapProps {
    countries: Array<any>,
    earthquakes: Array<any>
}

/**
 * Primary UI component for user interaction
 */
export const Map = ({
    countries = [],
    ...props
}: MapProps) => {
    
    return (
        <button>
        </button>
    );
};
