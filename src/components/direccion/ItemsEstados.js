import React, { Fragment, useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


const ItemEstados = ({ paisSeleccionado, obtenerDepartamento }) => {

    //* este controla el pais entrante

    const [departamentos, setDepartamento] = useState([])

    const [valor, setvalor] = useState({
        idestado: 0
    })

    useEffect(() => {
        const consultaEstados = async () => {
            if ((paisSeleccionado === '') || (paisSeleccionado === undefined)) {
                setDepartamento([])
                setvalor({
                    ['idestado']: 0
                })
                return
            } else {
                const resultado = await axios.get(`http://localhost:1280/catalogos/estados/${paisSeleccionado}`)
                const { data } = resultado.data
                setDepartamento(data)

            }
        }

        consultaEstados()
    }, [paisSeleccionado])

    // maneja los cambios
    const handleEstado = e => {
        setvalor(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    // aqui debería de cambiar una vez el pais cambie o el no venga nulo


    const controles = departamentos.map(item => {
        const { idestado, estado } = item
        return (
            <MenuItem key={idestado} value={idestado}>
                {estado}
            </MenuItem>
        )
    })

    // primero valida que el pais tenga información para pasarlo al estado
    obtenerDepartamento(valor)

    if (departamentos.length === 0) {
        return (
            <p>NO TIENE DEPARTAMENTOS</p>
        )
    } else {
        return (
            <Fragment>
                <FormControl fullWidth='true'>
                    <InputLabel id="label-pais">Departamentos</InputLabel>
                    <Select
                        labelId="label-pais"
                        id="idestado"
                        name="idestado"
                        onChange={handleEstado}
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

export default ItemEstados;