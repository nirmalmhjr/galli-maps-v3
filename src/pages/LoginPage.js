/* import React from "react";
import signinLogo from "../assets/images/signin-logo.png";

function LoginPage() {
  return (
    <div className="bg-[#F5F6FA] w-full h-screen flex justify-center items-center">
      <div className="w-[500px] h-[520px] bg-white ">
        <div className="flex justify-center">
          <img
            className="w-[121px] h-[84px]"
            src={signinLogo}
            alt="galli-map-logo"
          />
        </div>
        <div className="h-[338px] w-[436px] mx-8 flex flex-col gap-y-6">
          <h1 className="font-bold text-2xl"> Sign In </h1>
          <div>
            <div>
              <input className="w-full h-[52px] border rounded" type="text" placeholder="Email *"/>
            </div>
            <div>
              <input type="text" placeholder="Password *"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
 */

import React, { useState, useRef, useEffect, useContext } from "react";
import signinLogo from "../assets/images/signin-logo.png";
import viewOffSlash from "../assets/images/view-off-slash.png";
import viewOn from "../assets/images/view-on.png";
import conf from "../conf/conf";
import axios from "../api/axios";
import { useLocation, useNavigate, Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function LoginPage() {
  const userRef = useRef();
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [passwordVisibilty, setPasswordVisibility] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //   console.log(userName, password);
  function togglePasswordVisibilty() {
    setPasswordVisibility(!passwordVisibilty);
  }

  /* async function handleLogin(e) {
    e.preventDefault()
    console.log(conf.apiLoginUrl);
    setLoading(true);
    try {
      //   const response = await fetch(`${conf.apiLogihandleLUrl}`, {
      const response = await fetch(
        `https://auth-init.gallimap.com/api/v1/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userName,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data from login request ", data);
      } else {
        console.error("Login Failed", response.statusText);
      }
    } catch (error) {
      console.log("Error during login :", error);
    } finally {
      setLoading(false);
    }
  } */

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      //   const response = await fetch(`${conf.apiLogihandleLUrl}`, {
      const response = await axios.post(
        "/login",
        JSON.stringify({
          email: userName,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const accessToken = response?.data?.data?.token;
      const role = response?.data?.data?.user?.role;

      sessionStorage.setItem("accessToken", accessToken);

      setAuth({ userName, password, role, accessToken });

      // navigate(from, { replace: true });
      navigate("/event", { replace: true });
    } catch (error) {
      if (!error?.response) {
        console.log("No Server Response");
      } else if (error.response?.status === 400) {
        console.log("Missing Email or Password");
      } else if (error.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#F5F6FA] w-full h-screen flex flex-col justify-center items-center relative">
      <div className="w-[500px] h-[520px] bg-white ">
        <div className="flex justify-center my-8">
          <img
            className="w-[121px] h-[84px]"
            src={signinLogo}
            alt="galli-map-logo"
          />
        </div>
        <div className="h-[338px] w-[436px] mx-8 flex flex-col gap-y-6">
          <h1 className="font-bold text-2xl"> Sign In </h1>
          <div className="flex flex-col gap-y-4">
            <div>
              <input
                className="input-css text-2xl"
                type="text"
                placeholder="Email *"
                ref={userRef}
                value={userName}
                onChange={(event) => setUsername(event.target.value)}
                // required
              />
            </div>
            <div className=" relative">
              <input
                className="input-css"
                type={passwordVisibilty ? "text" : "password"}
                placeholder="Password *"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                // required
              />
              <img
                className="absolute top-5 right-4 w-4  h-4 cursor-pointer"
                src={passwordVisibilty ? viewOn : viewOffSlash}
                alt=""
                onClick={togglePasswordVisibilty}
              />
            </div>
            <div className="flex  justify-between">
              <div className="inline-flex">
                <input type="checkbox" />
                <p className=" ml-2 font-medium ">Remember me</p>
              </div>
              <div>
                <p className="font-medium text-[#EE2142]">Forgot Password</p>
              </div>
            </div>

            <div>
              <button
                className="bg-[#E37547] w-full h-[52px] rounded text-white font-medium text-[18px]"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <p>Don't have an account? </p>
            <p className="text-[#E37547] font-medium ml-2">Sign up</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center mb-4">
        <div className="flex flex-col">
          <p>Copyright © Galli Express Private Limited 2024</p>
          <div className="flex justify-between text-[#007AFF]">
            <a href="#">Visit website</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Term of Use</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
