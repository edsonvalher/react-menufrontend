import React, { Fragment } from 'react';

const [telefono, actualizarTelefono] = useState({
    numero

})

const Telefono = () => {
    return (
        <Fragment>
            <h2>Telefono</h2>
            <form>

                <label className="mt-3">Número de teléfono</label>
                <input
                    type="text"
                    name="numero"
                    id="numero"
                    className="form-control"
                    placeholder="ej: +51207455"
                    onChange={handleState}
                    value={nombre_comercial}
                />
            </form>
        </Fragment>
    );
}

export default Telefono;