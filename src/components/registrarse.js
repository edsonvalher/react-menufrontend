import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DireccionForm from './direccion/Direccion';
import SuscribirmeForm from './suscribirse';
import { Col, Container, Navbar, Row } from "react-bootstrap";

const RegistrarseForm = () => {
    //declaracion de estados
    const [verSuscribirme, setverSuscribirme] = useState(false)
    const [verDireccion, setverDireccion] = useState(false)

    const mostrarSuscribirme = (valor) => {
        setverSuscribirme(valor)
    }
    const mostrarDireccion = (valor) => {
        console.log(valor)
    }
    return (
        <Fragment>
            <Navbar>
                <Container >
                    <Navbar.Brand href="#home">
                        <h3>

                            REGISTRA TU EMPRESA
                        </h3>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">Mark Otto</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid="md" >

                <Row>

                    <SuscribirmeForm
                        mostrarSuscribirme={mostrarSuscribirme}
                    />


                    <DireccionForm
                        mostrarDireccion={mostrarDireccion}
                        verSuscribirme={verSuscribirme}

                    />

                </Row>

            </Container>
        </Fragment>

    );
}

export default RegistrarseForm;