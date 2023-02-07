import React from 'react';
import { Header } from "../common/Header"
import "./home.css"
interface HomeProps {

}

/**
 * Primary UI component for user interaction
 */
export const Home = ({
    ...props
}: HomeProps) => {

    return (
        <div>
            <Header />
        </div>
    );
};
