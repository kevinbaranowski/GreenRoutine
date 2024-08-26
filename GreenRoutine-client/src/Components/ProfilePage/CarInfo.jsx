import { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';

const CarInfo = ({ user }) => {
    const [displayModal, setDisplayModal] = useState(false);

    const toggle = () => {
        setDisplayModal(!displayModal);
    }

    return (
        <div style={{
            borderTop: 'solid 1px black',
            marginTop: '1rem',
            paddingTop: '1rem'
        }}>
            <Row>
                <Col>
                    <ul className="no-bullets-on-list">
                        <li>Car Make: {user.makeName ? user.makeName : "No car make available"}</li>
                        <li>Car Model: {user.modelName ? user.modelName : "No car model available"}</li>
                    </ul>
                </Col>
                <Col style={{ textAlign: 'right'}}>
                    <Button color='success' onClick={toggle}>Edit Car Info</Button>
                </Col>
            </Row>
        </div>
    )
}

export default CarInfo;