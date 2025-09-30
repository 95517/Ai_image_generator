import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

function Home({ darkMode, setDarkMode }) {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "A futuristic cyberpunk city at night",
    "An anime girl with glowing blue hair",
    "A serene beach sunset with palm trees",
    "A dragon flying over snowy mountains",
    "A realistic portrait of an astronaut",
  ];

  const generateImage = async (customPrompt) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt) return;
    setLoading(true);
    const url = `https://botfather.cloud/Apis/ImgGen/Clients/v3.php?prompt=${encodeURIComponent(
      finalPrompt
    )}`;
    setImage(url);
    setLoading(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#f9f9f9",
        color: darkMode ? "#f9f9f9" : "#121212",
        transition: "all 0.3s ease",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header style={{ marginBottom: "30px" }}>
        <h1>AI Image Generator</h1>
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: darkMode ? "#f9f9f9" : "#121212",
              color: darkMode ? "#121212" : "#f9f9f9",
              marginRight: "10px",
            }}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <Link
            to="/admin"
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              background: "#007bff",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            🔒 Admin Login
          </Link>
        </div>
      </header>

      <input
        type="text"
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={() => generateImage()}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          border: "none",
          background: darkMode ? "#444" : "#007bff",
          color: "#fff",
        }}
      >
        Generate
      </button>

      {/* Suggested Prompts */}
      <div style={{ marginTop: "20px" }}>
        <h3>✨ Try these prompts:</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => generateImage(s)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: darkMode ? "#333" : "#eee",
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading && <p style={{ marginTop: "20px" }}>Generating image...</p>}

      {image && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={image}
            alt="Generated"
            style={{
              maxWidth: "80%",
              borderRadius: "12px",
              boxShadow: darkMode
                ? "0 4px 12px rgba(255,255,255,0.2)"
                : "0 4px 12px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      )}
    </div>
  );
}

function Admin({ darkMode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const ADMIN_SECRET = "12345"; // change this!

  if (!isAdmin) {
    return (
      <div
        style={{
          textAlign: "center",
          minHeight: "100vh",
          background: darkMode ? "#121212" : "#f9f9f9",
          color: darkMode ? "#fff" : "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>🔒 Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin code"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={() => {
            if (adminCode === ADMIN_SECRET) {
              setIsAdmin(true);
            } else {
              alert("❌ Wrong code!");
            }
          }}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <Link to="/" style={{ marginTop: "15px", color: "#007bff" }}>
          ⬅ Back Home
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        background: darkMode ? "#121212" : "#f9f9f9",
        color: darkMode ? "#fff" : "#000",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>👑 Admin Dashboard</h1>
      <p>Welcome, Admin! You can add your controls here later.</p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "8px 16px",
          borderRadius: "6px",
          background: "#007bff",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        ⬅ Back Home
      </Link>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/admin" element={<Admin darkMode={darkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;
