let mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const passportLocalMongoose = require('passport-local-mongoose');
const database = 'cooking';

class Database {
  constructor() {
    this._connect()
  }
  _connect() { 
    console.log("Starting in " + JSON.stringify(process.env.NODE_ENV));
    console.log(`Using mongodb_uri: ${process.env.MONGODB_URI}`);
    if (process.env.NODE_ENV === 'production') {
      console.log(`MONGODB_URI : ${process.env.MONGODB_URI}`);
      mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true })
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      });
    } else {
      console.log("Using local method " + process.env.NODE_ENV);
      mongoose.connect(`mongodb://${server}/${database}`,  { useNewUrlParser: true })
      .then(() => {
          console.log('Database connection successful')
      })
      .catch(err => {
          console.error('Database connection error')
      }); 
    }
  }
}

let recipeSchema = new mongoose.Schema({
  title: String,
  type: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
  cook_time: String,
  cook_difficulty: String,
	body: String,
  cover_photo: String,
  recipe: {
    type: [String]
  },
  ingredients: [{
    ingredient: String,
    category: String,
    link: String,
  }],
  tags: [String],
  userId: String,
  writer: String,
  author: String,
  calories: Number,
  carbs: Number,
  protein: Number,
  fat: Number
});

let userSchema = new mongoose.Schema({
	username: String,
	name: String,
  description: String,
  write: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = new Database()
module.exports.Recipe = mongoose.model('Recipe', recipeSchema);
module.exports.User = mongoose.model('User', userSchema);
