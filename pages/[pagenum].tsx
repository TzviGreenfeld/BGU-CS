import prisma from "../lib/prisma";
import type { GetServerSideProps } from "next";
import Blog from "./index";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postCount = await prisma.post.count();
  const pagenum = params?.pagenum;
  const feed = await prisma.post.findMany({
    skip: isNaN(Number(pagenum)) ? 0 : (Number(pagenum) - 1) * 10, // this is the only difference from pages/index.tsx
    take: 10,
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: {
      feed: feed,
      postCount: postCount,
      currpage: pagenum ? Number(pagenum) : 1,
    },
  };
};

export default Blog;
