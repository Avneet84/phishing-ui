"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!url) return;
    setLoading(true);

    try {
      const res = await fetch("https://phishing-detector-h1yg.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [url] }),
      });

      const data = await res.json();
      setResult(data.data[0]);
    } catch (err) {
      setResult("❌ Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to right, #0f172a, #1e293b)",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        width: "600px",
        padding: "30px",
        borderRadius: "20px",
        background: "#020617",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)"
      }}>
        <h1 style={{ textAlign: "center", fontSize: "28px" }}>
          🔐 AI Phishing Detector
        </h1>

        <p style={{ textAlign: "center", color: "#94a3b8" }}>
          ML + Google + VirusTotal Detection
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Enter URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              background: "#1e293b",
              color: "white"
            }}
          />

          <button
            onClick={handleCheck}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            {loading ? "Checking..." : "Scan"}
          </button>
        </div>

        {result && (
          <div style={{
            marginTop: "20px",
            padding: "15px",
            background: "#1e293b",
            borderRadius: "10px",
            whiteSpace: "pre-wrap"
          }}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}