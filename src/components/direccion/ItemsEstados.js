import React, { Fragment, useState, useEffect } from 'react';
import { Alert, Form, Spinner } from "react-bootstrap";
import axios from 'axios';
import { getEstados } from '../../services/catalogos';


const ItemEstados = ({ paisSeleccionado, obtenerEstado }) => {

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
                const resultado = await getEstados(paisSeleccionado)
                const { data } = resultado.data
                setDepartamento(data)

            }
        }

        consultaEstados()
    }, [paisSeleccionado])

    // maneja los cambios

    // aqui debería de cambiar una vez el pais cambie o el no venga nulo

    const opciones = departamentos.map(item => {
        const { idestado, estado } = item
        return (
            <option key={idestado} value={idestado}>{estado}</option>
        )
    })
    // primero valida que el pais tenga información para pasarlo al estado

    const validarpais = () => {
        try {
            return paisSeleccionado[0]

        } catch (error) {
            return undefined
        }
    }

    const handleChange = (e) => {
        setvalor({
            ...valor,
            [e.target.name]: [e.target.value]
        })
    }

    obtenerEstado(valor)

    if (departamentos.length === 0 || (validarpais() === undefined || validarpais() === '' || validarpais() === '0')) {

        return (
            <div>
                <Alert variant='warning'>
                    <span>Debe seleccionar un país</span>
                </Alert>
            </div>

        )

    } else if (departamentos.length === 0 && (validarpais() == undefined || validarpais() === '' || validarpais() === '0')) {
        return (
            <div>
                <Spinner animation="border" />
            </div>
        )
    } else if (departamentos.length !== 0 && validarpais() !== '0') {
        return (
            <Fragment>
                <Form.Control
                    as="select"
                    custom
                    name="idestado"
                    onChange={handleChange}
                >
                    <option key={0} value={0}>seleccione</option>
                    {opciones}
                </Form.Control>
            </Fragment>
        )
    }

}

export default ItemEstados;