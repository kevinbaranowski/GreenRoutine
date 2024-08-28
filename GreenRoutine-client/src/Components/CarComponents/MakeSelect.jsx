import React, { useState, useEffect } from 'react';
import { Form } from 'reactstrap';
import ModelSelect from './ModelSelect';

const MakeSelect = ({ userId, toggle, setCarMake, setCarModel }) => {
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
        }
    }

    useEffect(() => {
        fetchCarMakeInfo();
    }, [])

    const mappedMakesOptions = makes.map(make => (
        <option key={make.data.id} value={make.data.id} >
            {make.data.attributes.name}
        </option>
    ))

    return (
        <>
            <h4>Please select your vehicle make:</h4>
            { makes.length > 0 ? 
                <Form>
                    <select className="mb-3"onChange={handleChange} name='makeChoice'>
                        <option value="" disabled selected>Select a make</option>
                        {mappedMakesOptions}
                    </select>
                    {/* { !submitted && 
                        <Button style={{marginLeft: "1rem"}}color="primary" onClick={handleSubmit}>Select</Button>
                    } */}
                </Form> :
                <p>Loading makes...</p>
            }
            { submitted &&
                <ModelSelect makeChoice={makeChoice} makeName={makeName} userId={userId} submitted={submitted} toggle={toggle} setCarMake={setCarMake} setCarModel={setCarModel}/>
            }
        </>
    );
};

export default MakeSelect;