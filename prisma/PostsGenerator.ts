import { Prisma } from "@prisma/client";

function* generatePost(n: number): Generator<Prisma.PostCreateInput[]> {
  let i = 0;
  while (i < n) {
    const posts = []
    for(let j = i; j < i + 100000; j++) {
      posts.push({
      title: `Test Post #${j}`,
      content: `Content of post ${j}`,
      published: true,
      })
    }
    
    i += 100000;
    yield posts;
  }
}

export default generatePost;
