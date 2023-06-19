import React, { useState, useEffect, useRef, useContext } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useSession } from "next-auth/react";
import UploadFile from "../components/UploadFile";
import ThemeContext from "../context/ThemeContextProvider";
import { GetServerSideProps } from "next";
import prisma from '../lib/prisma'
import { User } from "@prisma/client";
const jwt = require('jsonwebtoken')


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const session = await getSession({ req }); // WAS SESSION
  
  const cookie = req.cookies.cookie;
  if (!cookie){
    return  { props: {} };
  }
  const token = JSON.parse(cookie).token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  const user = await prisma.user.findFirst({
    where: { id: decodedToken.id },
  });
  // console.log("hello from mid:", typeof user)
  // console.log("token from mid:", decodedToken)
  
  if (!decodedToken.id)  { // WAS !SESSION
    res.statusCode = 403;
    console.log("!decodedToken.id")
    return  { props: {} };
  }

  return  { props: {user:user} };
};

type Props = {
  props: { user:User }
};


const Draft: React.FC<Props> = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const ref = useRef(null);

  useEffect(() => {
    if (props.user)
    {ref.current.focus();}
  }, []);

  if (!props.user){ // WAS !SESSION
    return (
      <Layout>
        <h1>Create</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: session, status } = useSession();
  const [videoId, setVideoId] = useState({ id: "", link: "" });

  let email = props.user.email || "";
  // let email = session?.user?.email;
  let name = props.user.name || "";
  // let name = session?.user?.name;

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const { id, link } = videoId;
      const body = { title, content, session, email, id, link };

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
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
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
