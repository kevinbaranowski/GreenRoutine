import MakeSelect from './MakeSelect.jsx'
import ModelSelect from './ModelSelect.jsx'
import { useState, useEffect } from 'react';

const CarProfile = () => {
    const [userInfo, setUserInfo] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ready, setReady] = useState(false);
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
            <MakeSelect user={userInfo} userId={userInfo.id} />
            <ModelSelect user={userInfo} userId={userInfo.id} ready={ready} setReady={setReady} />
        </>

    );
};

export default CarProfile;