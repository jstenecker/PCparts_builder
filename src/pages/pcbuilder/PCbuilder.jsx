import { useState } from "react";
import axios from "axios";
import "./PCbuilder.css"; // Import the CSS file

const PCbuilder = () => {
  const [cpuSelection, setCpuSelection] = useState({
    brand: null,
    series: null,
    model: null,
  });
  const [gpu, setGpu] = useState("");
  const [ramSelection, setRamSelection] = useState({
    type: null,
    size: null,
  });
  const [storageSelection, setStorageSelection] = useState({
    type: null,
    size: null,
  });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Static data for hierarchical dropdowns
  const componentData = {
    cpu: {
      Intel: {
        i3: ["Intel i3-10100", "Intel i3-12100"],
        i5: ["Intel i5-10400", "Intel i5-12400"],
        i7: ["Intel i7-10700", "Intel i7-12700"],
        i9: ["Intel i9-10900", "Intel i9-12900"],
      },
      AMD: {
        "Ryzen 3": ["AMD Ryzen 3 3100", "AMD Ryzen 3 3200G"],
        "Ryzen 5": ["AMD Ryzen 5 3600", "AMD Ryzen 5 5600X"],
        "Ryzen 7": ["AMD Ryzen 7 3700X", "AMD Ryzen 7 5800X"],
        "Ryzen 9": ["AMD Ryzen 9 3900X", "AMD Ryzen 9 5950X"],
      },
    },
    gpu: ["NVIDIA RTX 3060", "NVIDIA RTX 3080", "AMD RX 6700 XT", "AMD RX 6900 XT"],
    ram: {
      DDR4: ["8GB", "16GB", "32GB", "64GB"],
      DDR5: ["16GB", "32GB", "64GB", "128GB"],
    },
    storage: {
      SSD: ["500GB", "1TB", "2TB"],
      HDD: ["1TB", "2TB", "4TB"],
    },
  };

  const handleCpuSelection = (level, value) => {
    if (level === "brand") {
      setCpuSelection({ brand: value, series: null, model: null });
    } else if (level === "series") {
      setCpuSelection({ ...cpuSelection, series: value, model: null });
    } else if (level === "model") {
      setCpuSelection({ ...cpuSelection, model: value });
    }
  };

  const handleRamSelection = (level, value) => {
    if (level === "type") {
      setRamSelection({ type: value, size: null });
    } else if (level === "size") {
      setRamSelection({ ...ramSelection, size: value });
    }
  };

  const handleStorageSelection = (level, value) => {
    if (level === "type") {
      setStorageSelection({ type: value, size: null });
    } else if (level === "size") {
      setStorageSelection({ ...storageSelection, size: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      // Submit the selected build to the backend
      await axios.post(
        "http://localhost:5000/api/builds/submit",
        {
          cpu: `${cpuSelection.brand} ${cpuSelection.series} ${cpuSelection.model}`,
          gpu,
          ram: `${ramSelection.type} ${ramSelection.size}`,
          storage: `${storageSelection.type} ${storageSelection.size}`,
          name,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setMessage("Build submitted successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error submitting build");
      console.error("Error submitting build:", error);
    }
  };

  return (
    <div className="pcb-container">
      <h1 className="pcb-title">PC Builder</h1>
      <form onSubmit={handleSubmit} className="pcb-form">
        {/* CPU Hierarchical Dropdown */}
        <div className="pcb-field">
          <label>CPU:</label>
          {/* CPU Brand */}
          <div>
            <span>CPU Brand:</span>
            <select
              value={cpuSelection.brand || ""}
              onChange={(e) => handleCpuSelection("brand", e.target.value)}
              required
            >
              <option value="">Select a Brand</option>
              {Object.keys(componentData.cpu).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* CPU Series */}
          {cpuSelection.brand && (
            <div>
              <span>CPU Series:</span>
              <select
                value={cpuSelection.series || ""}
                onChange={(e) => handleCpuSelection("series", e.target.value)}
                required
              >
                <option value="">Select a Series</option>
                {Object.keys(componentData.cpu[cpuSelection.brand]).map((series) => (
                  <option key={series} value={series}>
                    {series}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* CPU Model */}
          {cpuSelection.series && (
            <div>
              <span>CPU Model:</span>
              <select
                value={cpuSelection.model || ""}
                onChange={(e) => handleCpuSelection("model", e.target.value)}
                required
              >
                <option value="">Select a Model</option>
                {componentData.cpu[cpuSelection.brand][cpuSelection.series].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* GPU Selection */}
        <div className="pcb-field">
          <label htmlFor="gpu">GPU:</label>
          <select
            id="gpu"
            value={gpu}
            onChange={(e) => setGpu(e.target.value)}
            required
          >
            <option value="">Select a GPU</option>
            {componentData.gpu.map((gpuOption) => (
              <option key={gpuOption} value={gpuOption}>
                {gpuOption}
              </option>
            ))}
          </select>
        </div>

        {/* RAM Hierarchical Dropdown */}
        <div className="pcb-field">
          <label>RAM:</label>
          <div>
            <span>RAM Type:</span>
            <select
              value={ramSelection.type || ""}
              onChange={(e) => handleRamSelection("type", e.target.value)}
              required
            >
              <option value="">Select a Type</option>
              {Object.keys(componentData.ram).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {ramSelection.type && (
            <div>
              <span>RAM Size:</span>
              <select
                value={ramSelection.size || ""}
                onChange={(e) => handleRamSelection("size", e.target.value)}
                required
              >
                <option value="">Select a Size</option>
                {componentData.ram[ramSelection.type].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Storage Hierarchical Dropdown */}
        <div className="pcb-field">
          <label>Storage:</label>
          <div>
            <span>Storage Type:</span>
            <select
              value={storageSelection.type || ""}
              onChange={(e) => handleStorageSelection("type", e.target.value)}
              required
            >
              <option value="">Select a Type</option>
              {Object.keys(componentData.storage).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {storageSelection.type && (
            <div>
              <span>Storage Size:</span>
              <select
                value={storageSelection.size || ""}
                onChange={(e) => handleStorageSelection("size", e.target.value)}
                required
              >
                <option value="">Select a Size</option>
                {componentData.storage[storageSelection.type].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Build Name */}
        <div className="pcb-field">
          <label htmlFor="name">Build Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="pcb-button">
          Submit Build
        </button>
      </form>
      {message && <p className="pcb-message">{message}</p>}
    </div>
  );
};

export default PCbuilder;
