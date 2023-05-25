import React, { useState, useEffect, useContext,} from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import PaginationBar from "../components/Pagination";
import { useRouter } from "next/router";
import ThemeContext from "../context/ThemeContextProvider";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postCount = await prisma.post.count();
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
    props: {
      feed: feed,
      postCount: postCount,
    },
  };
};

type Props = {
  feed: PostProps[];
  postCount: number;
  currpage?: number;
};

const Blog: React.FC<Props> = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();
  const [currPageNum, setCurrPageNum] = useState(
    props.currpage ? props.currpage : 1
  );

  // using this Effect will make the home page route to /1
  useEffect(() => {
    router.push(`/${currPageNum}`);
  }, [currPageNum]);

  const lastPage = Math.ceil(props.postCount / 10);

  const handleNextPageClick = () => {
    setCurrPageNum(currPageNum >= lastPage ? lastPage : (c) => c + 1);
  };
  const handlePrevPageClick = () => {
    setCurrPageNum(currPageNum <= 1 ? 1 : (c) => c - 1);
  };
  const handlePaginationClick = (pageNum: number) => {
    setCurrPageNum(pageNum);
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
          lastPage={lastPage}
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          onPaginationClick={handlePaginationClick}
        />
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
          ${theme === "dark" ? "background: hsl(223, 14%, 10%);\
                                 color: white;" : ""}
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
