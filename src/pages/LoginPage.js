import { useState, useRef, useEffect } from "react";
import signinLogo from "../assets/images/signin-logo.png";
import viewOffSlash from "../assets/images/view-off-slash.png";
import viewOn from "../assets/images/view-on.png";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

function LoginPage() {
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });
  const [passwordVisibilty, setPasswordVisibilty] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be atleast 6 characters long"),
  });

  useEffect(() => {
    const localStorageName = localStorage.getItem("email");
    if (localStorageName) {
      setInitialValues((prev) => ({ ...prev, email: localStorageName }));
      setRememberMe(true);
    }
  }, []);

  function navigateToSignup() {
    navigate("/signup", { replace: true });
  }

  async function handleLogin(values) {
    // e.preventDefault()
    const { email, password } = values;

    if (rememberMe) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response?.data?.data?.token;
      const role = response?.data?.data?.user?.role;
      sessionStorage.setItem("token", token);
      setAuth({ email, password, role, token });

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
    }
  }

  return (
    <div className="bg-[#F5F6FA] w-full h-screen flex flex-col justify-center items-center relative">
      <div className="w-[500px] h-[520px] bg-white overflow-auto">
        <div className="flex justify-center my-8">
          <img
            className="w-[121px] h-[84px]"
            src={signinLogo}
            alt="galli-map-logo"
          />
        </div>
        <div className="h-[338px] w-[436px] mx-8 flex flex-col gap-y-6">
          <h1 className="font-bold text-2xl"> Sign In </h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={schema}
            onSubmit={(values) => handleLogin(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex flex-col gap-y-4">
                  <div>
                    <Field
                      className="input-css text-2xl"
                      type="text"
                      placeholder="Email *"
                      name="email"
                    />

                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 ml-2"
                    />
                  </div>
                  <div className=" relative">
                    <Field
                      className="input-css"
                      placeholder="Password *"
                      name="password"
                      type={passwordVisibilty ? "text" : "password"}
                    />
                    <img
                      className="absolute top-5 right-4 w-4  h-4 cursor-pointer"
                      alt="password visibility"
                      src={passwordVisibilty ? viewOn : viewOffSlash}
                      onClick={() => setPasswordVisibilty(!passwordVisibilty)}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 ml-2"
                    />
                  </div>
                  <div className="flex  justify-between">
                    <div className="inline-flex">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <p className=" ml-2 font-medium ">Remember me</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#EE2142] cursor-pointer">
                        Forgot Password
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      className="bg-[#E37547] w-full h-[52px] rounded text-white font-medium text-[18px]"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex justify-center">
            <p>Don't have an account? </p>
            <p
              className="text-[#E37547] font-medium ml-2 cursor-pointer"
              onClick={navigateToSignup}
            >
              Sign up
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

export default LoginPage;
