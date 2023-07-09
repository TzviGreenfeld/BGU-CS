import prisma from "../lib/prisma";
import type { GetServerSideProps } from "next";
import Blog from "./index";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let postCount: number;
  try {
    postCount = await prisma.post.count();
  } catch (err) {
    postCount = 0;
  } 
  const lastPage = Math.ceil(postCount / 10);
  // get the page number from the url and bound it to be in range [1, lastPage]
  let tempPagenum = isNaN(Number(params?.pagenum))? 1 : Math.max(Number(params?.pagenum), 1); // lower bound
  const pagenum = Math.min(tempPagenum, lastPage); // upper bound
  const feed = await prisma.post.findMany({
    skip: (pagenum - 1) * 10, // this is the only difference from pages/index.tsx
    take: 10,
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return {
    props: {
      feed: feed,
      postCount: postCount,
      currpage: pagenum,
    },
  };
};

export default Blog;
