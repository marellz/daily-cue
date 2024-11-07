import moment from "moment";
import _ from "lodash";
import UserModel from "#models/User.js";
import { faker } from "@faker-js/faker";

export const taskBuilder = (user) => {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  const title = capitalize(faker.word.words({ count: { min: 4, max: 9 } }));
  const description = faker.lorem.sentences({ min: 1, max: 3 });
  const status = ["pending", "in_progress", "completed"][
    Math.floor(Math.random() * 3)
  ];

  const completed = status === "completed";

  const due_date = faker.date.between({
    from: moment().subtract(1, "week"),
    to: moment().add(1, "week"),
  });

  return {
    title,
    description,
    user,
    due_date,
    status,
    completed,
  };
};

export const tasks = async () => {
  const users = await UserModel.find();
  const tasks = [];
  users.forEach((user) => {
    _.range(50).forEach(i=> {
      let task = taskBuilder(user)
      tasks.push(task)
    })
  });

  return tasks;
};

