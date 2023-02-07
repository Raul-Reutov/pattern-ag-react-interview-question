import React from 'react';
import { CustomDropdown } from "../common/CustomDropdown"
import "./filter.css"
import { country, countryOptions } from "../../store/slices/filterSlice"
import {useAppDispatch, useAppSelector} from "../../store/hook"

interface FilterProps {

}

/**
 * Primary UI component for user interaction
 */
export const Filter = ({
    ...props
}: FilterProps) => {
    const currentCountryOptions = useAppSelector((state) => state.filter.countryOptions)
    const dispatch = useAppDispatch()
    return (
        <div className="filter">
            <u><h3>Filters</h3></u>
            <CustomDropdown title="Country" options={currentCountryOptions} onClick={(newOption: string) =>
                dispatch(country(newOption))
            }/>
            
        </div>
    );
};
