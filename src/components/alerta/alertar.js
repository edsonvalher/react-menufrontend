import React from 'react';
import { Fragment } from 'react';
import { Col, Alert } from 'react-bootstrap';

const AlertarForm = ({ mostrar, mensaje, estado }) => {
    return (
        <Fragment>
            <Col sm={12} className={mostrar ? '' : 'd-none'}>
                <Alert variant={estado ? 'success' : 'warning'}>
                    {mensaje}
                </Alert>

            </Col>
        </Fragment>
    );
}

export default AlertarForm;