import React, { Suspense, createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeButton from "./ThemeButton";
import ThemeContext from "../context/ThemeContextProvider";
import Cookies from "js-cookie";
import useUserFromToken from "../hooks/useUserFromToken";


const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const user = useUserFromToken();
  const router = useRouter();


  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;


  const signOut = () => {
    if (typeof window !== undefined) {
      Cookies.remove("cookie");
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


  if (!user) { // WAS !SESSION
    right = (
      <div className="right">
        {/* <Link href="/api/auth/signin" legacyBehavior> */}
        <Link href="/signup" legacyBehavior>
          <a data-active={isActive("/signup")}>Sign up</a>
        </Link>
        <Link href="/login" legacyBehavior >
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

  if (user) { // WAS SESSION
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
          {user.name} ({user.email})
        </p>
        <Link href={`/profile/${user.userName}`} legacyBehavior>
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
