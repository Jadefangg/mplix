const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
/**
 * The following file contains the schema for the movie and user collections in the database.
 * it also contains the models for the movie and user collections.
 * The movie schema contains the following fields:
 * Title, Description, Genre, Director, Actors, ImagePath and Featured.
 * The user schema contains the following fields:
 * Username, Password, Email, Birthday and FavouriteMovies.
 * The user schema also contains a static method to hash the password entered by the user and a method to validate the password entered by the user.
 * The user schema also contains a reference to the movie collection.
 * The movie schema contains a reference to the user collection.
 * The strings are imported from the mongoose module.
 */

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
    Name: String,
    Bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, rquired: true},
    Birthday: Date,
    FavouriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

userSchema.statics.hashPassword = function(password) {// hash the password entered by the user
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) { // validate the password entered by the user
    return bcrypt.compareSync(password, this.Password); 
};

let Movie=mongoose.model('Movie', movieSchema); //creating a model for the movie schema.
let User=mongoose.model('User', userSchema); //creating a model for the user schema.

module.exports.Movies=Movie;
module.exports.Users=User; 