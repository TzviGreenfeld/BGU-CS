import React, { Suspense, createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { signOut, useSession } from "next-auth/react";
import ThemeButton from "./ThemeButton";
import ThemeContext from "../context/ThemeContextProvider";
import OnlineIndicator from "./OnlineIndicator";
// import useLocalStorage, {TokenData} from "../hooks/useLocalStorage";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [session, setSession] = useState({
    token:"",
    username:"",
    name:"",
    email:"",
  });

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  useEffect(() =>{
    if (typeof window !== undefined){
      try{
        const tokenData = window.localStorage.getItem("token");
        setSession(JSON.parse(tokenData || ""));
      } catch (e){
        console.log("ERROR:", e)
      }
    }
  } ,[])

  const signOut = () => {
    if (typeof window !== undefined){
      window.localStorage.clear();
    }
    router.push('/')

  }
  
  let left = (
    <div className="left">
      <Link href="/" legacyBehavior>
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
          ${theme === "dark" ? "color: white;" : ""}
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  // if (status === "loading") {
  //   left = (
  //     <div className="left">
  //       <Link href="/" legacyBehavior>
  //         <a className="bold" data-active={isActive("/")}>
  //           Feed
  //         </a>
  //       </Link>
  //       <style jsx>{`
  //         .bold {
  //           font-weight: bold;
  //           ${theme === "dark" ? "color: white;" : ""}
  //         }

  //         a {
  //           text-decoration: none;
  //           color: #000;
  //           display: inline-block;
  //           ${theme === "dark" ? "color: white;" : ""}
  //         }

  //         .left a[data-active="true"] {
  //           color: gray;
  //         }

  //         a + a {
  //           margin-left: 1rem;
  //         }
  //       `}</style>
  //     </div>
  //   );
  //   right = (
  //     <div className="right">
  //       <p>Validating session ...</p>
  //       <style jsx>{`
  //         .right {
  //           margin-left: auto;
  //         }
  //       `}</style>
  //     </div>
  //   );
  // }

  if (!session.token){ // WAS !SESSION
    right = (
      <div className="right">
        {/* <Link href="/api/auth/signin" legacyBehavior> */}
        <Link href="/signup" legacyBehavior>
          <a data-active={isActive("/signup")}>Sign up</a>
        </Link>
        <Link href="/login" legacyBehavior>
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
            ${theme === "dark" ? "color: white;" : ""}
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session.token) { // WAS SESSION
    left = (
      <div className="left">
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/drafts" legacyBehavior>
          <a data-active={isActive("/drafts")}>My drafts</a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
            ${theme === "dark" ? "color: white;" : ""}
          }

          .left a[data-active="true"] {
            color: gray;
            ${theme === "dark" ? "color: white;" : ""}
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.name} ({session.email})
          {/* {"session.user?.name"} ({"session.user?.email"}) */}
        </p>
        <Link href="/profile" legacyBehavior>
          <button>
            <a>Profile</a>
          </button>
        </Link>
        <Link href="/create" legacyBehavior>
          <button>
            <a>New post</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
            ${theme === "dark" ? "color: white;" : ""}
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
            background: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      <ThemeButton />
      {/* <hr />
      <OnlineIndicator /> */}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
