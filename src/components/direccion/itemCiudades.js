import React, { Fragment, useState, useEffect } from 'react';
import { Alert, Form, Spinner } from "react-bootstrap";
import axios from 'axios';


const ItemCiudades = ({ estadoSeleccionado, obtenerCiudad }) => {

    //* este controla el pais entrante

    const [municipios, setMunicipios] = useState([])

    const [valor, setvalor] = useState({
        idciudad: 0
    })

    useEffect(() => {
        const consultaCiudades = async () => {
            if ((estadoSeleccionado === '') || (estadoSeleccionado === undefined)) {
                setMunicipios([])
                setvalor({
                    ['idciudad']: 0
                })
                return
            } else {
                const resultado = await axios.get(`http://localhost:1280/catalogos/ciudades/${estadoSeleccionado}`)
                const { data } = resultado.data
                setMunicipios(data)

            }
        }

        consultaCiudades()
    }, [estadoSeleccionado])

    // maneja los cambios
    const handleChange = e => {
        setvalor(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    // aqui debería de cambiar una vez el pais cambie o el no venga nulo


    const opciones = municipios.map(item => {
        const { idciudad, ciudad } = item
        return (
            <option key={idciudad} value={idciudad}>{ciudad}</option>
        )
    })

    // primero valida que el pais tenga información para pasarlo al ciudad
    obtenerCiudad(valor)

    if (municipios.length === 0) {
        return (
            <div>
                <Alert variant='warning'>
                    <span>Debe seleccionar un departamento</span>
                </Alert>
            </div>
        )
    } else {
        return (
            <Fragment>
                <Form.Control
                    as="select"
                    custom
                    name="idciudad"
                    onChange={handleChange}
                >
                    <option key={0} value={0}>seleccione</option>
                    {opciones}
                </Form.Control>
            </Fragment>

        )
    }

}

export default ItemCiudades;