import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import ThemeContext from "../context/ThemeContextProvider";

const Login = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onFieldChange = (e, setState) => {
    setState(e.target.value);
  };

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
                onChange={(e) => onFieldChange(e, setUsername)}
                value={username}
              />
            </label>

            <br />
            <label>
              password:
              <input
                type="password"
                onChange={(e) => onFieldChange(e, setPassword)}
                value={password}
              />
            </label>
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

export default Login;
