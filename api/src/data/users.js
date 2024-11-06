import bcrypt from "bcryptjs"

const password1 = await bcrypt.hash("secret22", 10);
const password2 = await bcrypt.hash("secret21", 10)

const users = [
  {
    name: "Dave Tester",
    email: "dave@test.com",
    password: password1,
  },
  {
    name: "John Doe",
    email: "john.doe@test.com",
    password: password2,
  },
];

export default users
