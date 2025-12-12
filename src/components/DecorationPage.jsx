// src/pages/DecorationPage.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function DecorationPage() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const services = [
    "Groom's Car Decoration",
    "Wedding Favors",
    "Wedding Entrance Decor",
    "Table Centerpieces",
    "Flower Arrangements",
    "Stage Decoration",
    "Lighting Setup",
    "Custom Signage",
    "Photo Booth Setup",
  ];

  const email = sessionStorage.getItem("pendingEmail");
  const password = sessionStorage.getItem("pendingPassword");
  const ownerType = sessionStorage.getItem("pendingRole");
  const businessName = sessionStorage.getItem("businessName");
  const phone = sessionStorage.getItem("phone");
  const city = sessionStorage.getItem("city");

  useEffect(() => {
    if (!email || !businessName || !ownerType || !phone || !city) {
      setError("Some required information is missing. Please complete your registration first.");
    }
    setLoading(false);
  }, [email, businessName, ownerType, phone, city]);

  const handleCheckboxChange = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !businessName) {
      alert("Required data missing. Cannot save services.");
      return;
    }

    try {
     
      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert([{ email, password, role: "decoration", name: businessName, phone, city, verified: false }])
        .select();

      if (userError) throw userError;

      const userId = userData[0].id;
      sessionStorage.setItem("user_id", userId);

      const { error: ownerError } = await supabase.from("owners").insert([{ user_id: userId, owner_type: ownerType, visible: false }]);
      if (ownerError) throw ownerError;

     
      const insertData = services.map((service) => ({
        user_id: userId,
        service_name: service,
        selected: selectedServices.includes(service),
      }));
      const { error: serviceError } = await supabase.from("DecorationServices").insert(insertData);
      if (serviceError) throw serviceError;

      alert("Services saved successfully!");
      setSelectedServices([]);
    } catch (err) {
      console.error("Error:", err);
      alert("There was an error saving your data. Check the console for details.");
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", fontFamily: "Lato" }}>
      <h2 style={{ textAlign: "center" }}>Decoration Services</h2>
      <form onSubmit={handleSubmit}>
        {services.map((service) => (
          <div key={service} style={{ marginBottom: "0.5rem" }}>
            <label>
              <input
                type="checkbox"
                value={service}
                checked={selectedServices.includes(service)}
                onChange={() => handleCheckboxChange(service)}
                style={{ marginRight: "0.5rem" }}
              />
              {service}
            </label>
          </div>
        ))}

        <button type="submit" style={{ marginTop: "1rem", width: "100%", padding: "0.8rem", background: "#C9A27C", border: "none", borderRadius: "5px", color: "white", fontSize: "1rem", cursor: "pointer" }}>
          Save Services
        </button>
      </form>
    </div>
  );
}
