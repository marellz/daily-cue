import { faker, simpleFaker } from "@faker-js/faker";
import { type User } from "@/types/users";
const useFaker = () => {
  const { $api } = useNuxtApp();

  const generateNewUser = () => {
    const password = simpleFaker.string.alphanumeric({
      length: { min: 6, max: 12 },
      casing: "mixed",
    });
    return {
      name: faker.person.fullName(),
      password,
      password_confirmation: password,
      email: faker.internet.email().toLowerCase(),
    };
  };

  const getRandomUser = async (options: object = {}) => {
    const testUser = generateNewUser();

    const { data }: { data: User } = await $api.post(
      "/auth/register",
      testUser
    );

    if(data) {
      const { email, password } = testUser;
      return { email, password };
    } 

    return null
  };

  return {
    generateNewUser,
    getRandomUser,
  };
};

export default useFaker;
