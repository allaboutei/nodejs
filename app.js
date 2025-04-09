const { name } = require("ejs");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
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

app.post("/blogs", async(req, res) => {
  
  let {title, intro, body} = req.body;
  let blog = new Blog({
    title: title,
    intro: intro,
    body: body,
  });
  await blog.save();
  res.redirect('/');
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

app.get("/blogs/create", (req, res) => {
  res.render('blogs/create', {
    title: "Create Blog",
  });
});



app.get('/blogs/:id',async(req,res,next)=>{
  try{
    let id=req.params.id;
    let blog = await Blog.findById(id);
   res.render('blogs/show',{
    blog,
    title: "Single Blog"
   })
  
  }
catch(e){
    console.log(e);
    next();
  }
}
);

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
  });
});


