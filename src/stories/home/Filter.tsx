import React from 'react';
import { CustomDropdown } from "../common/CustomDropdown"
import { country } from "../../store/slices/filterSlice"
import {useAppDispatch, useAppSelector} from "../../store/hook"
import "./filter.css"

export const Filter = () => {
    const currentCountryOptions = useAppSelector((state) => state.filter.countryOptions)
    const dispatch = useAppDispatch()

    return (
        <div className="filter">
            <u><h3>Filters</h3></u>
            <CustomDropdown title="Country" options={currentCountryOptions} onClick={(newOption: string) =>
                dispatch(country(newOption))
            }/>
            <p className="notice-text">* Please allow map to finish <br />
                zooming before selecting a <br />
                new choice.
            </p>
        </div>
    );
};
