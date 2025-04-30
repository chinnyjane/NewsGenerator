import React, { useState } from "react";
import "./App.css";
import generateNews from "./generateNews";

function App() {
  //form data
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    venue: "",
    resourcePerson: "",
    note: "",
    reporterName: "",
    cameramanName: "",
  });

  const [previewMode, setPreviewMode] = useState(false);

  const [newsOutput, setNewsOutput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateNews(formData, setNewsOutput);
  };

  return (
    <div className="App">
      {previewMode ? (
        <div className="preview-page">
          {/* INC Logo (optional) */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/57/Iglesia_Ni_Cristo_seal.svg"
            alt="INC Logo"
            style={{ width: "120px", marginBottom: "20px" }}
          />
          <h1>Church News</h1>
          <h2>{formData.eventName}</h2>
          <p>
            <strong>Date:</strong> {formData.date}
          </p>
          <p>
            <strong>Venue:</strong> {formData.venue}
          </p>
          <p>
            <strong>Resource Person:</strong> {formData.resourcePerson}
          </p>
          {formData.note && (
            <p>
              <strong>Details:</strong> {formData.note}
            </p>
          )}
          <p>
            This event was organized under the guidance of the Iglesia Ni Cristo
            leadership to further strengthen the faith of the brethren.
          </p>

          <div style={{ marginTop: "40px" }}>
            <p>
              <strong>Reported by:</strong> {formData.reporterName}
            </p>
            <p>
              <strong>Camera work by:</strong> {formData.cameramanName}
            </p>
          </div>

          <button
            onClick={() => setPreviewMode(false)}
            style={{ marginTop: "2rem" }}
          >
            Back to Form
          </button>
        </div>
      ) : (
        <>
          <h1>Iglesia Ni Cristo News Generator</h1>
          <form onSubmit={handleSubmit} className="news-form">
            <div>
              <label>Event Name:</label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Venue:</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Resource Person:</label>
              <input
                type="text"
                name="resourcePerson"
                value={formData.resourcePerson}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Additional Notes:</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>
            <div>
              <label>News Reporter Name:</label>
              <input
                type="text"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Cameraman Name:</label>
              <input
                type="text"
                name="cameramanName"
                value={formData.cameramanName}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Generate News</button>
          </form>

          {newsOutput && (
            <div className="news-output">
              <h2>Generated Church News:</h2>
              <p>{newsOutput}</p>
              <button
                onClick={() => setPreviewMode(true)}
                style={{ marginTop: "1rem", marginLeft: "1rem" }}
              >
                Preview News
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
