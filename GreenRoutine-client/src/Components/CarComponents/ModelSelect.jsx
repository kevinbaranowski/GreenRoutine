import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

const ModelSelect = ( user, ready) => {
    const [models, setModels] = useState([]);
    const [modelChoice, setModelChoice] = useState([]);
    const [modelName, setModelName] = useState("");
    const [error, setError] = useState('');

    const fetchCarModelInfo = async () => {
        const response = await fetch(`/api/account/GetModels/${user.makeChoice}`, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setModels(data);
            setError('Car make info set.')
        } else {
            setError('Could not set car make info')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'modelChoice') {
            setModelChoice(value);
            const selectedModel = models.find(model => model.data.attributes.id === value);
            setModelName(selectedModel);
        }
    }

    const handleSubmitCarModel = async (e) => {
        e.preventDefault();
            setError('');
            const payload = {
                Id: user.userId,
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
                const data = await response.json();
                setError("Car model added successfully")
            } else {
                setError("Unable to add car model")
            }
        }
    
    useEffect(() => {
        fetchCarModelInfo()
    }, [user.makeChoice])

    useEffect(() => {
        console.log(models.length)
    }, [models])

    return (
        <>
            { models.length > 0 && 
                <form style={ready ? { opacity: 1 } : { opacity: 1 }}>
                    <h4>Please select your vehicle model:</h4>
                        <select onChange={handleChange} name='modelChoice'>
                            {models.map(model => (
                                <option key={model.data.id} value={model.data.id} >
                                    {model.data.attributes.name} {model.data.attributes.year}
                                </option>
                            ))}
                        </select>
                    <Button color="primary" disabled={models.length === 0} onClick={handleSubmitCarModel}>Click</Button>
                </form>
            }
        </>
    );
};

export default ModelSelect;