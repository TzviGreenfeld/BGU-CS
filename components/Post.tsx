import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Video from "./Video";
import Image from 'next/image'


export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
    image: string;
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
      <small> <Image className="authorImage"
      src={post.author?.image || ""}
      width={20}
      height={20}
      alt="Picture of the author"
      style={{ borderRadius: '50%', transform: 'translateY(5px)'}}
    /> By {authorName} </small>
      <ReactMarkdown children={post.content} />
      <Video videoLink={post.videoLink} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
        .authorImage {
          border-radius: 100%;
        }
      `}</style>
    </div>
  );
};

export default Post;
