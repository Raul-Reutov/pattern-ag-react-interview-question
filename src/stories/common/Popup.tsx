import React from 'react';
import "./popup.css"

interface PopupProps {
    magnitude: number,
    time: number,
    place: string,
    title: string
}

export const Popup = ({
    ...props
}: PopupProps) => {
    return (
        <div className="popup">
            <h3 className="route-name">{props.title}</h3>
            <div className="route-metric-row">
                <h6 className="row-title">Place</h6>
                <div className="row-value">{props.place}</div>
            </div>
            <div className="route-metric-row">
                <h6 className="row-title">Timestamp</h6>
                <div className="row-value">{props.time}</div>
            </div>
            <div className="route-metric-row">
                <h6 className="row-title">Magnitude</h6>
                <div className="row-value">{props.magnitude}</div>
            </div>

        </div>
    );
};
