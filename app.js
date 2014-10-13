var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var methodOverride = require("method-override")
var mongoose = require("mongoose");

var app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

mongoose.connect("mongodb://localhost/clickganic");

app.use(bodyParser());
app.use(methodOverride("_method"));

var catSchema = mongoose.Schema({
  name: String,
  age: Number
});

var Cat = mongoose.model("Cat", catSchema);

app.get("/cats", function(req, res) {
  // res.render('index', object);
  Cat.find(function(err, cats) {
    res.render("cats", {cats: cats});
  });
});

app.post("/create_cat", function(req, res) {
  var kitty = new Cat({name: req.body.name});
  kitty.save(function(err) {
    console.log("meow");
    res.redirect("cats");
  });
});

app.get("/cats/new", function(req, res) {
  res.render("create_cat");
});

app.get("/cats/:id", function(req, res) {
  Cat.findById(req.params.id, function(err, cat) {
    res.render("cat", {cat: cat});
  });
  // console.log(req.params.id);
});

app.delete("/delete_cat", function(req, res) {
  Cat.remove({_id: req.body.id}, function(err) {
    res.redirect("cats");
  });
});


app.listen(2000, function() {
  console.log("Go!");
});
