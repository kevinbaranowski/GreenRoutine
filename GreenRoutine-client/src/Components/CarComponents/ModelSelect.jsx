import React, { useState, useEffect } from 'react';
import { Alert, Button, Form } from 'reactstrap';

const ModelSelect = ( {userId, makeChoice, makeName, submitted, toggle, setCarMake, setCarModel} ) => {
    const [models, setModels] = useState([]);
    const [modelChoice, setModelChoice] = useState("");
    const [modelName, setModelName] = useState("");
    const [error, setError] = useState('');

    const fetchCarModelInfo = async () => {
        setModels([]);
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

    const addMake = async (e) => {
        e.preventDefault();
        setError('');
        const payload = {
            Id: userId,
            makeChoice: makeChoice,
            makeName: makeName
        }
        const response = await fetch('/api/account/AddMake', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            setCarMake(makeName)
            setError("")
        } else {
            setError("Unable to add car make selection")
        }
    }

    const addModel = async (e) => {
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
            setCarModel(modelName)
            setError("")
        } else {
            setError(response.errors)
        }
    }

    const handleSubmit = async (e) => {
        await addMake(e);
        await addModel(e);
    }
    
    useEffect(() => {
        if (makeChoice) {
            fetchCarModelInfo();
        } 
    }, [makeChoice])

    const mappedModelOptions = models.map(model => (
        <option key={model.data.id} value={model.data.id} >
            {model.data.attributes.name} {model.data.attributes.year}
        </option>
    ))

    return (
        <>
            { submitted ?
                (models.length > 0 ? 
                    <Form style={{ opacity: 1 }}>
                        <h4>Please select your vehicle model:</h4>
                            <select onChange={handleChange} name='modelChoice'>
                                <option value="" disabled selected>Select a model</option>
                                {mappedModelOptions}
                            </select>
                        <div style={{
                            textAlign: "right",
                            borderTop: 'solid 1px lightgrey',
                            marginTop: '1rem',
                            paddingTop: '1rem'
                        }}>
                            <Button style={{marginRight: ".5rem"}}color="primary" disabled={models.length === 0} onClick={() => {
                                handleSubmit(event);
                                toggle();    
                            }}>Submit</Button>
                            <Button onClick={() => {
                                toggle();
                                setModelChoice("");
                            }}>Cancel</Button>
                        </div>
                        
                    </Form> :
                <p>Loading models...</p>) : <></>  
            }
            { error && <Alert color='danger'>{error}</Alert> }    
        </>
    );
};

export default ModelSelect;