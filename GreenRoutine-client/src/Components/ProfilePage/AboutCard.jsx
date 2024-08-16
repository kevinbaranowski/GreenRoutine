import { useState } from 'react'
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import editIcon from '../../assets/images/edit_icon.png'
import EditAboutModal from "./EditAboutModal";

const AboutCard = ({ user, setUserInfo, userId, fetchUserInfo }) => {
    const [displayModal, setDisplayModal] = useState(false);

    const toggle = () => {
        setDisplayModal(!displayModal);
    }
        
    return (
        <Card className="lightgrey-card p-3">
            <CardBody>
                <div className='d-flex'>
                    <CardTitle className="display-6">
                        About
                    </CardTitle> 
                    <Button className='edit-button' onClick={toggle}>
                        <img src={editIcon} height="20"/> {/* add conditional rendering to edit button based on this being the user's profile */}
                    </Button>
                    <EditAboutModal isOpen={displayModal} toggle={toggle} user={user} setUserInfo={setUserInfo} userId={userId} fetchUserInfo={fetchUserInfo}/>
                </div>
                <ul className="no-bullets-on-list">
                    <li>Pronouns: {user.pronouns ? user.pronouns : "No pronouns available"}</li>
                    <li>Email: {user.email}</li>
                    <li>Bio: {user.bio ? user.bio : "No bio available"}</li>
                    <li>Country: {user.country ? user.country : "No country available"} </li>
                    <li>Date Joined: {user.dateJoined}</li>
                    <li>Car Make: {user.makeName ? user.makeName : "No car make available"}</li>
                    <li>Car Model: {user.modelName ? user.modelName : "No car model available"}</li>
                </ul>
            </CardBody>
        </Card>
    );
}

export default AboutCard;