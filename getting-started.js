var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/sample");

var db = mongoose.connection;

db.on("error", function() {
  console.log("Error in MongoDB connection");
});

db.once("connected", function() {
  console.log("Connected to MongoDB database");
});

var blogSchema = new mongoose.Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: {type:Date, default : Date.now}}],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

blogSchema.methods.show = function() {
  console.log(this.comments);
}

var Blog = mongoose.model("Blog",blogSchema);



var first = new Blog({
  title : "EngiGyan",
  author : "Yash",
  comments : [{body:"wow"}],
  meta : {
    votes : 35,
    favs : 2
  }
});

first.save();

