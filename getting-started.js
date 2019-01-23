var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/sample");

var db = mongoose.connection;

db.on("error", function() {
  console.log("Error in MongoDB connection");
});

db.once("connected", function() {
  console.log("Connected to MongoDB database");
});
const Schema = mongoose.Schema;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model("Story", storySchema);
const Person = mongoose.model("Person", personSchema);

const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);

  const story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
  });
});

Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
      console.log(story);
    // prints "The author is Ian Fleming"
  });

