import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import Spinner from "./Spinner";
import { set } from "mongoose";
import ThemeContext from "../context/ThemeContextProvider";

const UploadFile = ({ onVideoSave }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadeddFile] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { data: session, status } = useSession();

  const onChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  const submitVideo = async (event) => {
    setShowSpinner(true);
    event.preventDefault();

    // pre cloudinary request
    const formData = new FormData();
    const file = selectedFile || "";
    const publicID = `${session?.user?.name?.replace(
      " ",
      "_"
    )}_${Date.now().toString()}`;
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

        // metadata for mongo
        const metaData = {
          user: JSON.stringify(session?.user) || "anonymous",
          uploadDate: new Date().toISOString(),
          postId: publicID,
          cloudinaryLink: new String(
            `https://res.cloudinary.com/dicczqmkf/video/upload/vc_auto,q_auto,w_800/${data.public_id}`
          ).toString(),
        };
        console.log("sending metadata: ");
        console.table(metaData);

        // mongo request
        const mongoResponse = await fetch(`/api/metadata`, {
          method: "POST",
          body: JSON.stringify(metaData),
        });
        onVideoSave({ id: publicID, link: metaData.cloudinaryLink }); // send the id to father component
      } catch (error) {
        setShowSpinner(false);
        console.log("ERROR UPLOADING VIDEO:", error);
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
    <span>
      {uploadedFile ? (
        <>
          <button onClick={removeUploadedVideo} className="back">
            Remove {selectedFile && selectedFile.name}
          </button>
        </>
      ) : (
        <>
          <label className="customInput">
            Select Video
            <input type="file" onChange={onChange} className="back" />
          </label>
          {selectedFile && (
            <label className="customInput">
            <button onClick={submitVideo} className="back" type="submit">
              Upload
            </button>
            </label>
          )}
        </>
      )}
      <style jsx>{`
        input[type="submit"], .customInput {
          background: #ececec;
          ${theme === "dark"
            ? "background: hsl(223, 14%, 10%);\
          color: white;"
            : ""}
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }

        input[type="file"] {
          display: none;
        }
      `}</style>
    </span>
  );
};

export default UploadFile;
