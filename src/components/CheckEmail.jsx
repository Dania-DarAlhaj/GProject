// src/pages/CheckEmail.jsx
import React from "react";

export default function CheckEmail() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Lato, sans-serif",
      background: "#FAF8F5",
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        width: "350px"
      }}>
        <h2>Email Verified!</h2>
        <p>Your email has been successfully verified. You can now log in.</p>
      </div>
    </div>
  );
}
