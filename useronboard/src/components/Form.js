import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

import Zoom from "react-reveal/Zoom";

import Fade from "react-reveal/Fade";

import Bounce from "react-reveal/Bounce";

import { Form as Forms, Segment, Dimmer, Loader } from "semantic-ui-react";
const LoginForm = ({ errors, touched, values, isSubmitting }) => {
  console.log(errors);
  return (
    <Form>
      <Forms
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#5085A5",
          width: "45%",
          marginTop: "5%",
          borderLeft: "3px solid #31708E",
          borderBottom: "3px solid #31708E"
        }}
      >
        <h2 style={{ marginTop: "10px" }} className="ui header">
          <Fade duration="1500" delay="1000">
            <i aria-hidden="true" className="plug icon" />
          </Fade>
          <Zoom duration="1500" right cascade delay="800">
            {" "}
            <div className="content">Form</div>
          </Zoom>
        </h2>
        <Forms.Group
          widths="equal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "4%",
            borderRadius: "50px"
          }}
        >
          <Bounce delay="500" duration="1000">
            {" "}
            <Field
              type="text"
              name="name"
              placeholder="Name"
              style={{ margin: "2%" }}
            />
          </Bounce>

          {touched.name && errors.name && (
            <p
              style={{ color: "red" }}
              className="ui pointing above prompt label"
            >
              {errors.name}
            </p>
          )}
          <Bounce delay="1000" duration="1500">
            {" "}
            <Field
              type="email"
              name="email"
              placeholder="Email"
              style={{ margin: "2%" }}
            />
          </Bounce>
          {touched.email && errors.email && (
            <p
              style={{ color: "red" }}
              className="ui pointing above prompt label"
            >
              {errors.email}
            </p>
          )}
          <Bounce delay="1500" duration="2000">
            {" "}
            <Field
              type="password"
              name="password"
              placeholder="Password"
              style={{ margin: "2%" }}
            />
          </Bounce>
          {touched.password && errors.password && (
            <p
              style={{ color: "red" }}
              className="ui pointing above prompt label"
            >
              {errors.password}
            </p>
          )}

          <Fade bottom duration="2000" delay="1500">
            <label
              style={{
                margin: "auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              {" "}
              terms
              <Field
                style={{ margin: "10px" }}
                type="checkbox"
                name="terms"
                placeholder="terms"
                checked={values.terms}
              />
            </label>
          </Fade>

          {values.terms === false && touched.terms === false && (
            <p>{errors.terms}</p>
          )}

          {isSubmitting && (
            <Segment>
              <Dimmer active inverted>
                <Loader inverted content="Loading" />
              </Dimmer>
            </Segment>
          )}
          <Fade duration="2000" delay="1200">
            {" "}
            {values.terms === false ? (
              <p
                style={{
                  padding: "10px 15px",
                  background: "#687864",
                  color: "darkred"
                }}
              >
                you must agree to terms
              </p>
            ) : (
              <button
                style={{
                  background: "#687864",
                  color: "black",
                  border: "1px #8FC1E3 solid"
                }}
                disabled={isSubmitting}
              >
                Submit!
              </button>
            )}
          </Fade>
        </Forms.Group>{" "}
      </Forms>
    </Form>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      terms: terms || false,
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("fullname is required")
      .min(4, "your name shouldnt be less than 4 char"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should at least be 6 char")
      .max(10, "Password shouldnt be be more than 10 char")
      .required("password is required"),
    terms: Yup.boolean("box should be checked").required("terms are required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "alreadytaken@atb.dev") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          resetForm();
          window.alert("sent");

          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;
