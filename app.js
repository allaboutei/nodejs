const { name } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const app = express();
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

// Middleware to serve static files
// let logger = (env) => {
//   return (req, res, next) => {
//     if (env == "dev") {
//       console.log(`${req.method} ${req.originalUrl}`);
//     }

//     next();
//   };
// };

// app.use(logger("dev"));

app.use(morgan("dev"));

app.get("/", async(req, res) => {
  
  let blogs= await Blog.find().sort({createdAt: -1});

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

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});

app.get("/contact-us", (req, res) => {
  res.redirect('/blogs')
});

app.get('/add-blog', async (req, res) => {
  let blog = new Blog({
    title: "Blog 3",
    intro: "This is the third blog",
    body: "This is the third blog body",
  });
  await blog.save();
  res.send("Blog added successfully");
});

app.get('/single-blog',async(req,res)=>{
  
 let blog =await Blog.findById('67f2996fcdb92eff3fde0a9c');
 res.json(blog);
}
);

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
  });
});


