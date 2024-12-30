// src/pages/PCbuilder.jsx
const PCbuilder = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Collect and process selected PC parts
        console.log("PC build submitted!");
    };

    return (
        <div>
            <h1>PC Builder</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cpu">CPU:</label>
                    <select id="cpu" required>
                        <option value="">Select a CPU</option>
                        <option value="intel-i9">Intel i9</option>
                        <option value="amd-ryzen-9">AMD Ryzen 9</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="gpu">GPU:</label>
                    <select id="gpu" required>
                        <option value="">Select a GPU</option>
                        <option value="nvidia-rtx-3080">NVIDIA RTX 3080</option>
                        <option value="amd-rx-6800">AMD RX 6800</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="ram">RAM:</label>
                    <select id="ram" required>
                        <option value="">Select RAM</option>
                        <option value="16gb">16GB</option>
                        <option value="32gb">32GB</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="storage">Storage:</label>
                    <select id="storage" required>
                        <option value="">Select Storage</option>
                        <option value="1tb-ssd">1TB SSD</option>
                        <option value="2tb-hdd">2TB HDD</option>
                    </select>
                </div>
                <button type="submit">Submit Build</button>
            </form>
        </div>
    );
};

export default PCbuilder;
