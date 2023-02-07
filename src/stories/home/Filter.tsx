import React from 'react';
import { CustomDropdown } from "../common/CustomDropdown"
import "./filter.css"
interface FilterProps {

}

/**
 * Primary UI component for user interaction
 */
export const Filter = ({
    ...props
}: FilterProps) => {

    return (
        <div className="filter">
            <h3>Filters:</h3>
            <CustomDropdown title="Country"/>
            
        </div>
    );
};
