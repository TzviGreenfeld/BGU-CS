// import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import Spinner from "./Spinner";
import { set } from "mongoose";
import ThemeContext from "../context/ThemeContextProvider";

const UploadImage = ({ setImageLink}) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadeddFile] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  // const { data: session, status } = useSession();

  const onChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  const submitPicture = async (event) => {
    setShowSpinner(true);
    event.preventDefault();

    // pre cloudinary request
    const formData = new FormData();
    const file = selectedFile || "";
    const publicID = Date.now().toString();
    formData.append("inputFile", file);
    formData.append("public_id", publicID);

    if (file) {
      try {
        // cloudinary request
        const response = await fetch("/api/video/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setUploadeddFile(true);

        // // metadata for mongo
        // const metaData = {
        //   user: JSON.stringify(session?.user) || "anonymous",
        //   uploadDate: new Date().toISOString(),
        //   postId: publicID,
        //   cloudinaryLink: new String(
        //     `https://res.cloudinary.com/dicczqmkf/video/upload/vc_auto,q_auto,w_800/${data.public_id}`
        //   ).toString(),
        // };
        // console.log("sending metadata: ");
        // console.table(metaData);

        // // mongo request
        // const mongoResponse = await fetch(`/api/metadata`, {
        //   method: "POST",
        //   body: JSON.stringify(metaData),
        // });
        setImageLink(`https://res.cloudinary.com/dicczqmkf/image/upload/vc_auto,q_auto,w_400/${data.public_id}`); // send the id to father component
      } catch (error) {
        setShowSpinner(false);
        console.log("ERROR UPLOADING IMAGE:", error);
      } finally {
        setShowSpinner(false);
      }
    } else {
      setShowSpinner(false);
      console.log("no file");
    }
  };

  const removeUploadedVideo = () => {
    setUploadeddFile(false);
    setSelectedFile(null);
  };

  return showSpinner ? (
    <Spinner />
  ) : (
    <div className="uploadImageBtn">
      {uploadedFile ? (
        <>
          <button onClick={removeUploadedVideo} className="back">
            Remove {selectedFile && selectedFile.name}
          </button>
        </>
      ) : (
        <>
          <label className="customInput">
            Select Profile picture
            <input type="file" onChange={onChange} className="back" />
          </label>
          {selectedFile && (
            <label className="customInput">
            <button onClick={submitPicture} className="back" type="submit">
              Upload
            </button>
            </label>
          )}
        </>
      )}
      <style jsx>{`
      .uploadImageBtn :before{
        
      }
        input[type="submit"], .customInput {
          background: #ececec;
          ${theme === "dark"
            ? "background: hsl(223, 14%, 10%);\
          color: white;"
            : ""}
          border: 2px;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }

          label {
          

        }

        input[type="file"] {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default UploadImage;
