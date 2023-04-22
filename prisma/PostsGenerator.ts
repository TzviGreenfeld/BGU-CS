import { PrismaClient, Prisma, User } from "@prisma/client";

const prisma = new PrismaClient();
function getNposts(n: number, start : number) {
  const posts = [];
  let counter = start;
  while (counter < start + n) {
    posts.push({
      title: `Test post #${counter++}`,
      content: "Nice post mate 🦘 ",
      published: true,
    });
  }
  return posts;
}

export default getNposts;
