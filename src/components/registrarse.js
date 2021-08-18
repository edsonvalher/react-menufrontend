import { Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Alert from '@material-ui/lab/Alert';

const RegistrarseForm = ({ crearNegocio }) => {
    //declaracion de estados

    const [registrarse, actualizarRegistrarse] = useState({
        id: 0,
        nombre_comercial: '',
        nombre_representante_legal: '',
        correo: '',
        sitioweb: '',
        grabado: false
    })

    const [editar, setEditar] = useState(
        {
            editar_campo1: false,
            editar_campo: false,
            editar_campo3: false,
            editar_campo4: false
        })


    const [error, actualizarError] = useState(false)

    const [validacion, actualizarValidacion] = useState({
        error_campo1: false,
        error_campo2: false,
        error_campo3: false
    })
    //localstorage
    let informacion = localStorage.getItem('negocio')
    if (!informacion) {
        informacion = {}
    }

    useEffect(() => {
        if (informacion) {
            registrarse.id = uuidv4()
            localStorage.setItem('negocio', JSON.stringify(registrarse))
        } else {
            localStorage.setItem('negocio', {})
        }
    }, [registrarse])

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
    const { editar_campo1, editar_campo2, editar_campo3, editar_campo4 } = editar

    const submitRegistrar = (e) => {
        e.preventDefault()
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


        setEditar({
            editar_campo1: true,
            editar_campo2: true,
            editar_campo3: true,
            editar_campo4: true
        })

        //3 REGISTRAR
        crearNegocio(registrarse)



        //4 REINCIIO FORM
    }
    const editarInformacion = (e) => {
        console.log(e)
        setEditar(
            {
                ...editar,
                [e]: false
            }
        )

        actualizarRegistrarse({
            ...registrarse,
            ['grabado']: false
        })



    }



    return (
        <Fragment>
            <h2>Datos del Negocio</h2>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        error={error_campo1}
                        id='nombre_comercial'
                        name='nombre_comercial'
                        aria-describedby='my-helper-text'
                        label='Nombre Comercial'
                        variant='standard'
                        fullWidth
                        helperText='Nombre el cual te conocen'
                        size="small"
                        onChange={handleState}
                        value={nombre_comercial}
                        style={{ marginTop: '10px' }}
                        disabled={editar_campo1}

                    />
                    <Button
                        color="primary"
                        id="btnCampo1"
                        name="btnCampo1"
                        disableRipple="true"
                        disabled={!editar_campo1}
                        size="small"
                        onClick={() => editarInformacion('editar_campo1')}
                    >Editar</Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        error={error_campo2}
                        id="nombre_representante_legal"
                        name='nombre_representante_legal'
                        aria-describedby="my-helper-text"
                        label="Nombre del rep. legal o propietario"
                        variant="standard"
                        fullWidth
                        helperText='Persona que representa o es propietario del negocio'
                        size="small"
                        onChange={handleState}
                        value={nombre_representante_legal}
                        style={{ marginTop: '10px' }}
                        disabled={editar_campo2}
                    />
                    <Button
                        color="primary"
                        id="btnCampo2"
                        name="btnCampo2"
                        disableRipple="true"
                        size="small"
                        onClick={() => editarInformacion('editar_campo2')}
                        disabled={!editar_campo2}
                    >Editar</Button>
                </Grid>
            </Grid>
            <Box display="flex" flexDirection="row" p={1} m={1}>
                <Box p={1} >


                </Box>

                <Box p={1} >

                </Box>

            </Box>
            <Box display="flex" flexDirection="row" p={1} m={1}>
                <Box p={1} >
                    <TextField
                        error={error_campo3}
                        id="correo"
                        name='correo'
                        aria-describedby="my-helper-text"
                        label="Correo electrónico"
                        variant="standard"
                        fullWidth
                        helperText='Correo del propietario o rep. legal'
                        size="small"
                        onChange={handleState}
                        value={correo}
                        style={{ marginTop: '10px' }}
                        disabled={editar_campo3}
                    />
                    <Button
                        color="primary"
                        id="btnCampo3"
                        name="btnCampo3"
                        disableRipple="true"
                        disabled={!editar_campo3}
                        size="small"
                        onClick={() => editarInformacion('editar_campo3')}
                    >Editar</Button>
                </Box>
                <Box p={1}

                >
                    <TextField
                        id="sitioweb"
                        name='sitioweb'
                        aria-describedby="my-helper-text"
                        label="Sitio web"
                        variant="standard"
                        fullWidth
                        helperText='Sitio web (opcional)'
                        size="small"
                        onChange={handleState}
                        value={sitioweb}
                        style={{ marginTop: '10px' }}
                        disabled={editar_campo4}
                    />
                    <Button
                        color="primary"
                        id="btnCampo4"
                        name="btnCampo4"
                        disableRipple="true"
                        disabled={!editar_campo4}
                        size="small"
                        onClick={() => editarInformacion('editar_campo4')}
                    >Editar</Button>
                </Box>
            </Box>

            <div style={{}}>



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


        </Fragment>
    );
}

export default RegistrarseForm;