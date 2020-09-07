import React, { useState } from "react";
import { FormContainer } from "../Components/uiElements";
import { add_user } from "../Store/Actions";
import { connect } from "react-redux";

const SignUp = (props) => {
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
  const [isValid, setisValid] = useState("");
  const [errors, setErrors] = useState({
    eusername: "",
    eemail: "",
    epassword: "",
    ecpassword: "",
    eaddress: "",
    edob: "",
    egender: "",
    emstatus: "",
    emobile: "",
  });

  const validEmailRegex = RegExp(
    /^(([^<>()[].,;:\s@"]+(\.[^<>()[].,;:\s@"]+)*)|(".+"))@(([^<>()[].,;:\s@"]+.)+[^<>()[].,;:\s@"]{2,})$/i
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
    const cur_date = new Date();
    var user_dob = new Date(dob);
    var phoneno = RegExp(/^\d{10}$/);
    // console.log("value", gender, mstatus);
    if (username.length < 5) {
      setErrors((prevState) => ({
        ...prevState,
        eusername: "Username must be more than 5 characters",
      }));
    }

    if (!validEmailRegex.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        eemail: "Please enter a valid email address",
      }));
    }

    if (password.length < 8) {
      setErrors((prevState) => ({
        ...prevState,
        epassword: "Password must be 8 characters long!",
      }));
    }
    if (password !== Cpassword) {
      setErrors((prevState) => ({
        ...prevState,
        ecpassword: "both the passwords do not match",
      }));
    }
    if (user_dob > cur_date) {
      console.log("date invalid");
      setErrors((prevState) => ({
        ...prevState,
        edob: "Enter valid Date of Birth",
      }));
    }
    if (!phoneno.test(mobile)) {
      setErrors((prevState) => ({
        ...prevState,
        emobile: "Enter valid mobile number",
      }));
    }
    if (gender.length === 0) {
      setErrors((prevState) => ({
        ...prevState,
        egender: "Please select a value",
      }));
    }
    if (mstatus.length === 0) {
      setErrors((prevState) => ({
        ...prevState,
        emstatus: "Please select a value",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await validateFormData();
    await console.log(errors, countErrors(errors));
    // if (Object.values(errors).join("").length == 0) {
    //   props.add_user({
    //     username,
    //     email,
    //     password,
    //     gender,
    //     dob,
    //     mobile,
    //     address,
    //     city,
    //     state,
    //     country,
    //     mstatus,
    //   });
    // }
    // console.log({
    //   username,
    //   email,
    //   password,
    //   Cpassword,
    //   gender,
    //   dob,
    //   mobile,
    //   address,
    //   city,
    //   state,
    //   country,
    //   mstatus,
    // });
  };

  return (
    <React.Fragment>
      <FormContainer
        formStyle={{ marginTop: "3vh", marginBottom: "1vh", width: "60%" }}
      >
        <form onSubmit={handleSubmit}>
          <h5 className="h3 pb-4 text-center">Create your XYZ Account</h5>
          <div className="form-group ">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Username"
              required
              value={username}
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
              className="error"
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
                value={email}
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
                value={password}
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
                value={Cpassword}
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
            Use 8 or more characters for a strong password!!
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
                        setErrors((prevState) => ({
                          ...prevState,
                          egender: "",
                        }));
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
                        setErrors((prevState) => ({
                          ...prevState,
                          egender: "",
                        }));
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
                        setErrors((prevState) => ({
                          ...prevState,
                          egender: "",
                        }));
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
          <span
            className="error mb-3"
            style={{
              color: "red",
              visibility: errors.egender.length > 0 ? "visible" : "hidden",
            }}
          >
            {errors.egender}
          </span>
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
                  value={dob}
                  onChange={(e) => {
                    setDOB(e.target.value);
                    setErrors((prevState) => ({
                      ...prevState,
                      edob: "",
                    }));
                  }}
                ></input>
              </div>
              <span
                className="error mb-3"
                style={{
                  color: "red",
                  visibility: errors.edob.length > 0 ? "visible" : "hidden",
                }}
              >
                {errors.edob}
              </span>
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
                    value={mstatus}
                    onChange={(e) => {
                      setMstatus(e.target.value);
                      setErrors((prevState) => ({
                        ...prevState,
                        emstatus: "",
                      }));
                    }}
                  >
                    <option></option>
                    <option>Single</option>
                    <option>Married</option>
                  </select>
                </div>
              </div>
              <span
                className="error mb-3"
                style={{
                  color: "red",
                  visibility: errors.emstatus.length > 0 ? "visible" : "hidden",
                }}
              >
                {errors.emstatus}
              </span>
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Address"
              required
              autoComplete="off"
              value={address}
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
                value={city}
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
                value={state}
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
                value={country}
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
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    setErrors((prevState) => ({
                      ...prevState,
                      emobile: "",
                    }));
                  }}
                />
              </div>
              <span
                className="error mb-3"
                style={{
                  color: "red",
                  visibility: errors.emobile.length > 0 ? "visible" : "hidden",
                }}
              >
                {errors.emobile}
              </span>
            </div>
          </div>{" "}
          <input
            className="btn btn-success btn-block"
            type="submit"
            value="Register"
          />
        </form>
      </FormContainer>
    </React.Fragment>
  );
};

export default connect(null, { add_user })(SignUp);
