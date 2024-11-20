const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the root directories
app.use(express.static(path.join(__dirname, "html")));  
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/images", express.static(path.join(__dirname, "images"))); // Add this line

// Default route to serve `index.html`
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "index.html"));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Frontend is running on http://localhost:${PORT}`);
});
