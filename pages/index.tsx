import React, { useState } from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import PaginationBar from "../components/Pagination";
import { useRouter } from "next/router";


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const feed = await prisma.post.findMany({
    skip: 0,
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
    props: { feed },
  };
};

type Props = {
  feed: PostProps[], 
  currpage?: number,
};

const Blog: React.FC<Props> = (props) => {
  const router = useRouter();
  const [currPageNum, setCurrPageNum] = useState(props.currpage ? props.currpage : 1);


  const handleNextPageClick = () => {
    setCurrPageNum(c => {router.push(`/${ Number(c)+1}`); return Number(c) + 1}); //TODO: set last page variable
  };
  const handlePrevPageClick = () => {
    setCurrPageNum(currPageNum <= 1 ? 1 : c => {router.push(`/${c-1}`); return c - 1});
  };
  const handlePaginationClick = (pageNum: number) => {
    setCurrPageNum(c => {router.push(`/${pageNum}`); return pageNum});
  };

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
        <PaginationBar
          currPageNum={currPageNum}
          pagesToShow={5}
          lastPage={100}
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          onPaginationClick={handlePaginationClick}
        />
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
