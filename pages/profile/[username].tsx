import React, { useContext, useState, useEffect, use, CSSProperties } from "react";
import Layout from "../../components/Layout"
import ThemeContext from "../../context/ThemeContextProvider";
import Image from 'next/image'
import useUserFromToken from "../../hooks/useUserFromToken";


const Profile: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const user = useUserFromToken();
  const [image, setImage] = useState(user?.image)

  if (!user) { // WAS !SESSION
    return (
      <Layout>
        <h1>Profile</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }


  const profileCardStyle: CSSProperties = {
    marginTop: "150px",
    padding: "20px 80px",
    border: `2px solid ${theme === 'dark' ? 'white' : 'black'}`,
    borderRadius: "2%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative"
  }

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    const publicID = Date.now().toString();
    formData.append("inputFile", file);
    formData.append("public_id", publicID);
    try {
      // cloudinary request
      const response = await fetch("/api/video/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.public_id) {
        const img = `https://res.cloudinary.com/dicczqmkf/image/upload/vc_auto,q_auto,w_400/${data.public_id}`
        const body = { username: user.userName, newImage: img }
        const res = await fetch("/api/editImage", {
          method: "POST",
          body: JSON.stringify(body),
        });
        if (res.ok) {
          setImage(img);
        }
      }
    } catch (error) {
      console.log("ERROR UPLOADING IMAGE:", error);
    }
  };

  return (
    <Layout>
      <div className="page">
        <main className="profile">
          <small>click image to change</small>
          <div className="profile-card" style={profileCardStyle}>
            <label htmlFor="profilePicInput">

              <input
                id="profilePicInput"
                type="file"
                style={{ display: 'none' }}
                onChange={(event) => handleFileUpload(event)}
              />
              <Image className="profilePic"
                src={image || user.image || ""}
                width={100}
                height={100}
                alt="Picture of the user"
                style={{
                  position: 'absolute',
                  top: "-50px",
                  border: `2px ${theme !== 'dark' ? 'black' : 'white'} solid`,
                  borderRadius: '50%',
                }}
              />
            </label>


            <h1>{user.name}</h1>
            <p>{user.userName ? user.userName : ""}</p>
            <p>{user.email}</p>
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
        label {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        small {
          margin: 0;
          padding: 0;
          display: inline-block;
        }
        
        `}
        </style>
      </div>
    </Layout>
  );
};

export default Profile;
