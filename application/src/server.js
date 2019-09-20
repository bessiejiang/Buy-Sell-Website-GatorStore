const express = require("express");
const app = express();
const PORT = 1648;

app.get("/", (req, res) => {
  res.send("Hello world");
});

const server = app.listen(PORT, () => {
  const { port, address } = server.address();
  console.log(`=> Listening on http://${address}:${port}`);
});
