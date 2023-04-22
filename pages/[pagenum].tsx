import prisma from "../lib/prisma";
import type { GetServerSideProps } from "next";
import Blog from "./index"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const feed = await prisma.post.findMany({
    skip: params?.pagenum ? (Number(params?.pagenum) - 1) * 10 : 0,
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
    props: { feed, currpage: params?.pagenum },
  };
};

export default Blog;