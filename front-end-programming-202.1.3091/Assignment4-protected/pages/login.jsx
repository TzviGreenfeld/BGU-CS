import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import ThemeContext from "../context/ThemeContextProvider";
import { useRouter } from "next/router";
import { setup } from "CSRF/csrf_setup";

const Login = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onFieldChange = (e, setState) => {
    setState(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const loginData = { username, password };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (response.status === 401) {
      // not ok
      setPassword("");
      setUsername("");
      alert("Wrong username/password, try again");
    }

    if (response.status === 200) {
      // ok, save token in local storage
      // we can be sure this function runs on client side because its triggered by click

      const tokenData = await response.json();
      if (typeof window !== undefined) {
        window.localStorage.setItem("token", JSON.stringify(tokenData));
      }

      // go to home page
      router.push("/");
    }
  };

  return (
    <Layout>
      <h1 className="flex justify-center">Log In</h1>
      <div className="flex justify-center">
        <main className="w-full max-w-xs flex items-center">
          <div className="flex items-center justify-center">
            <div className="mb-4 flex items-center">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  username:
                  <input
                    type="text"
                    name="username"
                    onChange={(e) => onFieldChange(e, setUsername)}
                    value={username}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>

                <br />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  password:
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => onFieldChange(e, setPassword)}
                    value={password}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>

                <br />
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    onClick={(e) => onSubmit(e)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!(username && password)}
                  >
                    Login
                  </button>
                  {!(username && password) && (
                    <p className="text-red-500 text-xs italic">
                      {" "}
                      All fields are required.{" "}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
        <style jsx>
          {`
            .login {
              line-height: 2;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

export const getServerSideProps = setup(async ({ req, res }) => {
  return {
    props: {},
  };
});

export default Login;
