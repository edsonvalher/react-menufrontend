import React, { Fragment, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';


const ItemPaises = ({ paises, obtenerPais }) => {

    const [valor, setvalor] = useState({
        idpais: ''
    })
    const handlePais = e => {
        setvalor(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    obtenerPais(valor)

    const controles = paises.map(item => {
        const { idpais, nombre } = item
        return (
            <MenuItem key={idpais} value={idpais}>
                {nombre}
            </MenuItem>
        )
    })


    if (paises.length === 0) {
        return (
            <CircularProgress />
        )
    } else {
        return (
            <Fragment>
                <FormControl fullWidth='true'>
                    <InputLabel id="label-pais">Pais</InputLabel>
                    <Select
                        labelId="label-pais"
                        id="idpais"
                        name="idpais"
                        //value={valor}
                        onChange={handlePais}
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

export default ItemPaises;