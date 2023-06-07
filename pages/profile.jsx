import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import ThemeContext from "../context/ThemeContextProvider";

const Profile = () => {
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
        <h1>Profile</h1>
        <main className="profile">
        <p>name</p>
        <p>name</p>
        <p>name</p>
        <p>name</p>
        </main>
        <style jsx>{`
        .profile {
          line-height: 2;
        }
        `}
        </style>
      </div>
    </Layout>
  );
};

export default Profile;
