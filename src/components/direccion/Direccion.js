import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import ItemPaises from './ItemsPaises';
import ItemEstados from './ItemsEstados';
import ItemCiudades from './itemCiudades';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid'
import shortid from 'shortid';
import MensajeDialog from '../dialog/mensaje';
import { getpaises } from '../../services/catalogos';





const DireccionForm = ({ negocio, mostrarDireccion, verSuscribirme, empresa, outrespuesta }) => {

    const { id } = empresa

    const [paises, setpaises] = useState([])



    const [pais, setPais] = useState()
    const [estado, setEstado] = useState()
    const [ciudad, setCiudad] = useState()
    const [coordenadas, setCoordenadas] = useState({
        latitude: 0,
        longitude: 0
    })

    //mostrar ocultar componente
    const [mostrar, setMostrar] = useState(false)
    //campo encontrado con error
    const [campo, setcampo] = useState('')
    //declaracion de estado errores
    const [error, actualizarError] = useState(false)

    const [respuesta, setRespuesta] = useState({
        procesado: false,
        msg: '',
        estado: false
    })






    //*consulta paises colocandolo en el state
    useEffect(() => {
        if (Object.keys(paises).length !== 0) return
        const consultaPaises = async () => {
            //const resultado = await axios.get(`http://localhost:1280/catalogos/paises`)
            const resultado = await getpaises()
            const { data } = resultado.data
            setpaises(data)
        }
        consultaPaises()
    }, [paises])




    const [direccionEstado, actualizarDireccion] = useState({
        iddireccion: '',
        direccion: '',
        idciudad: 0,
        idnegocio: '',
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


    const localizacion = navigator.geolocation.getCurrentPosition((datos) => {
        const { latitude, longitude } = datos.coords
        actualizarDireccion({
            ...direccionEstado,
            ['idnegocio']: id,
            ['latitud']: latitude,
            ['longitud']: longitude
        })
    })

    //comunicandome con componente registrarse
    if (JSON.stringify(negocio) === '{}') {
    } else {



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


    const submitGuardar = async (e) => {
        e.preventDefault()
        const { id } = empresa

        direccionEstado.iddireccion = shortid.generate()
        direccionEstado.idciudad = ciudad
        direccionEstado.idnegocio = id

        //validar
        if (id === null || id === undefined) {
            setcampo('Falta id de empresa"')
            actualizarError(true)
            return
        } else {
            actualizarError(false)
        }
        if (ciudad === null || ciudad === 0 || ciudad === undefined) {
            setcampo('Debe seleccionar un municipio o ciudad')
            actualizarError(true)
            return
        } else {
            actualizarError(false)
        }
        if (direccion === null || direccion === '' || direccion === undefined) {
            setcampo('Coloque datos de dirección')
            actualizarError(true)
            return
        } else {
            actualizarError(false)
        }

        if (telefono1 === null || telefono1 === '' || telefono1 === undefined) {
            setcampo('Coloque al menos un teléfono')
            actualizarError(true)
            return
        } else {
            actualizarError(false)
        }


        const valores = {
            empresa,
            ubicacion: direccionEstado
        }

        const res = await axios.post('http://localhost:1280/negocios/registrar', valores)
        if (res.status >= 200) {
            console.log(res)
            const { estado, msg } = res.data
            setRespuesta({
                ['procesado']: true,
                ['msg']: msg,
                ['estado']: estado
            })
        } else {
            const { estado, msg } = res.data
            setRespuesta({
                ['procesado']: true,
                ['msg']: msg,
                ['estado']: estado
            })
        }

        setMostrar(false)

    }
    mostrarDireccion(mostrar)
    outrespuesta(respuesta)

    //respuesta del mensaje
    const obtenerEstadoMensaje = (valor) => {
        if (valor) {
            actualizarError(false)
        }
    }

    return (
        <Fragment>
            <MensajeDialog
                titulo={'VALIDACIÓN'}
                contenido={campo}
                mostrar={error}
                obtenerEstadoMensaje={obtenerEstadoMensaje}
            />
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
        </Fragment>

    );
}

export default DireccionForm;