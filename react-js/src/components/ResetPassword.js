import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";
import { useNavigate } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const ResetPassword = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const form = useRef();
  const form1 = useRef();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const checkBtn = useRef();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [requireOTP, setRequireOTP] = useState(false);
  const [password, setPassword] = useState("");

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="invalid-feedback d-block">
          This is not a valid email.
        </div>
      );
    }
  };

  const validateOTP = (e) => {
    e.preventDefault();
    if (otp) {
      AuthService.verifyOTP(otp).then((response) => {

        if(response.validOTP){
            setRequireOTP(false);
            setNewPassword(true)
        }
      });
    }
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    e.preventDefault();
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onResetToNewPassword=(e)=>{
    e.preventDefault();
    if(password){
        AuthService.updatePassword(username,password).then((response)=>{
            console.log('response',response);
            navigate('/login');
        })
    }
  }

  const onReset = (e) => {
    e.preventDefault();
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.resetPassword(username, email).then(
        (response) => {
          console.log(response);
          setMessage(response.message);
          setSuccessful(true);
          setTimeout(() => {
            // setNewPassword(true);
            setRequireOTP(true);
          }, 500);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };


  if (requireOTP) {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Form onSubmit={validateOTP} ref={form1}>
            <div >
              <label>Please enter the OTP</label>
              <input
                type="text"
                id="otp"
                className="form-control"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Valide OTP</span>
              </button>
            </div>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    );
  }
  else{
    return (
        <div className="col-md-12">
          <div className="card card-container">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />
    
            {newPassword ? (
              <Form onSubmit={onResetToNewPassword} ref={form}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    // validations={[required]}
                  />
                </div>
    
                {/* <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div> */}
    
                <div className="form-group">
                  <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Create New Password</span>
                  </button>
                </div>
                {/* {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful ? "alert alert-success" : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )} */}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            ) : (
              <Form onSubmit={onReset} ref={form}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>
    
                <div className="form-group">
                  <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Reset password</span>
                  </button>
                </div>
                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful ? "alert alert-success" : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            )}
          </div>
        </div>
      );

  }

  
};

export default ResetPassword;
