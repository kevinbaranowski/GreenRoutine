import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, Card, Row, Col } from 'reactstrap';
import { useEffect, useState } from 'react';
import CircularImage from '../styling/CircularImage';
import formatNumbers from '../../utils/helpers/formatNumbers';
import LeavesCount from '../NavComponents/LeavesCount';
import AddFriendModal from './AddFriendModal';
import RemoveFriendButton from '../FriendProfilePage/RemoveFriendButton';
import profileImg from '../../assets/images/ProfilePlaceholder.jpg'
import ViewProfileButton from '../FriendProfilePage/ViewProfileButton';
import ChallengeButton from '../ChallengeRequests/ChallengeButton';

const FriendsList = ({ userId }) => {
    const [displayAddModal, setDisplayAddModal] = useState(false);
    const [friends, setFriends] = useState([]);
    const [friendPhotos, setFriendPhotos] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [error, setError] = useState();
    
    const toggleAddFriend = () => {
        setDisplayAddModal(!displayAddModal);
    }
    const fetchFriends = async () => {
        const response = await fetch(`/api/Friend/${userId}/friends`, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setFriends(data);
            setError('Friends info set')
        } else {
            setError('Could not set friends')
        }
    }

    const fetchFriendPhotos = async () => {
        const response = await fetch(`/api/Friend/${userId}/getFriendPhotos`, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setFriendPhotos(data);
            setError('Friend Photos set')
        } else {
            setError('Could not set friend photos')
        }
    }

    useEffect(() => {
        if (userId) {
            fetchFriends();
            fetchFriendPhotos();
        }
    }, [userId])

    const formatFriends = (friends) => {
        return friends.map((friend) => {
            const name = friend.friendFirstName + " " + friend.friendLastName;
            const friendPhoto = friendPhotos.find(photo => photo.userId === friend.friendId);
            let photo;
            if (!friendPhoto) {
                photo = "";
            } else {
                photo = `data:${friendPhoto.contentType};base64,${friendPhoto.photo}`;
            }
            return {
                id: friend.friendId,
                name: name,
                username: friend.friendUsername,
                lifeTimeLeaves: formatNumbers(friend.friendLifetimeLeaves),
                photo: photo ? photo : profileImg
            }
        });
    };

    useEffect(() => {
        setRowData(formatFriends(friends))
    }, [friends, friendPhotos])

    const handleRemoveFriendSubmit = async (friendId) => {
        const payload = {
            friendId: friendId,
            userId: userId
        }
        const response = await fetch('api/Friend/remove', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            setFriends(prevFriends => prevFriends.filter(friend => friend.friendId !== friendId));
        } else {
            console.error("Unable to remove friend")
        }
    }

    const handleAddFriendSubmit = (newFriend) => {
        setFriends(prevFriends => [...prevFriends, {
            friendId: newFriend.friendId,
            friendFirstName: newFriend.friendFirstName,
            friendLastName: newFriend.friendLastName,
            friendUsername: newFriend.friendUsername,
            friendLifetimeLeaves: newFriend.friendLifetimeLeaves
        }]);
        toggleAddFriend();
    }

    const columnDefs = [
        { field: "photo", 
            cellRenderer: CircularImage, 
            autoHeight: true, 
            headerName: "Photo" 
        },
        { field: "name", filter: true, headerName: "Name" },
        { field: "username", filter: true, headerName: "Username" },
        { field: "lifeTimeLeaves", cellRenderer: LeavesCount, headerName: "Lifetime Leaves" },
        { field: "viewProfile", 
            cellRenderer: ViewProfileButton, 
            headerName: "View Profile",
            cellRendererParams: (params) => ({
                data: params.data
            })
        },
        { field: "button", 
            cellRenderer: ChallengeButton, 
            headerName: "Challenge",
            cellRendererParams: (params) => ({
                data: params.data,
                userId: userId
            })
        },
        { field: "button", 
            cellRenderer: RemoveFriendButton, 
            headerName: "Remove Friend", 
            cellRendererParams: (params) => ({
                data: params.data,
                userId: userId,
                handleRemoveFriendSubmit: handleRemoveFriendSubmit
            }) 
        }
    ];

    const defaultColDef = {
        resizable: true,
        sortable: true,
        flex: 1,
    };

    return (
        <Card className="lightgrey-card mb-3" >
            <div
                className="ag-theme-quartz" // applying the Data Grid theme
            >
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <h3 className='m-2 display-6'>Friends</h3>
                    </Col>
                    <Col xs='4' className='d-flex justify-content-end'>
                        <Button onClick={toggleAddFriend}color="success m-2">
                            + Add Friend
                        </Button>
                        <AddFriendModal 
                            toggle={toggleAddFriend} 
                            isOpen={displayAddModal} 
                            userId={userId}
                            onAddFriend={handleAddFriendSubmit}
                        />
                    </Col>
                </Row>
                
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={5}
                    paginationPageSizeSelector={[5, 10, 20]}
                    domLayout="autoHeight"
                    defaultColDef={defaultColDef}
                    frameworkComponents={{
                        circularImage: CircularImage,
                        leavesCount: LeavesCount,
                        challengeButton: ChallengeButton,
                        removeFriendButton: RemoveFriendButton,
                        viewProfileButton: ViewProfileButton
                    }}
                />
            </div>
        </Card>
    );
};

export default FriendsList;