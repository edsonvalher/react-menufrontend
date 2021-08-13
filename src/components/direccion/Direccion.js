import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import ItemPaises from './ItemsPaises';
import ItemEstados from './ItemsEstados';
import ItemCiudades from './itemCiudades';





const DireccionForm = ({ negocio }) => {

    const [paises, setpais] = useState([])

    const [pais, setPais] = useState()
    const [departamento, setDepartamento] = useState()




    //*consulta paises colocandolo en el state
    useEffect(() => {
        if (Object.keys(paises).length !== 0) return
        const consultaPaises = async () => {
            const resultado = await axios.get(`http://localhost:1280/catalogos/paises`)
            const { data } = resultado.data
            setpais(data)
        }
        consultaPaises()
    }, [paises])




    const [direccionEstado, actualizarDireccion] = useState({
        iddireccion: 0,
        direccion: '',
        idciudad: 0,
        idnegocio: 0,
        latitud: 0,
        longitud: 0
    })

    const handleState = (e) => {
        actualizarDireccion({
            ...direccionEstado,
            [e.target.name]: e.target.value
        })
    }
    const { iddireccion, direccion, idciudad, idnegocio, latitud, longitud } = direccionEstado

    //comunicandome con componente registrarse
    if (JSON.stringify(negocio) === '{}') {
        console.log("no viene naa")
    } else {
        console.log("chingas a tu ma!")

    }
    const obtenerPais = (pais) => {
        const { idpais } = pais
        setPais(idpais)

        //console.log(idpais)
    }
    const obtenerDepartamento = (departamento) => {
        const { idestado } = departamento
        setDepartamento(idestado)
    }



    return (
        <Fragment>
            <h2>Direcciones</h2>
            <ItemPaises
                paises={paises}
                obtenerPais={obtenerPais}
            />
            <ItemEstados
                paisSeleccionado={pais}
                obtenerDepartamento={obtenerDepartamento}
            />
            <ItemCiudades
                departamentoSeleccionado={departamento}
                obtenerMunicipio={obtenerDepartamento}
            />
        </Fragment>
    );
}

export default DireccionForm;