import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/Layout"
import ThemeContext from "../../context/ThemeContextProvider";
import Image from 'next/image'
import prisma from "../../lib/prisma";

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

  
  if (!decodedToken.id)  { // WAS !SESSION
    res.statusCode = 403;
    console.log("!decodedToken.id")
  }

  return  { props: {user:user} };
};

type Props = {
  props: { user: User }
};



const Profile: React.FC<Props> = (props) =>  {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log("props:", props)

  const profileCardStyle = {
    marginTop: "150px",
    padding: "20px 80px",
    border: `2px solid ${theme === 'dark' ? 'white': 'black' }`,
    borderRadius: "2%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative"
  }

  if (!props.user){ // WAS !SESSION
    return (
      <Layout>
        <h1>Profile</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="page">
        <main className="profile">
          <div className="profile-card" style={profileCardStyle}>
          <Image className="profilePic"
            src={props.user.image}
            width={100}
            height={100}
            alt="Picture of the user"
            style={{
              position: 'absolute',
              top: "-50px",
              border: `2px ${theme !== 'dark' ? 'black': 'white' } solid`,
              borderRadius: '50%',
            }}
              />
            
            <h1>{props.user.name}</h1>
            <p>{props.user.userName ? props.user.userName : ""}</p>
            <p>{props.user.email}</p>
          </div>
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
          line-height: 1.5;
          display: grid;
          place-items: center;
        }
        .profile-card h1 {
          padding-top: 30px;
        }
        
        `}
        </style>
      </div>
    </Layout>
  );
};

export default Profile;
