import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CarProfile from "../CarComponents/CarProfile";

const EditCarInfoModal = ({ isOpen, toggle }) => {

    const addMake = async (e) => {
        e.preventDefault();
        setError('');
        const payload = {
            Id: userId,
            makeChoice: makeChoice,
            makeName: makeName
        }
        const response = await fetch('/api/account/AddMake', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            setSubmitted(true);
            setError("Car make selection added successfully")
        } else {
            setError("Unable to add car make selection")
        }
    }

    const addModel = async (e) => {
        e.preventDefault();
        setError('');
        const payload = {
            Id: userId,
            modelChoice: modelChoice,
            modelName: modelName
        }
        const response = await fetch('/api/account/AddModel', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            setError("")
        } else {
            setError(response.errors)
        }
    }

    const handleSubmit = async (e) => {
        await addMake();
        await addModel();
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>Edit Car Info</ModalHeader>
            <ModalBody>
                <Form>
                    <CarProfile/>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Submit</Button>
                <Button onClick={() => {
                    toggle();
                }}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
};

export default EditCarInfoModal;