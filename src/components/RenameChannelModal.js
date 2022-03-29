import React, { useCallback, useMemo, useState, useEffect} from 'react';
import {Button, Form, FloatingLabel, Modal} from 'react-bootstrap';

const RenameChannelModal = ({onRenameChannel, id, currentChannel, onToggleModal, isActive}) => {
    const [renamedChannelName, setRenamedChannelName] = useState('');
    const [renamedChannelNameDirty, setRenamedChannelNameDirty] = useState(false);
    const [renamedChannelNameErrors, setRenamedChannelNameErrors] = useState('Обязательное поле');

    useEffect(() => {
        setRenamedChannelName(currentChannel?.name || '')
    }, [currentChannel])

    const validRenamedChannel = useMemo(() => {
        if (renamedChannelNameErrors) {
            return false;
        } else {
            return true;
        }
    },[renamedChannelName]);

    const handleRenameChannelName = (e) => {
        e.preventDefault();
        setRenamedChannelName(e.target.value)
        if (!e.target.value) {
            setRenamedChannelNameErrors('Обязательное поле')
        } else if (e.target.value.length < 3 || e.target.value.length > 20) {
            setRenamedChannelNameErrors('От 3 до 20 символов')
        } else {
            setRenamedChannelNameErrors('');
        }
    };

    const handleBlur = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case 'renamedChannelName': {
                setRenamedChannelNameDirty(true);
                break;
            }
        }
    };

    const handleRenameChannel = useCallback((e) => {
        e.preventDefault();
        onRenameChannel(id, renamedChannelName)
        onToggleModal(false);
    }, [id, renamedChannelName, onRenameChannel]);

    const handleOnHide = () => {
        setRenamedChannelName('');
        setRenamedChannelNameErrors('');
        onToggleModal(false);
    };

    return (
        <Modal centered show={isActive} onHide={handleOnHide}>
            <Modal.Header closeButton>
                <Modal.Title>Переименовать канал</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FloatingLabel controlId="floatingInput" label="Название канала" >
                    <Form.Control type='text' placeholder="Название канала" name="renamedChannelName" onChange={handleRenameChannelName} value={renamedChannelName} onBlur={handleBlur} />
                    {(renamedChannelNameDirty && renamedChannelNameErrors) && <div className="Errors" >{renamedChannelNameErrors}</div>}  
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleOnHide}>Отменить</Button>
                <Button variant="primary" onClick={handleRenameChannel} disabled={!validRenamedChannel}>Отправить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RenameChannelModal;