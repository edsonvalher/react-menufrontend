import React, { Fragment, useState, useEffect } from 'react';
import { Form, Spinner } from "react-bootstrap";
import axios from 'axios';


const ItemPaises = ({ obtenerPais }) => {

    const [paises, setpaises] = useState([])
    const [seleccion, setSeleccion] = useState({
        idpais: ''
    })
    //obtiene los paises del estado
    const obtienePaises = async () => {
        const resultado = await axios.get(`http://localhost:1280/catalogos/paises`)
        const { data } = resultado.data
        setpaises(data)
        return data
    }

    useEffect(() => {
        if (Object.keys(paises).length !== 0) return
        obtienePaises()
    }, [])

    const opciones = paises.map(item => {
        const { idpais, nombre } = item
        return (
            <option key={idpais} value={idpais}>{nombre}</option>
        )
    })

    const handleChange = (e) => {
        setSeleccion({
            ...seleccion,
            [e.target.name]: [e.target.value]
        })
    }
    //envia el valor seleccionado
    obtenerPais(seleccion)
    if (paises.length === 0) {
        return (
            <Fragment>
                <div>
                    <Spinner animation="border" />
                </div>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <Form.Control
                    as="select"
                    custom
                    name="idpais"
                    onChange={handleChange}
                >
                    <option key={0} value={0}>seleccione</option>
                    {opciones}
                </Form.Control>
            </Fragment>
        )
    }


}

export default ItemPaises;