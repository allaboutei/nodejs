console.log("hello world");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
app.get("/contact", (req, res) => {
  res.sendFile("./views/contact.html", { root: __dirname });
});

app.use((req, res) => {
  res.status(404);
  res.sendFile("./views/404.html", { root: __dirname });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
