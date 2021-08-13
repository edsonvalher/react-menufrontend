import React, { Fragment, useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


const ItemCiudades = ({ departamentoSeleccionado, obtenerMunicipio }) => {

    //* este controla el pais entrante

    const [municipios, setMunicipios] = useState([])

    const [valor, setvalor] = useState({
        idciudad: 0
    })

    useEffect(() => {
        const consultaCiudades = async () => {
            if ((departamentoSeleccionado === '') || (departamentoSeleccionado === undefined)) {
                setMunicipios([])
                setvalor({
                    ['idciudad']: 0
                })
                return
            } else {
                const resultado = await axios.get(`http://localhost:1280/catalogos/ciudades/${departamentoSeleccionado}`)
                const { data } = resultado.data
                setMunicipios(data)

            }
        }

        consultaCiudades()
    }, [departamentoSeleccionado])

    // maneja los cambios
    const handleCiudad = e => {
        setvalor(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    // aqui debería de cambiar una vez el pais cambie o el no venga nulo


    const controles = municipios.map(item => {
        const { idciudad, ciudad } = item
        return (
            <MenuItem key={idciudad} value={idciudad}>
                {ciudad}
            </MenuItem>
        )
    })

    // primero valida que el pais tenga información para pasarlo al ciudad
    obtenerMunicipio(valor)

    if (municipios.length === 0) {
        return (
            <p>NO TIENE MUNICIPIO</p>
        )
    } else {
        return (
            <Fragment>
                <FormControl fullWidth='true'>
                    <InputLabel id="label-pais">Municipios</InputLabel>
                    <Select
                        labelId="label-pais"
                        id="idciudad"
                        name="idciudad"
                        onChange={handleCiudad}
                        size="small"
                        variant="standard"
                        fullWidth
                    >
                        <MenuItem value=""
                            size="small"
                            variant="standard"
                            fullWidth
                        >
                            <em>None</em>
                        </MenuItem>
                        {controles}

                    </Select>
                </FormControl>
            </Fragment>

        )
    }

}

export default ItemCiudades;