import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function DecorationPage() {
  const [selectedServices, setSelectedServices] = useState([]);

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

  // جلب البيانات من sessionStorage
  const email = sessionStorage.getItem("email");
  const password = sessionStorage.getItem("password");
  const ownerType = sessionStorage.getItem("ownerType");
  const businessName = sessionStorage.getItem("businessName");
  const phone = sessionStorage.getItem("phone");
  const city = sessionStorage.getItem("city");
useEffect(() => {
  console.table({
    email: sessionStorage.getItem("email"),
    ownerType: sessionStorage.getItem("ownerType"),
    businessName: sessionStorage.getItem("businessName"),
    phone: sessionStorage.getItem("phone"),
    city: sessionStorage.getItem("city"),
    userId: sessionStorage.getItem("user_id"),
  });
}, []);


  const handleCheckboxChange = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userObj = {
      email,
      password,
      role: "decoration", 
      name: businessName,
      phone,
      city,
      verified: false,
    };

    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([userObj])
      .select();
if (userError) {
  console.error("Detailed error:", userError);
  alert("Error saving user. Please check the console for details.");
  return;
}

    const userId = userData[0].id;
    sessionStorage.setItem("user_id", userId); 

    const ownerData = {
      user_id: userId,
      owner_type: ownerType,
      visible: false,
    };

    const { error: ownerError } = await supabase
      .from("owners")
      .insert([ownerData]);

    if (ownerError) {
      console.error("Error saving owner:", ownerError);
      alert("Error saving owner. Please try again.");
      return;
    }

    const insertData = services.map((service) => ({
      user_id: userId,
      service_name: service,
      selected: selectedServices.includes(service),
    }));

    const { error: serviceError } = await supabase
      .from("DecorationServices")
      .insert(insertData);

    if (serviceError) {
      console.error("Error saving services:", serviceError);
      alert("Error saving services. Please try again.");
    } else {
      alert("Services saved successfully!");
      setSelectedServices([]);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Lato",
      }}
    >
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

        <button
          type="submit"
          style={{
            marginTop: "1rem",
            width: "100%",
            padding: "0.8rem",
            background: "#C9A27C",
            border: "none",
            borderRadius: "5px",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Save Services
        </button>
      </form>
    </div>
  );
}
