import { Button, FormControl, FormHelperText, Input, InputLabel, TextField } from '@material-ui/core';
import React, { Fragment, useState } from 'react';

import Alert from '@material-ui/lab/Alert';

const RegistrarseForm = ({ crearNegocio }) => {
    //declaracion de estados
    const [registrarse, actualizarRegistrarse] = useState({
        nombre_comercial: '',
        nombre_representante_legal: '',
        correo: '',
        sitioweb: '',
        grabado: false
    })

    const [error, actualizarError] = useState(false)

    const [validacion, actualizarValidacion] = useState({
        error_campo1: false,
        error_campo2: false,
        error_campo3: false
    })


    //maneja el estado
    const handleState = (e) => {
        actualizarRegistrarse({
            ...registrarse,
            [e.target.name]: e.target.value
        })
    }

    //Extraner valores
    const { nombre_comercial, nombre_representante_legal, correo, sitioweb, grabado } = registrarse
    const { error_campo1, error_campo2, error_campo3 } = validacion

    const submitRegistrar = (e) => {
        e.preventDefault()
        console.log('este es el submit')
        //1 VALIDAR

        if (nombre_comercial.trim() === '') {
            actualizarValidacion({
                ...validacion,
                error_campo1: true
            })
            actualizarError(true)
            return
        } else {
            validacion.error_campo1 = false
        }

        if (nombre_representante_legal.trim() === '') {
            actualizarValidacion({
                ...validacion,
                error_campo2: true
            })
            actualizarError(true)
            return
        } else {
            validacion.error_campo2 = false
        }

        if (correo.trim() === '') {
            actualizarValidacion({
                ...validacion,
                error_campo3: true
            })
            actualizarError(true)
            return
        } else {
            validacion.error_campo3 = false
        }


        actualizarError(false)
        registrarse.grabado = true;

        actualizarRegistrarse({
            ...registrarse,
            grabado: true
        })

        //3 REGISTRAR
        crearNegocio(registrarse)

        //4 REINICIAR FORM
    }

    return (
        <Fragment>
            <h2>Datos del Negocio</h2>
            <form

            >
                <FormControl
                    fullWidth='true'
                >
                    <div style={{ paddingLeft: '30px' }}>
                        <TextField
                            error={error_campo1}
                            id='nombre_comercial'
                            name='nombre_comercial'
                            aria-describedby='my-helper-text'
                            label='Nombre Comercial'
                            variant='outlined'
                            fullWidth
                            helperText='Nombre el cual te conocen'
                            size="small"
                            onChange={handleState}
                            value={nombre_comercial}
                            style={{ marginTop: '10px' }}
                        />

                        <TextField
                            error={error_campo2}
                            id="nombre_representante_legal"
                            name='nombre_representante_legal'
                            aria-describedby="my-helper-text"
                            label="Nombre del rep. legal o propietario"
                            variant="outlined"
                            fullWidth
                            helperText='Persona que representa o es propietario del negocio'
                            size="small"
                            onChange={handleState}
                            value={nombre_representante_legal}
                            style={{ marginTop: '10px' }}

                        />
                        <TextField
                            error={error_campo3}
                            id="correo"
                            name='correo'
                            aria-describedby="my-helper-text"
                            label="Correo electrónico"
                            variant="outlined"
                            fullWidth
                            helperText='Correo del propietario o rep. legal'
                            size="small"
                            onChange={handleState}
                            value={correo}
                            style={{ marginTop: '10px' }}
                        />
                        <TextField
                            id="sitioweb"
                            name='sitioweb'
                            aria-describedby="my-helper-text"
                            label="Sitio web"
                            variant="outlined"
                            fullWidth
                            helperText='Sitio web (opcional)'
                            size="small"
                            onChange={handleState}
                            value={sitioweb}
                            style={{ marginTop: '10px' }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth="true"
                            elementType="submit"
                            onClick={(e) => { submitRegistrar(e) }}
                            style={{ marginTop: '10px' }}
                            disabled={grabado}
                        >
                            Registrar
                        </Button>
                        {error ?
                            <Alert severity="warning" style={{ marginTop: '10px' }}>Por favor revise los campos</Alert>
                            :
                            null
                        }

                    </div>
                </FormControl>
            </form>
        </Fragment>
    );
}

export default RegistrarseForm;