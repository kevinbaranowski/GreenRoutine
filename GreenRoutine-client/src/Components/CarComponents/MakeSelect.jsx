import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import ModelSelect from './ModelSelect';

const MakeSelect = ({ userId }) => {
    const [makes, setMakes] = useState([]);
    const [makeChoice, setMakeChoice] = useState("");
    const [makeName, setMakeName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const fetchCarMakeInfo = async () => {
        const response = await fetch('api/test/GetMakes', {
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
    const handleChange = async (e) => {
        const { name, value } = e.target;
        if (name === 'makeChoice') {
            setMakeChoice(value);
            const selectedMake = makes.find(make => make.data.id === value)
            setMakeName(selectedMake.data.attributes.name)
            setSubmitted(true);
            // e.preventDefault();
            // setError('');
            // const payload = {
            //     Id: userId,
            //     makeChoice: value,
            //     makeName: selectedMake.data.attributes.name
            // }
            // const response = await fetch('/api/account/AddMake', {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(payload)
            // })
            // if (response.ok) {
            //     setSubmitted(true);
            //     setError("Car make selection added successfully")
            // } else {
            //     setError("Unable to add car make selection")
            // }
        }
    }

    useEffect(() => {
        console.log(makeName + ": " + makeChoice)
    }, [makeName, makeChoice])

    const handleSubmit = async (e) => {
        // e.preventDefault();
        //     setError('');
        //     const payload = {
        //         Id: userId,
        //         makeChoice: makeChoice,
        //         makeName: makeName
        //     }
        //     const response = await fetch('/api/account/AddMake', {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(payload)
        //     })
        //     if (response.ok) {
        //         setSubmitted(true);
        //         setError("Car make selection added successfully")
        //     } else {
        //         setError("Unable to add car make selection")
        //     }
    }

    useEffect(() => {
        fetchCarMakeInfo();
    }, [])

    return (
        <>
            <h4>Please select your vehicle make:</h4>
            { makes.length > 0 ? 
                <form>
                <select className="mb-3"onChange={handleChange} name='makeChoice'>
                    <option value="" disabled selected>Select a make</option>
                    {makes.map(make => (
                        <option key={make.data.id} value={make.data.id} >
                            {make.data.attributes.name}
                        </option>
                    ))}
                </select>
                {/* { !submitted && 
                    <Button style={{marginLeft: "1rem"}}color="primary" onClick={handleSubmit}>Select</Button>
                } */}
                </form> :
                <p>Loading makes...</p>
            }
            { submitted &&
                <ModelSelect makeChoice={makeChoice} makeName={makeName} userId={userId} submitted={submitted}/>
            }
        </>
    );
};

export default MakeSelect;