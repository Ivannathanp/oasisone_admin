import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory, useParams } from "react-router-dom";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
<<<<<<< HEAD
import {BallTriangle} from "react-loader-spinner";
import { TextField } from "../../Forms/FormLib";

//auth
import {connect} from "react-redux";
import {forgetpassword} from "../../Auth/actions/userActions";
=======
import { BallTriangle } from "react-loader-spinner";
import { TextField } from "../../Forms/FormLib";

//auth
import { connect } from "react-redux";
import { forgetpassword } from "../../Auth/actions/userActions";
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

function ForgetPasswordPage({ forgetpassword }) {
  const [show, setShow] = useState(false);
  let history = useHistory();
<<<<<<< HEAD
  const {userEmail} = useParams();
=======
  const { userEmail } = useParams();
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

  return (
    <div className="backgroundcontainer">
      <div className="registerinnercontainer">
        <div className="containertitle">Forgot Password</div>
        <div className="containerforms">
          <Formik
            initialValues={{
              email: userEmail,
              redirectUrl: "http://localhost:4000/passwordreset",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid e-mail address")
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              forgetpassword(values, history, setFieldError, setSubmitting);
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

                <div className="buttongroup">
                  {!isSubmitting && (
                    <button
                      type="submit"
                      onClick={console.log("pressed", onsubmit)}
                      className="loginbutton"
                    >
                      {" "}
                      Submit{" "}
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
                  Already have an account?{" "}
                  <Link to="/login" className="link">
                    &nbsp;Login
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

export default connect(null, { forgetpassword })(ForgetPasswordPage);
