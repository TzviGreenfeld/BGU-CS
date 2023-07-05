import React, { useContext } from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from '../../lib/prisma'
import Video from "../../components/Video";
import ThemeContext from "../../context/ThemeContextProvider";
import Image from "next/image";
const jwt = require('jsonwebtoken')

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const cookie = req.cookies.cookie;
  if (!cookie) {
    return { props: {} };
  }
  const token = JSON.parse(cookie).token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await prisma.user.findFirst({
    where: { id: decodedToken.id },
  });

  if (!decodedToken.id) { // WAS !SESSION
    res.statusCode = 403;
    console.log("!decodedToken.id")
    return { props: {} };
  }
  console.log("params", params)

  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true, image: true, },
      },
    },
  });
  console.log("post", post)
  return {
    // props: post ?? { author: { name: "Me" } },
    props:
    {
      // post ?? { author: { name: "Me" } },
      post: post,
      // user: user,
    }

  };
}

async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/")
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/")
}

function isObjectEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

const Post: React.FC<any> = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log("props", props)
  if (isObjectEmpty(props)) {
    return (<Layout>
      <div>You need to be authenticated to view this page.</div>
    </Layout>)
  }
  // const userHasValidSession = Boolean(session);
  // const postBelongsToUser = session?.user?.email === props.author?.email;
  // if we got here it means he suer is authenticated
  const userHasValidSession = Boolean(true);
  const postBelongsToUser = true;
  let title = props.post.title;
  if (!props.post.published) {
    title = `${title} (Draft)`;
  }
  const hasVideo = props.post?.videoId.length > 0;
  return (
    <Layout>
      <div>
        <h2>{hasVideo ? "🎥" : ""} {title}</h2>
        <p> <Image className="authorImage"
          src={props.post?.author?.image || ""}
          width={20}
          height={20}
          alt="Picture of the author"
          style={{ borderRadius: '50%', transform: 'translateY(5px)' }}
        /> By {props?.post?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.post.content} />
        {!props.post.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.post.id)}>Publish</button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(props.post.id)}>Delete</button>
        )}
        <Video videoLink={props.post.videoLink} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
          ${theme === "dark" ? "background: hsl(220, 15%, 16%);\
          color: white;" : ""}
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
