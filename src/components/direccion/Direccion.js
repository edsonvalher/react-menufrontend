import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import ItemPaises from './ItemsPaises';
import ItemEstados from './ItemsEstados';
import ItemCiudades from './itemCiudades';
import { Col, Row, Form, Button } from 'react-bootstrap';





const DireccionForm = ({ negocio, mostrarDireccion, verSuscribirme }) => {

    const [paises, setpaises] = useState([])

    const [pais, setPais] = useState()
    const [estado, setEstado] = useState()
    const [ciudad, setCiudad] = useState()

    //mostrar ocultar componente
    const [mostrar, setMostrar] = useState(false)



    //*consulta paises colocandolo en el state
    useEffect(() => {
        if (Object.keys(paises).length !== 0) return
        const consultaPaises = async () => {
            const resultado = await axios.get(`http://localhost:1280/catalogos/paises`)
            const { data } = resultado.data
            setpaises(data)
        }
        consultaPaises()
    }, [paises])




    const [direccionEstado, actualizarDireccion] = useState({
        iddireccion: 0,
        direccion: '',
        idciudad: 0,
        idnegocio: 0,
        latitud: 0,
        longitud: 0,
        telefono1: '',
        telefono2: ''
    })

    const handleState = (e) => {
        actualizarDireccion({
            ...direccionEstado,
            [e.target.name]: e.target.value
        })
    }
    const { iddireccion, direccion, idciudad, idnegocio, latitud, longitud, telefono1, telefono2 } = direccionEstado

    //comunicandome con componente registrarse
    if (JSON.stringify(negocio) === '{}') {
    } else {

        //console.log(negocio)

    }
    const obtenerPais = (pais) => {
        const { idpais } = pais
        setPais(idpais)
    }
    const obtenerEstado = (estado) => {
        const { idestado } = estado
        setEstado(idestado)
    }
    const obtenerCiudad = (ciudad) => {
        const { idciudad } = ciudad
        setCiudad(idciudad)
    }


    const submitGuardar = (e) => {
        e.preventDefault()
        console.log('submit direccion')
        actualizarDireccion({
            ...direccionEstado,
            idciudad: ciudad,
            idnegocio: 0,


        })
        setMostrar(true)
    }
    mostrarDireccion(mostrar)




    return (
        <Col sm={12} className={!verSuscribirme ? '' : 'd-none'}>
            <Form onSubmit={submitGuardar}>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <Form.Group
                            className="mb-3"
                            controlId="pais"
                        >
                            <Form.Label>Seleccione País</Form.Label>
                            <ItemPaises
                                obtenerPais={obtenerPais}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="depto"
                        >
                            <Form.Label>Seleccione departamento</Form.Label>
                            <ItemEstados
                                paisSeleccionado={pais}
                                obtenerEstado={obtenerEstado}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="munpio"
                        >
                            <Form.Label>Seleccione municipio</Form.Label>
                            <ItemCiudades
                                estadoSeleccionado={estado}
                                obtenerCiudad={obtenerCiudad}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="sitioweb"
                        >
                            <Form.Label>Dirección </Form.Label>
                            <Form.Control
                                as="textarea"
                                row="3"
                                name="direccion"
                                value={direccion}
                                onChange={handleState}

                            ></Form.Control>
                            <Form.Text className="text-muted">
                                Dirección del negocio
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group
                            className="mb-3"
                            controlId="telefono1"
                        >
                            <Form.Label>Teléfono principal</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ej: 22223333"
                                name='telefono1'
                                value={telefono1}
                                onChange={handleState}

                            ></Form.Control>
                            <Form.Text className="text-muted">
                                Teléfono principal
                            </Form.Text>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="telefono2"
                        >
                            <Form.Label>Teléfono secundario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ej: 22223333"
                                name='telefono2'
                                value={telefono2}
                                onChange={handleState}

                            ></Form.Control>
                            <Form.Text className="text-muted">
                                Teléfono secundario (opcional)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            block
                        >GUARDAR LOCALIZACIÓN</Button>
                    </Col>
                </Row>
            </Form>
        </Col>

    );
}

export default DireccionForm;