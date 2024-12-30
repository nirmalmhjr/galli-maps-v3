import React, { useState, useRef, useEffect, useContext } from "react";
import signinLogo from "../assets/images/signin-logo.png";
import downArrow from "../assets/images/arrow-down-01.png";
import viewOffSlash from "../assets/images/view-off-slash.png";
import viewOn from "../assets/images/view-on.png";
import conf from "../conf/conf";
import axios from "../api/axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

function SignupPage() {
  const [passwordVisibilty, setPasswordVisibility] = useState(false);
  const [userType, setUserType] = useState("");
  const [userTypeVisibilty, setUserTypeVisibility] = useState(false);

  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    applicant: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    billingAddress: "",
    userType: "",
  });

  const schema = Yup.object().shape({
    applicant: Yup.string().required("Applicant/Organization name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Password must match "),
    contactNumber: Yup.string().required("Contact is required"),
  });

  function handleSignup(values) {
    console.log("values are ", values);
  }

  function navigateToSignin() {
    navigate("/login", { replace: true });
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
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values) => handleSignup(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-col gap-y-4 h-[500px] overflow-y-auto">
                    {/* Applicant/Organization Name */}
                    <div>
                      <Field
                        className="input-css text-2xl"
                        type="text"
                        name="applicant"
                        placeholder="Applicant/Organization Name *"
                        // ref={userRef}
                      />
                      <ErrorMessage
                        name="applicant"
                        component="div"
                        className="text-red-600 ml-2"
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <Field
                        className="input-css text-2xl"
                        type="text"
                        name="email"
                        placeholder="Email *"
                        // ref={userRef}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-600 ml-2"
                      />
                    </div>
                    {/* password input */}
                    <div className=" relative">
                      <Field
                        className="input-css"
                        type={passwordVisibilty ? "text" : "password"}
                        name="password"
                        placeholder="Password *"
                      />
                      <img
                        className="absolute top-5 right-4 w-4  h-4 cursor-pointer"
                        src={passwordVisibilty ? viewOn : viewOffSlash}
                        alt=""
                        onClick={() =>
                          setPasswordVisibility(!passwordVisibilty)
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-600 ml-2"
                      />
                    </div>
                    {/* confirm password input*/}
                    <div className=" relative">
                      <Field
                        className="input-css"
                        type={passwordVisibilty ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password *"
                        // ref={passwordRef}
                      />
                      <img
                        className="absolute top-5 right-4 w-4  h-4 cursor-pointer"
                        src={passwordVisibilty ? viewOn : viewOffSlash}
                        alt=""
                        onClick={() =>
                          setPasswordVisibility(!passwordVisibilty)
                        }
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-600 ml-2"
                      />
                    </div>
                    {/* Contact Number */}
                    <div>
                      <Field
                        className="input-css text-2xl"
                        type="text"
                        name="contactNumber"
                        placeholder="Contact Number *"
                      />
                      <ErrorMessage
                        name="contactNumber"
                        component="div"
                        className="text-red-600 ml-2"
                      />
                    </div>
                    {/* Billing Address */}
                    <div>
                      <Field
                        className="input-css text-2xl"
                        type="text"
                        name="billingAddress"
                        placeholder="Billing Address "
                      />
                    </div>

                    {/* User Type */}
                    <div className="relative">
                      <Field
                        className="input-css text-2xl"
                        type="text"
                        name="userType"
                        placeholder="User Type "
                      />

                      <img
                        // className="absolute top-5 right-4 w-4  h-4 cursor-pointer"
                        className={`absolute top-5 right-4 w-4  h-4 cursor-pointer ${
                          userTypeVisibilty ? "rotate-180" : ""
                        }`}
                        src={downArrow}
                        alt=""
                        onClick={() =>
                          setUserTypeVisibility(!userTypeVisibilty)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      className="bg-[#E37547] w-full h-[52px] rounded text-white font-medium text-[18px]"
                      type="submit"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex justify-center">
            <p>Already have an account? </p>
            <p
              className="text-[#E37547] font-medium ml-2 cursor-pointer"
              onClick={navigateToSignin}
            >
              Sign In
            </p>
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
