import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DireccionForm from './direccion/Direccion';
import SuscribirmeForm from './suscribirse';
import { Col, Container, Row } from "react-bootstrap";

const RegistrarseForm = () => {
    //declaracion de estados

    const obtenerNegocio = (negocio) => {
        console.log(negocio)
    }
    return (
        <Fragment>
            <Container fluid="md" >
                <Row>
                    <Col sm={8}>
                        <SuscribirmeForm
                            obtenerNegocio={obtenerNegocio} />
                    </Col>
                    <Col sm={4}>
                        <DireccionForm />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        1 a 2
                    </Col>
                    <Col>
                        2 a 2
                    </Col>
                </Row>
            </Container>
        </Fragment>

    );
}

export default RegistrarseForm;