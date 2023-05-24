import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Video from "./Video";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  videoId: String;
  videoLink: String;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const hasVideo = post.videoId.length > 0;
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{hasVideo ? "🎥" : ""} {post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <Video videoLink={post.videoLink} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
