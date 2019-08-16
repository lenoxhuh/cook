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

let articleSchema = new mongoose.Schema({
	country: String,
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
	body: String,
  photo: String,
  photos: String,
	video: String,
	id: {
    type: Number
  }, 
  userId: String,
  writer: String,
  comments: [{
    comment: String,
    created: {
      type: Date,
      default: Date.now
    },
    name: String,
    userId: Number
  }],
  upvotes: {
    type: [Number], 
		unique: false,
		sparse: true
  } 
});

let userSchema = new mongoose.Schema({
	username: String,
	name: String,
  country: String,
  description: String,
	age: {
		type: String,
		default: "20"
	},
	school: {
		type: String,
		default: "Hotchkiss School"
	},
  write: {
    type: String,
    default: "false"
  },
	id: Number
});

userSchema.plugin(passportLocalMongoose);

module.exports = new Database()
module.exports.Recipes = mongoose.model('Recipes', articleSchema);
module.exports.User = mongoose.model('User', userSchema);
