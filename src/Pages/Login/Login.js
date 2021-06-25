import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = (props) => {
  const { history } = props;
  const [users, setUsers] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, watch, errors, formState } = useForm({
    mode: "onChange",
  });

  const getUsers = async () => {
    var res = await axios.get(
      "https://phpstack-426242-1347501.cloudwaysapps.com/users.php",
      {}
    );
    if (res) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSubmit = async () => {
    var inputValues = {
      email: watch("email"),
      password: watch("password"),
    };

    // eslint-disable-next-line array-callback-return
    users.map((user) => {
      if (
        user.email === inputValues.email &&
        user.password === inputValues.password
      ) {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("user");
        if (isChecked) {
          localStorage.setItem("rememberMe", true);
        }
        localStorage.setItem(
          "user",
          JSON.stringify({
            user_name: user.name,
            id: user.id,
            token: user.token,
            time: new Date(),
          })
        );
        localStorage.setItem("isLoggedIn", true);
        history.push("/stock");
      } else {
        setError("Invalid username or password");
      }
    });
  };

  return (
    <Container className="shadow-lg p-3 rounded mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <div className="card">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h4 className="text-uppercase mt-0">Sign In</h4>
              </div>
              {error !== "" && (
                <div className="text-danger text-center pb-2">{error}</div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                  <label
                    htmlFor="email"
                    style={{ paddingLeft: "10px", paddingBottom: "5px" }}
                  >
                    Email <span className="required">*</span>
                  </label>
                  <input
                    name="email"
                    onChange={() => {
                      console.log(errors);
                    }}
                    {...register("email", { required: true })}
                    className="form-control"
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label
                    htmlFor="password"
                    style={{ paddingLeft: "10px", paddingBottom: "5px" }}
                  >
                    Password <span className="required">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="password"
                    {...register("password", { required: true })}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="form-group mb-3">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkbox-signin"
                      checked={isChecked}
                      onChange={() => {
                        setChecked(!isChecked);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="checkbox-signin"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="form-group mb-0 text-center">
                  <button
                    type="submit"
                    className="submit btn btn-primary btn-block"
                    disabled={!formState.isValid}
                  >
                    {" "}
                    Log In{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Row className="row mt-3">
            <Col className="col-12 text-center">
              <p>
                {" "}
                <a className="text-dark ml-1">
                  <FontAwesomeIcon icon={faLock} className="mr-1" /> Forgot your
                  password?
                </a>
              </p>
              <p className="text-dark">
                Don't have an account?{" "}
                <a className="text-dark ml-1">
                  <b>Sign Up</b>
                </a>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
