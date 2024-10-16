import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const manager = () => {
  //defining states and dom objects
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);


  //when page is reloaded it will import from local storage
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords)); // Safely parse the JSON
    }
  }, []);

  //copying the text to clipboard
  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  //show password or hide it (using eye svg)
  const showPassword = () => {
    if (ref.current.src.includes("eye.png")) {
      ref.current.src = "eyecross.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "eye.png";
      passwordRef.current.type = "text";
    }
  };

  //saving the password to local storage
  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3)
    {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    }
    else{
      toast("Enter a valid password!")
    }
    
  
  };

  //deleting a passwod
  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this ?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  //editing a password
  const editPassword = (id) => {
    let c = confirm("Are you sure, you want to edit this?");
    if (c) {
      setform(...passwordArray.filter((item) => item.id === id));
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
    }
  };

  //to enter values of website,username and password
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
       
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>

      <div className="w-screen min-h-[86.5vh]  flex py-">
        <div className="md:container md:mx-auto w-full bg-white md:w-4/6 shadow-2xl  flex flex-col px-5 md:px-24">
          <h1 className="text-lg text-3d text-center mt-8 font-bold">
            Your own Password Manager
          </h1>

          <div className="input w-full mt-5 space-y-9">
            <input
              type="text"
              name="site"
              value={form.site}
              onChange={handleChange}
              placeholder="Enter website URL"
              className="border-4 px-4 py-1 border-green-200 rounded-full w-full focus:outline-none"
            />
            <div className="input2 flex w-full gap-4 flex flex-col md:flex md:flex-row">
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="border-4 px-4   focus:outline-none  border-green-200 rounded-full w-full py-1"
              />
              <div className="password relative  flex w-full">
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="border-4 px-4 py-1 focus:outline-none border-green-200 rounded-full w-full"
                />
                <div className="eye md:w-8 w-5 absolute md:right-[15px] md:top-[4px] right-[15px] top-[10px]">
                  <img
                    src="eyecross.png"
                    alt="eye"
                    w={0}
                    onClick={showPassword}
                    ref={ref}
                    className="hover:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-7">
            <button
              onClick={savePassword}
              className="flex gap-2 border-2 border-green-600 items-center justify-center hover:bg-green-300 bg-green-400 rounded-full p-2 font-semibold text-sm px-4 "
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Add Password
            </button>
          </div>

          {/* //managing table */}
          <div className="passwords ">
            <h2 className="font-bold text-2xl py-4 mt-10">Your Passwords :</h2>
            {passwordArray.length === 0 && <div> No passwords to show</div>}
            {passwordArray.length != 0 && (
              <table className="table-auto w-full rounded-md overflow-hidden mb-10 mt-4">
                <thead className="bg-green-800 text-white ">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center ">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>

                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center ">
                            <span>{item.username}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center ">
                            <span>{item.password}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="justify-center py-2 border border-white text-center">
                          <span
                            className="cursor-pointer mx-1 "
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default manager;
