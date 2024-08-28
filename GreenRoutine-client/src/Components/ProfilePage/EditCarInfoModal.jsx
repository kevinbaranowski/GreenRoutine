import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CarProfile from "../CarComponents/CarProfile";

const EditCarInfoModal = ({ isOpen, toggle, setCarMake, setCarModel }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>Edit Car Info</ModalHeader>
            <ModalBody>
                <Form>
                    <CarProfile toggle={toggle} setCarMake={setCarMake} setCarModel={setCarModel}/>
                </Form>
            </ModalBody>
        </Modal>
    )
};

export default EditCarInfoModal;