import mongoose from "mongoose";
import bcrypt from "bcrypt";
import faker from "faker";

import { User } from "../../src/models";

const password = "password1";
let hashedPassword;
bcrypt.hash(password, 10, (err, passwordHash) => {
  if (err) return next(err);
  hashedPassword = passwordHash;
});

const userOne = {
  _id: mongoose.Types.ObjectId(),
  username: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  username: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
};

const insertUsers = async (users) => {
  await User.insertMany(
    users.map((user) => ({ ...user, password: hashedPassword }))
  );
};

module.exports = {
  userOne,
  userTwo,
  insertUsers,
};
