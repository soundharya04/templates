import React, { useState } from "react";
import { FormContainer } from "../Components/uiElements";
import Home from "../Components/Home";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [mstatus, setMstatus] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({
    eusername: "",
    eemail: "",
    epassword: "",
    ecpassword: "",
    eaddress: "",
    ecity: "",
    estate: "",
    ecountry: "",
    emobile: "",
  });

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (count = count + 1)
    );
    return count;
  };

  const validateFormData = () => {
    if (username.length < 5) {
      console.log("data invalid");
      setErrors((prevState) => ({
        ...prevState,
        eusername: "Username must be atleast 5 characters long",
      }));
    }

    const validpass = validEmailRegex.test(email);
    if (validpass == false) {
      setErrors((prevState) => ({
        ...prevState,
        eemail: "Invalid email address",
      }));
    }
    if (password.length < 8) {
      setErrors((prevState) => ({
        ...prevState,
        epassword: "Password must be 8 characters long!",
      }));
    }
    if (password != Cpassword) {
      setErrors((prevState) => ({
        ...prevState,
        ecpassword: "both the passwords do not match",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFormData();
    console.log(errors);
  };

  return (
    <React.Fragment>
      <FormContainer
        formStyle={{ marginTop: "3vh", marginBottom: "1vh", width: "60%" }}
      >
        <form onSubmit={handleSubmit}>
          <h5 className="h3 pb-4 text-center">Create your XYZ Account</h5>
          <div className="form-group">
            <input
              type="text"
              className="form-control "
              placeholder="Username"
              required
              autoComplete="off"
              onChange={(e) => {
                setUserName(e.target.value);
                setErrors((prevState) => ({
                  ...prevState,
                  eusername: "",
                }));
              }}
            />

            <span
              className="error mb-3"
              style={{
                color: "red",
                visibility: errors.eusername.length > 0 ? "visible" : "hidden",
              }}
            >
              {errors.eusername}
            </span>

            <div className="input-group ">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prevState) => ({
                    ...prevState,
                    eemail: "",
                  }));
                }}
              />
            </div>
            <span
              className="error mb-3"
              style={{
                color: "red",
                visibility: errors.eemail.length > 0 ? "visible" : "hidden",
              }}
            >
              {errors.eemail}
            </span>
          </div>
          <div className="form-row ">
            <div className="col">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prevState) => ({
                    ...prevState,
                    epassword: "",
                  }));
                }}
              />
              <span
                className="error mb-3"
                style={{
                  color: "red",
                  visibility:
                    errors.epassword.length > 0 ? "visible" : "hidden",
                }}
              >
                {errors.epassword}
              </span>
            </div>
            <div className="col">
              <input
                type="password"
                className="form-control "
                placeholder="Confirm Password"
                onChange={(e) => {
                  setCPassword(e.target.value);
                  setErrors((prevState) => ({
                    ...prevState,
                    ecpassword: "",
                  }));
                }}
              />
              <span
                className="error mb-3"
                style={{
                  color: "red",
                  visibility:
                    errors.ecpassword.length > 0 ? "visible" : "hidden",
                }}
              >
                {errors.ecpassword}
              </span>
            </div>
          </div>
          <small className="form-text text-muted mb-3">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </small>

          <div className="form-row">
            <div className="col">
              <div className="input-group-prepend">
                <span className="input-group-text">Gender</span>
              </div>
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="input-group-append">
                  <span className="input-group-text">Male</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="input-group-append">
                  <span className="input-group-text">Female</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="input-group-append">
                  <span className="input-group-text">Other</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">DOB</span>
                </div>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  onChange={(e) => {
                    setDOB(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Marital status</span>
                  </div>
                  <select
                    className="form-control"
                    id="gender"
                    onChange={(e) => {
                      setMstatus(e.target.value);
                    }}
                  >
                    <option></option>
                    <option>Single</option>
                    <option>Married</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Address"
              required
              autoComplete="off"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className="form-row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                required
                autoComplete="off"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="State"
                required
                autoComplete="off"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                required
                autoComplete="off"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">+91</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile"
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-success btn-block" type="submit">
            Register
          </button>
        </form>
      </FormContainer>
    </React.Fragment>
  );
};

export default SignUp;
