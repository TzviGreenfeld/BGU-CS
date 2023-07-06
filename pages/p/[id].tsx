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
import useUserFromToken from "../../hooks/useUserFromToken";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
  return {
    props: post ?? { author: { name: "Me" } }
  };
};

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

const Post: React.FC<PostProps> = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const user = useUserFromToken();
  if (!user) {
    return (
      <Layout>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    )
  }
  const userHasValidSession = Boolean(user);
  const postBelongsToUser = user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }
  const hasVideo = props.videoId.length > 0;
  return (
    <Layout>
      <div>
        <h2>{hasVideo ? "🎥" : ""} {title}</h2>
        <p> <Image className="authorImage"
          src={props.author?.image || ""}
          width={20}
          height={20}
          alt="Picture of the author"
          style={{ borderRadius: '50%', transform: 'translateY(5px)' }}
        /> By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(props.id)}>Delete</button>
        )}
        <Video videoLink={props.videoLink} />
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
