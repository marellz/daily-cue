import moment from "moment";
import _ from "lodash";
import UserModel from "#models/User.js";
import { faker } from "@faker-js/faker";
import Tag from "#models/Tag.js";

export const taskBuilder = (user, userTags) => {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  const title = capitalize(faker.word.words({ count: { min: 4, max: 9 } }));
  const description = faker.lorem.sentences({ min: 1, max: 3 });
  const status = ["pending", "in_progress", "completed"][
    Math.floor(Math.random() * 3)
  ];

  const completed = status === "completed";

  const due_date = faker.date.between({
    from: moment().subtract(1, "month"),
    to: moment().add(1, "month"),
  });

  const tags = _.shuffle(userTags).slice(0, Math.floor(Math.random() * 3))

  return {
    title,
    description,
    user,
    due_date,
    status,
    completed,
    tags
  };
};

export const tasks = async () => {
  const users = await UserModel.find();
  const tasks = [];
  const tags = await Tag.find();
  users.forEach(async (user) => {
    let user_tags = tags.filter(t=>t.user.equals(user._id))
    _.range(150).forEach((i) => {
      let task = taskBuilder(user, user_tags);
      tasks.push(task);
    });
  });

  return tasks;
};
