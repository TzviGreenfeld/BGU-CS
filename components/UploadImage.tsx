import React, { useContext, useState } from "react";
import Spinner from "./Spinner";
import ThemeContext from "../context/ThemeContextProvider";
/**
 * duplicate code of UploadFile witohut the metadata part
 * TODO: remove this component,
 *  make UploadFile suitable for this use case
 * 
 * @param setImageLink:() => null
 * function to pass data to father component
 */

const UploadImage: React.FC<{ setImageLink: (link: string) => void }> = ({ setImageLink }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFile, setUploadeddFile] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  // const { data: session, status } = useSession();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e?.target?.files;
    if (files) {
      setSelectedFile(files[0]);
    }
  };

  const submitPicture = async (event: FormEvent<HTMLFormElement>) => {
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
        console.log("data", data)
        data.public_id ?
          setImageLink(`https://res.cloudinary.com/dicczqmkf/image/upload/vc_auto,q_auto,w_400/${data.public_id}`) :
          alert(data.message)

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
            Select Profile Picture

            <input type="file" onChange={onChange} />

          </label>
          {selectedFile && (
            <label className="customInput">
              {/* <input onClick={submitPicture} type="submit">
                Upload
              </input> */}
               <input type="submit" value="Upload" />
            </label>
          )}
        </>
      )}
      <style jsx>{`

        input[type=file]{ 
          color:transparent;
          display: none;
          background: none;
          margin: 50px 0;
        }
        .customInput {
          padding: 5px;
          margin: 50px 0;
          border: 1px solid black;
          border-radius: 5%;
          background: none;
        }




      `}</style>
    </div>
  );
};

export default UploadImage;
