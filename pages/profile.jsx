import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout";
import ThemeContext from "../context/ThemeContextProvider";


const Profile = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState({})
  const [session, setSession] = useState({
    token:"",
    username:"",
    name:"",
    email:"",
  });


  useEffect(() =>{
    if (typeof window !== undefined){
      try{
        const tokenData = window.localStorage.getItem("token");
        setSession(JSON.parse(tokenData || ""));
        const data = JSON.parse(tokenData)
        
        if (data.username){
          fetch("/api/find/user", {
            method: "GET",
            headers: { "Content-Type": "application/json", "user":JSON.stringify(data.username) },
          }).then(
            res => console.log("res", res))
        }
      } catch(e){

      console.log("ERROR:",e)
      }
    }
      },[])

  const onFieldChange = (e, setState) => {
    setState(e.target.value);
  };

  return (
    <Layout>
      <div className="page">
        <main className="profile">
        <h1>{session.username || "Loading..."}</h1>
        <p>{session.name}</p>
        <p>{session.email}</p>
        </main>
        <style jsx>{`
        .page {
          width:100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .profile {
          margin: 0 auto;
          line-height: 2;
          display: grid;
          place-items: center

        }
        `}
        </style>
      </div>
    </Layout>
  );
};

export default Profile;
