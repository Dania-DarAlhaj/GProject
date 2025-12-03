import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const [role, setRole] = useState("user"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();

    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("role", role);

    if (role === "user") {
      navigate("/user", {
        state: { email, password }
      });
    } else if (role === "owner") {
      navigate("/owner", {
        state: { email, password }
      });
    }
    
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "#FAF8F5",
      fontFamily: "Lato, sans-serif"
    }}>
      <form 
        onSubmit={handleContinue}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Register</h2>

        {/* email */}
        <input 
          type="email" 
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "0.8rem", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem" }}
        />

        {/* password */}
        <input 
          type="password" 
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "0.8rem", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem" }}
        />

        {/* role selection */}
        <div>
          <label>
            <input 
              type="radio" 
              name="role" 
              value="user"
              checked={role === "user"}
              onChange={(e) => setRole(e.target.value)}
            /> User
          </label>
          <br />
          <label>
            <input 
              type="radio" 
              name="role" 
              value="owner"
              checked={role === "owner"}
              onChange={(e) => setRole(e.target.value)}
            /> Owner for Business
          </label>
        </div>

        {/* continue button */}
        <button
          type="submit"
          style={{
            padding: "0.8rem",
            borderRadius: "5px",
            border: "none",
            background: "#C9A27C",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "0.2s"
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
