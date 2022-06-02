import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
<<<<<<< HEAD
import { Link,  useHistory, useParams } from "react-router-dom";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {BallTriangle} from "react-loader-spinner";
=======
import { Link, useHistory, useParams } from "react-router-dom";
import "./LoginPage.css";
import { BallTriangle } from "react-loader-spinner";
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
import { PassTextField, TextField } from "../../Forms/FormLib";

//auth
import { connect } from "react-redux";
import { loginUser } from "../../Auth/actions/userActions";

<<<<<<< HEAD
function ValidateLoginPage({ loginUser }) {
  const [show, setShow] = useState(false);
=======
function ValidateLoginPage({loginUser}) {
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
  let history = useHistory();
  const { userEmail } = useParams();

  return (
    <div className="backgroundcontainer">
      <div className="innercontainer">
        <div className="containertitle">Login For Oasis One</div>
        <div className="containerforms">
          <Formik
            initialValues={{ email: userEmail, password: "" }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid e-mail address")
                .required("Required"),
              password: Yup.string()
                .required("Required")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(/(?=.*[0-9])/, "Password must contain a number.")
                .max(30, "Password is too long"),
            })}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              loginUser(values, history, setFieldError, setSubmitting);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="marginedinputform">
                  <TextField
                    //label="Email"
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                </div>

                <div className="passinputform">
                  <PassTextField
                    //label="Password"
                    name="password"
                    placeholder="Password"
                  />
                </div>

                <Link to="/forgetpassword" className="rightlink">
                  Forgot Password?
                </Link>

                <div className="buttongroup">
                  {!isSubmitting && (
<<<<<<< HEAD
                    <button
                      type="submit"
                     
                      className="loginbutton"
                    >
=======
                    <button type="submit" className="loginbutton">
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                      {" "}
                      Login{" "}
                    </button>
                  )}
                  {isSubmitting && (
<<<<<<< HEAD
                    <BallTriangle
      
                      color="#f10c0c"
                      height={80}
                      width={80}
                    />
=======
                    <BallTriangle color="#f10c0c" height={80} width={80} />
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                  )}
                </div>

                <div className="middlerow">
                  Don't have an account?{" "}
                  <Link to="/register" className="link">
                    &nbsp;Register
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default connect(null, {loginUser})(ValidateLoginPage);
