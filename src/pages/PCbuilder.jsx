import React, { useState } from "react";
import axios from "axios";

const PCbuilder = () => {
    const [cpu, setCpu] = useState('');
    const [gpu, setGpu] = useState('');
    const [ram, setRam] = useState('');
    const [storage, setStorage] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        try {
            const response = await axios.post(
              'http://localhost:5000/api/builds/submit',
              { cpu, gpu, ram, storage, name },
              { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } } // Include token in headers
            );
      
            setMessage('Build submitted successfully!');
          } catch (error) {
            setMessage(error.response?.data?.message || 'Error submitting build');
            console.error('Error submitting build:', error);
          }
    };

    return (
        <div>
            <h1>PC Builder</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cpu">CPU:</label>
                    <select 
                    id="cpu" 
                    value={cpu} 
                    onChange={(e) => setCpu(e.target.value)} 
                    required
                    >
                        <option value="">Select a CPU</option>
                        <option value="intel-i9">Intel i9</option>
                        <option value="amd-ryzen-9">AMD Ryzen 9</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="gpu">GPU:</label>
                    <select
                        id="gpu"
                        value={gpu}
                        onChange={(e) => setGpu(e.target.value)}
                        required
                    >
                        <option value="">Select a GPU</option>
                        <option value="nvidia-rtx-3080">NVIDIA RTX 3080</option>
                        <option value="amd-rx-6800">AMD RX 6800</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="ram">RAM:</label>
                    <select
                        id="ram"
                        value={ram}
                        onChange={(e) => setRam(e.target.value)}
                        required
                    >
                        <option value="">Select RAM</option>
                        <option value="16gb">16GB</option>
                        <option value="32gb">32GB</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="storage">Storage:</label>
                    <select
                        id="storage"
                        value={storage}
                        onChange={(e) => setStorage(e.target.value)}
                        required
                    >
                        <option value="">Select Storage</option>
                        <option value="1tb-ssd">1TB SSD</option>
                        <option value="2tb-hdd">2TB HDD</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="name">Build Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Build</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PCbuilder;
