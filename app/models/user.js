var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});
var User = mongoose.model('User', userSchema);


  User.comparePassword: function(attemptedPassword, savedPassword callback) {
    bcrypt.compare(attemptedPassword, savedPassword, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  },
  userSchema.pre('save', function(next) {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.password, null, null)
      .bind(this)
      .then(function(hash) {
        this.password = hash;
        next();
      });
  });


module.exports = User;
