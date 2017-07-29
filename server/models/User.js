const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt-nodejs');
const crypto    = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schama({
  email: {
    type: String,
    lowercase: true,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: 'string' }}
    }
  },
  password: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  facebook: {
    id: { type: String },
    token: { type: String }
  },
  google: {
    id: { type: String },
    token: { type: String }
  },
  github: {
    id: { type: String },
    token: { type: String }
  }
},
  { timestamps: true }
);

UserSchema.methods.hashPassword = (password) => {
  const SALT_FACTOR = 5;

  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);
};

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { //FIXME: possible error (this) might be set wrong becouse of arrow function/ test it
    if(err) return cb(err);

    cb(null, isMatch);
  });
}

exports.User = mongoose.model('User', UserSchema);