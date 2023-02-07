import React from 'react';
import { Header } from "../common/Header"
import "./home.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Filter } from "./Filter"
import { Map } from "./Map"
interface HomeProps {

}

/**
 * Primary UI component for user interaction
 */
export const Home = ({
    ...props
}: HomeProps) => {

    return (
        <div className="home-wrapper">
            <Header />
            <Container className="home-container">
                <Row>
                    <Col xs={12} sm={3}>
                        <Filter />
                    </Col>
                    <Col xs={12} sm={9}>
                        <Map />
                    </Col>
                </Row>

            </Container>
        </div>
    );
};
