import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { putEditUser } from '../services/UserSevice';
import { toast } from 'react-toastify';

function ModalEditUser(props) {
    const { show, handleClose, handleUpdate, editedUserData } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleEdit = async () => {
        let res = await putEditUser(editedUserData.id, name, job);
        if (res && res.name && res.job) {
            handleClose();
            handleUpdate(res.name);
            toast.success('Edit user sucessfully!');
            setJob('');
            setName('');
            console.log(res);
        } else {
            toast.error('Failed to edit user');
            console.log(res);
        }
    };

    useEffect(() => {
        setName(editedUserData.first_name);
    }, [editedUserData]);

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Edit user </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
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
                    <Button variant="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;
