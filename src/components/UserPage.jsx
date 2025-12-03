import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient"; // تأكدي المسار صح

export default function UserPage() {
  const location = useLocation();
  const { email, password } = location.state || {};

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const cities = ["Ramallah", "Hebron", "Nablus", "Tulkarm", "Jericho"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,        
      password,     
      role: "user", 
      name,         
      phone,        
      city,        
      verified: false 
      
    };

    const { data, error } = await supabase
      .from("users")
      .insert([userData]);

    if (error) {
      console.error("Error:", error);
      alert("Error saving user: " + error.message);
    } else {
      console.log("User saved:", data);
      alert("User saved successfully!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>User Info</h1>

      <p><strong>Email received:</strong> {email}</p>
      <p><strong>Password received:</strong> {password}</p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
        }}
      >
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <select value={city} onChange={(e) => setCity(e.target.value)} required>
          <option value="">Select city</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
