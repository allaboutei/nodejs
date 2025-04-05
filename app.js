
const { name } = require("ejs");
const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use((req,res,next)=>{
  console.log("this is a middleware function");
  next();
})



app.get("/", (req, res) => {
  let blogs = [
    { title: "Blog 1 fuck", content: "This is the first blog" },
    { title: "Blog 2", content: "This is the second blog" },
  ];

  

  res.render("home", {
    blogs,
    title: "Home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.use((req,res,next)=>{
  console.log("this is a second middleware function");
  next();
})

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
  });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
