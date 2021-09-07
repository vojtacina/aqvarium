import faker from "faker";
import prisma from "../lib/clients/prisma";

async function main() {
  const listOfNewUsers = [...new Array(5)].map(() => {
    return {
      username: faker.internet.userName(),
      password: faker.name.firstName(),
      }
    ;
  });

  for (let data of listOfNewUsers) {
    const user = await prisma.user.create({
      data,
    });

    console.log(user);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });