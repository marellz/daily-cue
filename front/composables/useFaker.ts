import { faker, simpleFaker } from "@faker-js/faker";
import { type LoginForm, type User } from "@/types/users";
import { useToastsStore } from "~/store/toasts";
const useFaker = () => {
  const { $api } = useNuxtApp();

  const generateNewUser = () => {
    const password = 'secret21'
    // simpleFaker.string.alphanumeric({
    //   length: { min: 6, max: 12 },
    //   casing: "mixed",
    // });
    return {
      name: faker.person.fullName(),
      password,
      password_confirmation: password,
      email: faker.internet.email().toLowerCase(),
    };
  };

  const getRandomUser = async (options: object = {}) => {
    const {
      user,
      error,
      message,
    }: {
      error?: string;
      message?: string;
      user?: LoginForm;
    } = await $api.get("/test/test-user");

    if (!user || error) {
      let title = error ?? "Error getting test user",
        description = message;
      if (!error) {
        title = "Error getting test user";
      }

      useToastsStore().add({
        variant: "error",
        title,
        description,
      });

      return { email: "", password: "" };
    }

    return user;
  };

  return {
    generateNewUser,
    getRandomUser,
  };
};

export default useFaker;
