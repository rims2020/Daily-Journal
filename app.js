//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _=require("lodash")
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const mongoose=require("mongoose")
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); //remember
app.use(express.static("public")); //remember

mongoose.connect("mongodb+srv://admin:testone@cluster0-hhnl7.mongodb.net/contentDB",{useNewUrlParser:true})

var posts=[];


const postSchema={
heading:"String",
writeup:"String"
}

const Post=mongoose.model("Post", postSchema)

app.get("/", function(req,res)
{
  Post.find({},function(err,foundlist){
    if(!err){
      if(!foundlist){
console.log("Nothing found")
      }
      else{
        res.render("home", {text1: homeStartingContent, text10:foundlist});
      }

    }

});
});
app.get("/about", function(req,res)
{
  res.render("about",{text2: aboutContent});
});
app.get("/contact", function(req,res)
{
res.render("contact", {text3: contactContent});
});
app.get("/compose", function(req,res)
{
  res.render("compose");
}
);
app.post("/", function(req,res)
{
  const content={
    posttitle: req.body.text4,
    post: req.body.text7

  }
posts.push(content)
const item=new Post({
  heading: content.posttitle,
  writeup: content.post
})
item.save();
res.redirect("/")
res.redirect("/")

})
app.get("/posts/:title",function(req,res)
{let m=req.params.title
  console.log(m)
Post.find({heading:m},function(err,foundlist)
{
if(!err)
{
  if (!foundlist)
  {
console.log("Nothing Found")
  }

else
{
  console.log(foundlist)
  res.render("post",{display_alone:foundlist})
}
}
})
})
let port = process.env.port
if(port== null || port== "")
{
  port=3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
