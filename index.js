const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/user.routes.js"); // ✅ ផ្លូវត្រឹមត្រូវ
const roomRoutes = require("./routes/room.routes.js"); // ✅ ផ្លូវត្រឹមត្រូវ

// ✅ Middleware
app.use(cors()); 
app.use(express.json()); 


app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
