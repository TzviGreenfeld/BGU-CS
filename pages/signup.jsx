import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import ThemeContext from "../context/ThemeContextProvider";
import Spinner from "../components/Spinner";

const Signup = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const onFieldChange = (e, setState) => {
    setState(e.target.value);
  };

  const isValidFields = () => {
    return !(username && email && password && name);
  };

  const handleSubmit = async () => {
    setShowSpinner(true);
    const userData = {
      userName: username,
      email: email,
      password: password,
      name: name,
    };

    console.log("sending userData:", userData);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).catch((error) => {
      alert(error);
    });
    // const data = await response.json();

    // console.log(data);
    setShowSpinner(false);
  };

  return (
    <Layout>
      <div className="page">
        <h1>Sign In</h1>
        <main className="signup">
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
            <br />
            <label>
              email:
              <input
                type="text"
                onChange={(e) => onFieldChange(e, setEmail)}
                value={email}
              />
            </label>
            <br />
            <label>
              name:
              <input
                type="text"
                onChange={(e) => onFieldChange(e, setName)}
                value={name}
              />
            </label>
          </form>
          {showSpinner ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isValidFields()}
            >
              Register
            </button>
          )}
        </main>
        <style jsx>
          {`
            .signup {
              line-height: 2;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

export default Signup;
