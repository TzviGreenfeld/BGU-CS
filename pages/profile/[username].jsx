import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/Layout"
import ThemeContext from "../../context/ThemeContextProvider";
import Image from 'next/image'
import prisma from "../../lib/prisma";


export const getServerSideProps = async ({ params }) => {
  const postCount = await prisma.post.count();
  const lastPage = Math.ceil(postCount / 10);
  // get the page number from the url and bound it to be in range [1, lastPage]
  let tempPagenum = isNaN(Number(params?.pagenum))? 1 : Math.max(Number(params?.pagenum), 1); // lower bound
  const pagenum = Math.min(tempPagenum, lastPage); // upper bound

  const username = params.username || " ";
  const user = await prisma.user.findFirst({
    where: {
      userName: username,
    },
    // include: {
    //   name : true,
    //   userName : true,
    //   password : true,
    //   email : true,
    //   image : true,
    //   createdAt : true,
    //   posts: true,
    // }
  })

  return {
    props: {
      user: user,
    },
  };
};


const Profile = (props) => {
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
