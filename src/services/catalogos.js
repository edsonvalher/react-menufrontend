import axios from 'axios';
import React from 'react';
import Constantes from '../constants/Constantes';


export const getpaises = () => {
    console.log("obteniendo los paises")
    console.log(Constantes.URLBase)

    const metodo = 'catalogos/paises'
    return axios.get(`${Constantes.URLBase}/${metodo}`)
}

export const getEstados = (pais) => {
    const metodo = `catalogos/estados/${pais}`
    return axios.get(`${Constantes.URLBase}/${metodo}`)
}

export const getCiudades = (estado) => {
    const metodo = `catalogos/ciudades/${estado}`
    return axios.get(`${Constantes.URLBase}/${metodo}`)
}
