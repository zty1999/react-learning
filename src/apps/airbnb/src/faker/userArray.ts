import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/de';

interface User {
    userId: string,
    username: string,
    email: string,
    avatar: string,
    password: string,
    birthdate: Date,
    registeredAt: Date,
}

export const USERS: User[] = [];

export function createRandomUser(): User {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}
// const userArray = Array.from(Array(1000)).map(item =>{
// })
Array.from({ length: 100 }).forEach(() => {
  USERS.push(createRandomUser());
});