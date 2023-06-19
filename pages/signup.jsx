import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import ThemeContext from "../context/ThemeContextProvider";
import Spinner from "../components/Spinner";
import UploadImage from "../components/UploadImage"
import { useRouter } from "next/router";


const Signup = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const router = useRouter();

  const onImageChange = async (event) => {
    event.preventDefault();
    setShowSpinner(true);

    // pre cloudinary request
    const formData = new FormData();
    const file = event.target.files[0];
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
        console.log("id", data.public_id)
        data.public_id ?
          setImageLink(`https://res.cloudinary.com/dicczqmkf/image/upload/vc_auto,q_auto,w_400/${data.public_id}`) :
          alert(data.message)

      } catch (error) {
        setShowSpinner(false);
        console.log("ERROR UPLOADING IMAGE:", error);
      } finally {
        setShowSpinner(false);
        console.log("first")
      }
    } else {
      setShowSpinner(false);
      console.log("no file");
    }
  };
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
      name: name,
      email: email,
      password: password,
      image: imageLink,
    };

    console.log("sending userData:", userData);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    if (response.ok) {
      router.push('/login');
    } else {
      alert("An error has occoourd, try again.")
    }

    setShowSpinner(false);
  };

  return (
    <Layout>
      <div className="page">
        <h1>Sign Up</h1>
        <main className="signup">
          <form>

            <p>
              <label for="username">username</label>
              <input
                type="text"
                id="username"
                onChange={(e) => onFieldChange(e, setUsername)}
                value={username}
              />
            </p>

            <p>
              <label>password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => onFieldChange(e, setPassword)}
                value={password}
              />
            </p>

            <p>
              <label for="email">email</label>
              <input
                type="text"
                id="email"
                onChange={(e) => onFieldChange(e, setEmail)}
                value={email}
              />
            </p>

            <p>
              <label for="name">name</label>
              <input
                type="text"
                id="name"
                onChange={(e) => onFieldChange(e, setName)}
                value={name}
              />
            </p>

            <p>
              <label for="image">profile picture</label>
              <input type="file" onChange={onImageChange} />
              {/* <UploadImage setImageLink={setImageLink} /> */}
            </p>

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
            form  { display: table;      }
            p     { display: table-row;  }
            label { display: table-cell; }
            input { display: table-cell; }
          `}
        </style>
      </div>
    </Layout>
  );
};

export default Signup;
