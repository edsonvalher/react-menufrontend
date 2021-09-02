import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DireccionForm from './direccion/Direccion';
import SuscribirmeForm from './suscribirse';
import AlertarForm from './alerta/alertar';
import { Col, Container, Navbar, Row } from "react-bootstrap";

const RegistrarseForm = () => {
    //declaracion de estados
    const [verSuscribirme, setverSuscribirme] = useState(false)
    const [verDireccion, setverDireccion] = useState(false)
    const [empresa, setEmpresa] = useState('')
    const [mostraralerta, setMostraralerta] = useState(false)
    const [outrespuesta, setOutrespuesta] = useState({
        procesado: false,
        msg: '',
        estado: false
    })

    const mostrarSuscribirme = (valor) => {
        setverSuscribirme(valor)
    }
    const mostrarDireccion = (valor) => {
    }
    const obtenerId = (valor) => {
        //console.log(valor)
        setEmpresa(valor)
    }
    const obtenerRespuesta = (valor) => {
        if (valor.msg !== '') {
            setOutrespuesta(valor)
            setMostraralerta(true)
            //como es opuesto se debe poner en true para que lo oculte
            setverSuscribirme(true)

        }
    }
    const { msg, estado } = outrespuesta
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
                        obtenerId={obtenerId}
                    />


                    <DireccionForm
                        mostrarDireccion={mostrarDireccion}
                        verSuscribirme={verSuscribirme}
                        empresa={empresa}
                        outrespuesta={obtenerRespuesta}

                    />

                    <AlertarForm
                        mostrar={mostraralerta}
                        mensaje={msg}
                        estado={estado}
                    />

                </Row>

            </Container>
        </Fragment>

    );
}

export default RegistrarseForm;