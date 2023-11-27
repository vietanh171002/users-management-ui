import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreateUser } from '../services/UserSevice';
import { toast } from 'react-toastify';

function ModalAddNew(props) {
    const { show, handleClose, handleUpdateUser } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);
        if (res && res.id && res.name && res.job) {
            handleClose();
            handleUpdateUser({ id: res.id, first_name: name });
            toast.success('Add new user sucessfully!');
            setJob('');
            setName('');
        } else {
            toast.error('Failed to add new user');
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                // onChange={(event) => (name2 = event.target.value)}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Job</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter job"
                                // onChange={(event) => (job2 = event.target.value)}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNew;
