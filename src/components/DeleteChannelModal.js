import React, { useCallback } from 'react';
import {Button, Modal} from 'react-bootstrap';


const DeleteChanneleModal = ({ id, isActive, onDeleteChannel, onToggleModal }) => {

    const handelRemoveChannel = useCallback((e) => {
        e.preventDefault();
        onToggleModal(false);
        onDeleteChannel(id);
    }, [id, onDeleteChannel])

    const handleOnHide = () => {
        onToggleModal(false);
    };

    return (
        <Modal centered show={isActive} onHide={handleOnHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Уверены?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleOnHide}>Отменить</Button>
                <Button variant="danger" onClick={handelRemoveChannel}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteChanneleModal;