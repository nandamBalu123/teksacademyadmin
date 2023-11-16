import React, { useState } from "react";
import axios from "axios";

const ZipCodeLookup = () => {
  const [zipCode, setZipCode] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleLookup = async () => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${zipCode}`
      );

      // Extract relevant information from the response
      const firstResult = response.data[0].PostOffice;
      console.log("firstResult", firstResult);
      // setLocationData({
      //   country: firstResult.components.country,
      //   state: firstResult.components.state,
      //   district: firstResult.components.state_district,
      // });

      setError(null);
    } catch (error) {
      console.error("Error fetching location data:", error);
      setError("Error fetching location data. Please try again.");
    }
  };

  return (
    <div>
      <label>
        Enter ZIP Code:
        <input type="text" value={zipCode} onChange={handleZipCodeChange} />
      </label>
      <button onClick={handleLookup}>Lookup</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {locationData && (
        <div>
          <h2>Location Information</h2>
          <p>Country: {locationData.country}</p>
          <p>State: {locationData.state}</p>
          <p>District: {locationData.district}</p>
        </div>
      )}
    </div>
  );
};

export default ZipCodeLookup;
