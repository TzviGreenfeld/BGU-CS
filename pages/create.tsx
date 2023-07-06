import React, { useState, useEffect, useRef, useContext, ChangeEvent } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import UploadFile from "../components/UploadFile";
import ThemeContext from "../context/ThemeContextProvider";
import useUserFromToken from "../hooks/useUserFromToken";
import { User } from "@prisma/client";

const Draft: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const ref = useRef<HTMLInputElement>(null);
  const user = useUserFromToken();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoId, setVideoId] = useState({ id: "", link: "" });

  useEffect(() => {
    if (user) { ref?.current?.focus(); }
  }, []);

  if (!user) { // WAS !SESSION
    return (
      <Layout>
        <h1>Create</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }


  let email = user.email || "";
  let name = user.name || "";

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const { id, link } = videoId;
      const body = { title, content, email, id, link };

      await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            ref={ref}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            name="title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            name="content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
          <UploadFile onVideoSave={setVideoId} />
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          ${theme === "dark"
          ? "background: hsl(220, 15%, 16%);\
              color: white;"
          : ""}
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
          ${theme === "dark"
          ? "background: hsl(223, 14%, 10%);\
          color: white;"
          : ""}
        }

        input[type="submit"] {
          background: #ececec;
          ${theme === "dark" ? "background: hsl(223, 14%, 10%);\
          color: white;" : ""}
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
