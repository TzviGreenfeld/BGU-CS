import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import ThemeContext from "../context/ThemeContextProvider";
import Spinner from "../components/Spinner";
import UploadImage from "../components/UploadImage";
import { useRouter } from "next/router";

const Signup = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  // TODO: use reducer or make this into a single object state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  // this state is used to force re-render when the user upload new image
  const [imageLink, setImageLink] = useState("");

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
        data.public_id
          ? setImageLink(
              `https://res.cloudinary.com/dicczqmkf/image/upload/vc_auto,q_auto,w_400/${data.public_id}`
            )
          : alert(data.message);
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

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      router.push("/login");
    } else {
      alert("An error has occoourd, try again.");
    }
    setShowSpinner(false);
  };

  return (
    <Layout>
      <h1 className="flex justify-center">Sign Up</h1>
      <div className="flex justify-center">
        <main className="signup">
          <div className="mb-4">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <p>
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={(e) => onFieldChange(e, setUsername)}
                  value={username}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </p>

              <p>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => onFieldChange(e, setPassword)}
                  value={password}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </p>

              <p>
                <label
                  fohtmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => onFieldChange(e, setEmail)}
                  value={email}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </p>

              <p>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => onFieldChange(e, setName)}
                  value={name}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </p>
              {isValidFields() && (
                <p className="text-red-500 text-xs italic">
                  {" "}
                  All the above fields are required.{" "}
                </p>
              )}
              <p>
                <label
                  for="image"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  profile picture
                </label>
                <input type="file" onChange={onImageChange} />
              </p>
            </form>
            {showSpinner ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isValidFields()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Register
              </button>
            )}
          </div>
        </main>
        <style jsx>
          {`
            .signup {
              line-height: 2;
            }
            form {
              display: table;
            }
            p {
              display: table-row;
            }
            label {
              display: table-cell;
            }
            input {
              display: table-cell;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

export default Signup;
