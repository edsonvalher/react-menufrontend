import { useState } from "react";
import PropTypes from 'prop-types';
import RegistrarseForm from "./registrarse";
import DireccionForm from "./direccion/Direccion";
import { Fragment } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";

import { v4 as uuidv4 } from 'uuid'

const SuscribirmeForm = ({ obtenerNegocio }) => {

    //declaracion de estados
    const [registrarse, actualizarRegistrarse] = useState({
        id: '',
        nombre_comercial: '',
        nombre_representante_legal: '',
        correo: '',
        sitioweb: '',
        grabado: false
    })

    //maneja el estado de registrarse
    const handleState = (e) => {
        actualizarRegistrarse({
            ...registrarse,
            [e.target.name]: e.target.value
        })
    }

    //campo encontrado con error
    const [campo, setcampo] = useState('')


    //declaraciones de estado al registrar
    const [Registro, setRegistro] = useState({})

    //declaracion de estado errores
    const [error, actualizarError] = useState(false)

    //editar campo segun solicite
    const [editarCampo, seteditarCampo] = useState({
        editar_nombre_comercial: false,
        editar_representate_legal: false,
        editar_correo: false,
        editar_sitioweb: false
    })

    const editarInformacion = (e) => {
        seteditarCampo({
            ...editarCampo,
            [e]: false
        })

    }

    //declaracion de estado errores de campos
    const [validacion, setvalidacion] = useState({
        error_nombre_comercial: false,
        error_representante_legal: false,
        error_correo: false,
        error_sitioweb: false
    })


    const crearNegocio = (e) => {
        setRegistro(registrarse)
    }

    //desestructura el estado de validación
    const { error_nombre_comercial, error_representante_legal, error_correo, error_sitioweb } = validacion

    // maneja submit
    const submitRegistrar = (e) => {
        e.preventDefault()
        console.log("submit suscribirme")
        //1 VALIDAR

        if (nombre_comercial.trim() === '') {
            setvalidacion({
                ...validacion,
                error_nombre_comercial: true
            })
            actualizarError(true)
            setcampo('Nombre Comercial')
            return
        } else {
            setvalidacion({
                ...validacion,
                error_nombre_comercial: false
            })
            actualizarError(false)
        }

        if (nombre_representante_legal.trim() === '') {
            setvalidacion({
                ...validacion,
                error_representante_legal: true
            })
            actualizarError(true)
            setcampo('Nombre Propietario o Rep Legal')
            return
        } else {
            setvalidacion({
                ...validacion,
                error_representante_legal: false
            })
            actualizarError(false)
        }

        if (correo.trim() === '') {
            setvalidacion({
                ...validacion,
                error_correo: true
            })
            actualizarError(true)
            setcampo('Correo electrónico')
            return
        } else {
            setvalidacion({
                ...validacion,
                error_correo: false
            })
            actualizarError(false)
        }


        registrarse.id = uuidv4()
        registrarse.grabado = true;

        //habilita el botón de edición de cada campo
        seteditarCampo({
            editar_nombre_comercial: true,
            editar_representante_legal: true,
            editar_correo: true,
            editar_sitioweb: true
        })

        //3 REGISTRAR


        //4 REINICIAR FORM
        console.log("enviando...")
    }
    obtenerNegocio(registrarse)
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    //desestructura el estado de registrarse
    const { nombre_comercial, nombre_representante_legal, correo, sitioweb, grabado } = registrarse
    //desestructura el estado de edicion de cada campo 

    const { editar_nombre_comercial, editar_representante_legal, editar_correo, editar_sitioweb } = editarCampo


    return (
        <Fragment>
            <Form
                onSubmit={submitRegistrar}
            >
                <Form.Group
                    className="mb-3"
                    controlId="nombre_comercial"
                >
                    <Form.Label>Nombre Comercial</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ej: Mi Negocio S.A."
                        name='nombre_comercial'
                        value={nombre_comercial}
                        onChange={handleState}

                    ></Form.Control>
                    <Form.Text className="text-muted">
                        Nombre por el que le conocen
                    </Form.Text>
                    <Button
                        name="btnnombrecomercial"
                        variant='link'
                        disabled={!editar_nombre_comercial}
                        onClick={() => editarInformacion('editar_nombre_comercial')}
                    >Editar</Button>
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="nombre_representante_legal"
                >
                    <Form.Label>Nombre del rep. legal o propietario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ej: Juan Pérez"
                        name="nombre_representante_legal"
                        value={nombre_representante_legal}
                        onChange={handleState}

                    ></Form.Control>
                    <Form.Text className="text-muted">
                        Nombre del rep. legal o propietario
                    </Form.Text>
                    <Button
                        name="btnreplegal"
                        variant='link'
                        disabled={!editar_representante_legal}
                        onClick={() => editarInformacion('editar_representante_legal')}
                    >Editar</Button>
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="correo"

                >
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ej: jperez@minegocio.com"
                        name="correo"
                        value={correo}
                        onChange={handleState}

                    ></Form.Control>
                    <Form.Text className="text-muted">
                        Correo electrónico propietario o rep. legal
                    </Form.Text>
                    <Button
                        name="btncorreo"
                        variant='link'
                        disabled={!editar_correo}
                        onClick={() => editarInformacion('editar_correo')}
                    >Editar</Button>
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="sitioweb"
                >
                    <Form.Label>Sitio web</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ej: www.minegocio.com"
                        name="sitioweb"
                        value={sitioweb}
                        onChange={handleState}

                    ></Form.Control>
                    <Form.Text className="text-muted">
                        Sitio web (opcional)
                    </Form.Text>
                    <Button
                        name="btnsitioweb"
                        variant='link'
                        disabled={!editar_sitioweb}
                        onClick={() => editarInformacion('editar_sitioweb')}
                    >Editar</Button>
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                >Guardar información</Button>
            </Form>
            {error ?
                <Alert variant='danger' style={{ marginTop: '20px' }}>
                    {campo} es requerido
                </Alert>
                :
                null
            }


        </Fragment>

    );
}

export default SuscribirmeForm;