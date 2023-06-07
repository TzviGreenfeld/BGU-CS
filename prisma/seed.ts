import { PrismaClient, Prisma } from "@prisma/client";
import generatePost from "./PostsGenerator";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Slack",
          content: "https://slack.prisma.io",
          published: true,
        },
      ],
    },
  },
  {
    name: "Nilu2",
    email: "nilu@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    posts: {
      create: [
        {
          title: "Ask a question about Prisma on GitHub",
          content: "https://www.github.com/prisma/prisma/discussions",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
  {
    name: "testUser4",
    email: "testUser4@prisma.io",
    posts: {
      create: [
      
      ],
    },
  },
  {
    name: "testUser5",
    email: "testUser5@prisma.io",
    posts: {
      create: [
      
      ],
    },
  },
  {
    name: "testUser6",
    email: "testUser6@prisma.io",
    posts: {
      create: [
      
      ],
    },
  },
  {
    name: "testUser7",
    email: "testUser7@prisma.io",
    posts: {
      create: [
      
      ],
    },
  },
  {
    name: "testUser8",
    email: "testUser8@prisma.io",
    posts: {
      create: [
      
      ],
    },
  },
  {
    name: "testUser9",
    email: "testUser9@prisma.io",
    posts: {
      create: [
      
      ],
    },
  },
  {
    name: "testUser10",
    email: "testUser10@prisma.io",
    posts: {
      create: [
      
      ],
    },
  },
];

async function main() {
  // const posts = generatePost(1000000); // 1M posts
  const posts = generatePost(100000); // 100K posts
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const userPosts = posts.next();
    const user = await prisma.user.create({
      data:{
        ...u,
        posts:{
          create: userPosts.value, /// 100K posts
        }
      }
    });
    console.log(`Created user with id: ${user.id}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    console.log("main nn");
    process.exit(1);
  });
