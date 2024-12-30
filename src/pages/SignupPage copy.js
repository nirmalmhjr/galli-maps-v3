import React, { useState, useRef, useEffect, useContext } from "react";
import signinLogo from "../assets/images/signin-logo.png";
import downArrow from "../assets/images/arrow-down-01.png"
import viewOffSlash from "../assets/images/view-off-slash.png";
import viewOn from "../assets/images/view-on.png";
import conf from "../conf/conf";
import axios from "../api/axios";
import { useLocation, useNavigate, Link } from "react-router-dom"; 


function SignupPage() {
  const [applicantName, setApplicantName] = useState("")
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibilty, setPasswordVisibility] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [userType, setUserType] = useState("");
  const [userTypeVisibilty, setUserTypeVisibility] = useState(false)

  const navigate = useNavigate()
  
  function handleSignup() {
    console.log("handle signup function clicked");
  }

  function togglePasswordVisibilty() {
    // setPasswordVisibility(prev => !prev)
    setPasswordVisibility(!passwordVisibilty);
  }

  function navigateToSignin(){
    navigate("/login", {replace: true })
  }

  return (
    <div className="bg-[#F5F6FA] w-full h-screen flex flex-col justify-center items-center relative">
      <div className="w-[500px] h-[818px] bg-white ">
        <div className="flex justify-center my-8">
          <img
            className="w-[121px] h-[84px]"
            src={signinLogo}
            alt="galli-map-logo"
          />
        </div>
        <div className="h-[338px] w-[436px] mx-8 flex flex-col gap-y-6">
          <h1 className="font-bold text-2xl"> Sign Up </h1>
          <div className="flex flex-col gap-y-4">
            {/* Applicant/Organization Name */}
            <div>
              <input
                className="input-css text-2xl"
                type="text"
                placeholder="Applicant/Organization Name *"
                // ref={userRef}
                value={applicantName}
                onChange={(event) => setApplicantName(event.target.value)}
              />
              
            </div>
            {/* Email */}
            <div>
              <input
                className="input-css text-2xl"
                type="text"
                placeholder="Email *"
                // ref={userRef}
                value={userName}
                onChange={(event) => setUsername(event.target.value)}
              />
              
            </div>
            {/* password input */}
            <div className=" relative">
              <input
                className="input-css"
                type={passwordVisibilty ? "text" : "password"}
                placeholder="Password *"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                // ref={passwordRef}
              />
              <img
                className="absolute top-5 right-4 w-4  h-4 cursor-pointer"
                src={passwordVisibilty ? viewOn : viewOffSlash}
                alt=""
                onClick={togglePasswordVisibilty}
              />
            </div>
            {/* confirm password input*/}
            <div className=" relative">
              <input
                className="input-css"
                type={passwordVisibilty ? "text" : "password"}
                placeholder="Confirm Password *"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                // ref={passwordRef}
              />
              <img
                className="absolute top-5 right-4 w-4  h-4 cursor-pointer"
                src={passwordVisibilty ? viewOn : viewOffSlash}
                alt=""
                onClick={togglePasswordVisibilty}
              />
            </div>
            {/* Contact Number */}
            <div>
              <input
                className="input-css text-2xl"
                type="text"
                placeholder="Contact Number *"
                value={contactNumber}
                onChange={(event) => setContactNumber(event.target.value)}
              />
            </div>
            {/* Billing Address */}
            <div>
              <input
                className="input-css text-2xl"
                type="text"
                placeholder="Billing Address "
                value={billingAddress}
                onChange={(event) => setBillingAddress(event.target.value)}
              />
            </div>

            {/* User Type */}
            <div className="relative">
              <input
                className="input-css text-2xl"
                type="text"
                placeholder="User Type "
                value={userType}
                onChange={(event) => setUserType(event.target.value)}
              />

              <img
                // className="absolute top-5 right-4 w-4  h-4 cursor-pointer"
                className={`absolute top-5 right-4 w-4  h-4 cursor-pointer ${userTypeVisibilty ? 'rotate-180' : ''}`}
                src={ downArrow}
                alt=""
                onClick={()=>setUserTypeVisibility(!userTypeVisibilty)}
              />
            </div>

            <div>
              <button
                className="bg-[#E37547] w-full h-[52px] rounded text-white font-medium text-[18px]"
                onClick={handleSignup}
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <p>Already have an account? </p>
            <p 
            className="text-[#E37547] font-medium ml-2 cursor-pointer"
            onClick={navigateToSignin}
            >Sign In</p>
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

export default SignupPage;
