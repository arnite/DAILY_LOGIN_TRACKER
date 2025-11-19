import app from "./app"

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is running on PORT ${PORT}`);
});