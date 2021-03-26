import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    max: [20, 'Username too long!'],
    min: [12, 'Username too short!']
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    max: [12, 'Phone number too long!'],
    min: [10, 'Phone number too short!']
  },
  updated: {
    type: Date,
    default: Date.now()
  }
});

class UserClass {
  static findUserByCredentials(username) {
    const attributes = 'name username email phoneNumber updated password';
    return this.findOne({ $or: [{ username }, { email: username }] }).select(attributes).lean();
  }

  static findUserById(id) {
    return this.findOne({ _id: id });
  }

  static findUserByUsername(username) {
    return this.findOne({ username });
  }
}
UserSchema.loadClass(UserClass);
const User = Mongoose.model('User', UserSchema);

export default User;
