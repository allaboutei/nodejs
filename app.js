const { name } = require("ejs");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const blogRoutes = require("./routes/blogRoutes");
const app = express();
app.use(express.urlencoded({ extended: true }));
let morgan = require("morgan");
const { create } = require("lodash");
app.use(express.static("public"));


let mongoURL =
  "mongodb+srv://khantsithu:test1234@cluster0.autez6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/default");


app.use(morgan("dev"));

app.get("/", (req, res) => {
res.redirect('/blogs')
});



app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});

app.get("/contact-us", (req, res) => {
  res.redirect('/blogs')
});

app.use('/blogs',blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
  });
});


