import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'reactstrap';

const ModelSelect = ( {userId, makeChoice, submitted} ) => {
    const [models, setModels] = useState([]);
    const [modelChoice, setModelChoice] = useState([]);
    const [modelName, setModelName] = useState("");
    const [error, setError] = useState('');

    const fetchCarModelInfo = async () => {
        const response = await fetch(`/api/account/GetModels/${makeChoice}`, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setModels(data);
            setError('')
        } else {
            setError(response.errors)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'modelChoice') {
            setModelChoice(value);
            const selectedModel = models.find(model => model.data.id === value);
            setModelName(selectedModel.data.attributes.name);
        }
    }

    const handleSubmitCarModel = async (e) => {
        e.preventDefault();
            setError('');
            const payload = {
                Id: userId,
                modelChoice: modelChoice,
                modelName: modelName
            }
            const response = await fetch('/api/account/AddModel', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (response.ok) {
                setError("")
            } else {
                setError(response.errors)
            }
        }
    
    useEffect(() => {
        if (makeChoice) {
            fetchCarModelInfo();
        } 
    }, [makeChoice])

    useEffect(() => {
        console.log(models)
    }, [models])

    return (
        <>
            { submitted ?
                (models.length > 0 ? 
                    <form style={{ opacity: 1 }}>
                        <h4>Please select your vehicle model:</h4>
                            <select onChange={handleChange} name='modelChoice'>
                                <option value="" disabled selected>Select a model</option>
                                {models.map(model => (
                                    <option key={model.data.id} value={model.data.id} >
                                        {model.data.attributes.name} {model.data.attributes.year}
                                    </option>
                                ))}
                            </select>
                        {/* <Button style={{marginLeft: "1rem"}}color="primary" disabled={models.length === 0} onClick={handleSubmitCarModel}>Select</Button> */}
                    </form> :
                <p>Loading models...</p>) : <></>  
            }
            { error && <Alert color='danger'>{error}</Alert> }    
        </>
    );
};

export default ModelSelect;