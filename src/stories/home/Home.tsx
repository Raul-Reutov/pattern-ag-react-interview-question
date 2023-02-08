import React from 'react';
import { Header } from "../common/Header"
import { Filter } from "./Filter"
import { Map } from "./Map"
import "./home.css"


export const Home = () => {

    return (
        <div className="home-wrapper">
            <Header />
            <Map />
            <Filter />
        </div>
    );
};
