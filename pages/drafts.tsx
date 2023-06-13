import React, { useContext } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
// import { useSession, getSession } from "next-auth/react";
import prisma from '../lib/prisma'
import ThemeContext from "../context/ThemeContextProvider";


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const session = await getSession({ req }); // WAS SESSION
  if (!true)  { // WAS !SESSION
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      // author: { email: session.user?.email },
      author: { email: "session.user?.email" }, // WAS SESSION
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  // const {data: session}= useSession(); // WAS SESSION

  if (!true){ // WAS !SESSION
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
          ${theme === "dark" ? "background: hsl(220, 15%, 16%);\
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

export default Drafts;
