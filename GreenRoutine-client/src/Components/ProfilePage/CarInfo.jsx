import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import EditCarInfoModal from './EditCarInfoModal';

const CarInfo = ({ user }) => {
    const [displayModal, setDisplayModal] = useState(false);
    const [carMake, setCarMake] = useState(user.makeName || '');
    const [carModel, setCarModel] = useState(user.modelName || '')

    const toggle = () => {
        setDisplayModal(!displayModal);
    }

    useEffect(() => {
        if (user) {
            setCarMake(user.makeName);
            setCarModel(user.modelName);
        }
    }, [user])

    return (
        <div style={{
            borderTop: 'solid 1px black',
            marginTop: '1rem',
            paddingTop: '1rem'
        }}>
            <Row>
                <Col>
                    <ul className="no-bullets-on-list">
                        <li>Car Make: {carMake ? carMake : "No car make available"}</li>
                        <li>Car Model: {carModel ? carModel : "No car model available"}</li>
                    </ul>
                </Col>
                <Col style={{ textAlign: 'right'}}>
                    <Button color='success' onClick={toggle}>Edit Car Info</Button>
                    <EditCarInfoModal isOpen={displayModal} toggle={toggle} setCarMake={setCarMake} setCarModel={setCarModel}/>
                </Col>
            </Row>
        </div>
    )
}

export default CarInfo;