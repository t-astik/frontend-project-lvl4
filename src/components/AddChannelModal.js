import React, { useCallback, useMemo, useState} from 'react';
import {Button, Form, FloatingLabel, Modal} from 'react-bootstrap';


const AddChannelModal = ({onAddChannel, onToggleModal, isActive}) => {

    const [channelName, setChannelName] = useState('');
    const [channelNameDirty, setChannelNameDirty] = useState(false);
    const [channelNameErrors, setChannelNameErrors] = useState('Обязательное поле');

    
    const validChannel = useMemo(() => {
        if (channelNameErrors) {
            return false;
        } else {
            return true;
        }
    },[channelName]);

    const handleChangeChannelName = (e) => {
        e.preventDefault();
        setChannelName(e.target.value)
        if (!e.target.value) {
            setChannelNameErrors('Обязательное поле')
        } else if (e.target.value.length < 3 || e.target.value.length > 20) {
            setChannelNameErrors('От 3 до 20 символов')
        } else {
            setChannelNameErrors('');
        }
    };

    const handleBlur = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case 'channelName': {
                setChannelNameDirty(true);
                break;
            }
        }
    };

    const handleAddChannel = useCallback((e) => {
        e.preventDefault();
        onAddChannel(channelName)
        onToggleModal(false);
        setChannelName('');
    }, [channelName, onAddChannel]);

    const handleOnHide = () => {
            setChannelName('');
            setChannelNameErrors('');
            onToggleModal(false);        
    };

    return (
        <Modal centered show={isActive} onHide={handleOnHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить канал</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FloatingLabel controlId="floatingInput" label="Название канала">
                    <Form.Control type='text' placeholder="Название канала" name="channelName" onChange={handleChangeChannelName} value={channelName} onBlur={handleBlur} />
                    {(channelNameDirty && channelNameErrors) && <div className="Errors">{channelNameErrors}</div>}  
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleOnHide}>Отменить</Button>
                <Button variant="primary" onClick={handleAddChannel} disabled={!validChannel}>Отправить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddChannelModal;