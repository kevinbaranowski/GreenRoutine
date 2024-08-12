import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

const MakeSelect = ({ user, userId }) => {
    const [makes, setMakes] = useState([]);
    const [makeChoice, setMakeChoice] = useState("");
    const [error, setError] = useState('');

    const fetchCarMakeInfo = async () => {
        const response = await fetch('api/test/about', {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setMakes(data);
            setError('Car make options set.')
        } else {
            setError('Could not set car make options')
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'makeChoice') setMakeChoice(value);
        console.log(makeChoice)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            setError('');
            const payload = {
                Id: userId,
                makeChoice: makeChoice
            }
            const response = await fetch('/api/account/about', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (response.ok) {
                const data = await response.json();
                setError("Car make selection added successfully")
            } else {
                setError("Unable to add car make selection")
            }
    }

    let makeName = "";

    useEffect(() => {
        if (makes.length === 0) {
            fetchCarMakeInfo();
            if (user.makeChoice !== "00000000-0000-0000-0000-000000000000" && makes.length > 0) {
                const make = makes.filter(make => make.data.id === user.makeChoice);
                if (make) {
                    makeName = make.data.attributes.name;
                    console.log("make: " + makeName)
                }
            }
        }
    }, [])


    return (
        <>
            { makeName && 
                <>
                    <h4>Car Info</h4>
                    <p>Make: {makeName}</p>
                    <p>Model: </p>
                </>
            }
            <h4>Please select your vehicle make:</h4>
            { makes.length > 0 ? 
                <form>
                <select onChange={handleChange} name='makeChoice'>
                    {makes.map(make => (
                        <option key={make.data.id} value={make.data.id} >
                            {make.data.attributes.name}
                        </option>
                    ))}
                </select>
                <Button color="primary" onClick={handleSubmit}>Click</Button>
                </form> :
                <p>Loading makes...</p>
            }
            
        </>
    );
};

export default MakeSelect;