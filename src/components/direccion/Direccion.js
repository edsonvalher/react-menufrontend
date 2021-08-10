import { FormControl } from '@material-ui/core';
import React, { Fragment, useState } from 'react';



const Direccion = () => {

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

    return (
        <Fragment>
            <h2>Direcciones</h2>
            <form>
                <FormControl
                    fullWidth='true'
                >
                    <div style={{ paddingRight: '30px' }}>




                    </div>

                </FormControl>

                <label className="mt-3">Dirección</label>
                <input
                    type="text"
                    name="direccion"
                    id="direccion"
                    className="form-control"
                    placeholder="ej: 1 ave 1-01 zona 1"
                    onChange={handleState}
                    value={direccion}

                />
            </form>


        </Fragment>
    );
}

export default Direccion;