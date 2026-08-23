const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ---- Mock "database" ----
// No real DB is used per the assignment. In a real app, passwords would be
// hashed (bcrypt) and stored in a proper database - never in plain text.
const MOCK_USERS = [
  { email: "user@netflix.com", password: "password123", name: "Demo User" },
  { email: "test@example.com", password: "test1234", name: "Test User" },
];

// Very small helper to fake an auth token (NOT secure, demo only)
function generateFakeToken(email) {
  return Buffer.from(`${email}:${Date.now()}`).toString("base64");
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};

  // Basic server-side validation (never trust the client)
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );

  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Incorrect password or email. Please try again.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    token: generateFakeToken(user.email),
    user: { email: user.email, name: user.name },
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log("Mock credentials:");
  console.log("  user@netflix.com / password123");
  console.log("  test@example.com / test1234");
});
