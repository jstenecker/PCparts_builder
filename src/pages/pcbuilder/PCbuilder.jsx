import { useState, useEffect } from "react";
import axios from "axios";
import "./PCbuilder.css";

const PCbuilder = () => {
  const [components, setComponents] = useState({
    cpu: null,
    gpu: null,
    ram: null,
    storage: null,
  });
  const [category, setCategory] = useState("cpu");
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Fetch component data from scraper
  const fetchOptions = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/scrape/${category}`);
      setOptions(response.data || []);
    } catch (error) {
      console.error(`Error fetching ${category} data:`, error);
      setOptions([]);
    }
  };
  

  useEffect(() => {
    fetchOptions(category);
  }, [category]);

  const handleSelect = (componentType, option) => {
    setComponents((prev) => ({ ...prev, [componentType]: option }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
  
    try {
      await axios.post(
        "http://localhost:5000/api/builds/submit",
        {
          cpu: components.cpu ? components.cpu.name : "Not selected",
          gpu: components.gpu ? components.gpu.name : "Not selected",
          ram: components.ram ? components.ram.name : "Not selected",
          storage: components.storage ? components.storage.name : "Not selected",
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
  

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pcb-container">
      <h1 className="pcb-title">PC Builder</h1>

      {/* Sidebar for categories */}
      <div className="pcb-layout">
        <aside className="pcb-sidebar">
          <ul>
            {["cpu", "gpu", "ram", "storage"].map((item) => (
              <li
                key={item}
                className={`sidebar-item ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item.toUpperCase()}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="pcb-content">
          <h2>Select Your {category.toUpperCase()}</h2>
          <input
            type="text"
            placeholder={`Search for ${category}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pcb-search"
          />
          <div className="pcb-options">
            {filteredOptions.map((option) => (
              <div
                key={option.name}
                className="pcb-option"
                onClick={() => handleSelect(category, option)}
              >
                <img src={option.image} alt={option.name} className="pcb-option-image" />
                <div className="pcb-option-info">
                  <h3>{option.name}</h3>
                  <p>{option.price || "Price unavailable"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <aside className="pcb-summary">
          <h2>Build Summary</h2>
          <ul>
            {Object.entries(components).map(([key, value]) => (
              <li key={key}>
                <strong>{key.toUpperCase()}:</strong>{" "}
                {value ? value.name : "Not selected"}
              </li>
            ))}
          </ul>
          <div className="pcb-build-name">
            <label htmlFor="name">Build Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button className="pcb-button" onClick={handleSubmit}>
            Submit Build
          </button>
          {message && <p className="pcb-message">{message}</p>}
        </aside>
      </div>
    </div>
  );
};

export default PCbuilder;
