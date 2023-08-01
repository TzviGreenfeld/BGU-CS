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
    e.preventDefault()


    const loginData = {username, password};

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })

    if (response.status === 401){
      // not ok
      setPassword("");
      setUsername("");
      alert("Wrong username/password, try again");
    }
    
    if (response.status === 200){
      // ok, save token in local storage
      // we can be sure this function runs on client side because its triggered by click

      const tokenData = await response.json();
      if (typeof window !== undefined){
        window.localStorage.setItem("token", JSON.stringify(tokenData))
      }

      // go to home page
      router.push('/');
    }


  }

  return (
    <Layout>
      <div className="page">
        <h1>Log In</h1>
        <main className="login">
          <form>
            <label>
              username:
              <input
                type="text"
                name="username"
                onChange={(e) => onFieldChange(e, setUsername)}
                value={username}
              />
            </label>

            <br />
            <label>
              password:
              <input
                type="password"
                name="password"
                onChange={(e) => onFieldChange(e, setPassword)}
                value={password}
              />
            </label>

            <br />
            <button
             type="submit" 
             onClick={e => onSubmit(e)}
             disabled={!(username && password)} >
                Login
                </button>
          </form>
        </main>
        <style jsx>{`
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
