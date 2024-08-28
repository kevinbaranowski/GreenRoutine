import MakeSelect from './MakeSelect.jsx'
import { useState, useEffect } from 'react';

const CarProfile = ({ toggle, setCarMake, setCarModel }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    const fetchUserInfo = async () => {
        const response = await fetch('pingauth', {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
            setError('User info set.')
        } else {
            setError('Could not set user info')
        }
    }

    useEffect(() => {
        const fetchIsAuthenticated = async () => {
            try {
                const response = await fetch('api/Account/IsUserAuthenticated', {
                    method: "GET"
                });

                if (response.ok) {
                    setIsAuthenticated(true)
                }
            } catch (error) {
                setError('An error occurred while fetching data.');
            }
        };
        fetchIsAuthenticated();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserInfo();
        } else {
            setError('User is not authenticated.')
        }
    }, [isAuthenticated])

    if (!userInfo) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <MakeSelect userId={userInfo.id} toggle={toggle} setCarMake={setCarMake} setCarModel={setCarModel}/>
        </>
    );
};

export default CarProfile;