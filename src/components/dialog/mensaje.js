import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const MensajeDialog = ({ titulo, contenido, mostrar = false, obtenerEstadoMensaje }) => {

    console.log("mensaje dialog colocado " + mostrar)

    const [show, setShow] = useState(mostrar);
    const handleClose = () => setShow(mostrar);


    const cerrar = () => setShow(false)

    useEffect(() => {
        if (!mostrar) return
        setShow(true)
    }, [mostrar])

    //devuelve el estado de mostrar el mensaje
    obtenerEstadoMensaje(mostrar)





    return (
        <Modal show={show} onHide={cerrar}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{contenido}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cerrar}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MensajeDialog;