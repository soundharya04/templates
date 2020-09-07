import React from "react";
import { add_user } from "../Store/Actions";
import { connect } from "react-redux";

const Register = () => {
  const [state, setState] = React.useState({
    uname: "",
    pass: "",
    cpass: "",
    email: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    address: "",
    city: "",
    state: "",
    country: "",
    mobile: "",
  });
  const [err, setErr] = React.useState({
    uname: "",
    pass: "",
    cpass: "",
    email: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    address: "",
    city: "",
    state: "",
    country: "",
    mobile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = state;

    let count = 0;
    Object.values(err).forEach((val) => val.length > 0 && (count = count + 1));
    console.log(err, count);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <div className="display-4 text-center">Register</div>
        <div className="blockquote text-center">
          Please fill in the form and register here to gain access.
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={state.uname}
                onChange={(e) => {
                  const data = e.target.value;
                  if (
                    data.trim().length < 8 ||
                    data.trim().length > 16 ||
                    data.trim().length === 0
                  ) {
                    console.log("not valid");
                    setErr({ ...err, uname: "Please enter a valid username" });
                  } else {
                    setErr({ ...err, uname: "" });
                  }
                  setState({ ...state, uname: data });
                }}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                Username should be 8-16 letters long.
              </small>
              <div className="valid-feedback">{err.uname}</div>
            </div>
            <div className="form-group col">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
              <div className="valid-feedback">{err.email}</div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={state.pass}
                onChange={(e) => {
                  const data = e.target.value;
                  if (
                    data.trim().length <= 8 ||
                    data.trim().length >= 20 ||
                    data.trim().length === 0
                  ) {
                    setErr({ ...err, pass: "Please enter a valid password" });
                  } else {
                    setErr({ ...err, pass: "" });
                  }
                  setState({ ...state, pass: data });
                }}
                required
              />
              <small id="passHelp" className="form-text text-muted">
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </small>
              <div className="valid-feedback">{err.pass}</div>
            </div>
            <div className="form-group col">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={state.cpass}
                onChange={(e) => {
                  const data = e.target.value;
                  if (data !== state.pass) {
                    setErr({ ...err, cpass: "Password doesn't match" });
                  } else {
                    setErr({ ...err, cpass: "" });
                  }
                  setState({ ...state, cpass: data });
                }}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                Please enter the same password to match.
              </small>
              <div className="valid-feedback">{err.cpass}</div>
            </div>
          </div>
          <div className="row" style={{ alignItems: "center" }}>
            <div
              className="form-group col"
              onChange={(e) => setState({ ...state, gender: e.target.value })}
            >
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadioInline1"
                  name="customRadioInline1"
                  className="custom-control-input"
                  value="male"
                  defaultChecked={state.gender === "male"}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline1"
                >
                  Male
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadioInline2"
                  name="customRadioInline1"
                  className="custom-control-input"
                  value="female"
                  defaultChecked={state.gender === "female"}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline2"
                >
                  Female
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadioInline3"
                  name="customRadioInline1"
                  className="custom-control-input"
                  value="others"
                  defaultChecked={state.gender === "others"}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline3"
                >
                  Others
                </label>
              </div>
              <div className="valid-feedback">{err.gender}</div>
            </div>

            <div className="form-group col">
              <input
                type="date"
                className="form-control"
                value={state.dob}
                onChange={(e) => setState({ ...state, dob: e.target.value })}
                required
              />
              <div className="valid-feedback">{err.dob}</div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={state.address}
                onChange={(e) =>
                  setState({ ...state, address: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                value={state.city}
                onChange={(e) => setState({ ...state, city: e.target.value })}
              />
              <div className="valid-feedback">{err.city}</div>
            </div>
            <div className="form-group col">
              <input
                type="text"
                className="form-control"
                placeholder="State"
                value={state.state}
                onChange={(e) => setState({ ...state, state: e.target.value })}
              />
              <div className="valid-feedback">{err.state}</div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                value={state.country}
                onChange={(e) =>
                  setState({ ...state, country: e.target.value })
                }
              />
              <div className="valid-feedback">{err.country}</div>
            </div>
            <div className="form-group col">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">+91</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile"
                  value={state.mobile}
                  onChange={(e) =>
                    setState({ ...state, mobile: e.target.value })
                  }
                  required
                />
                <div className="valid-feedback">{err.mobile}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <input
              type="submit"
              className="btn btn-success mx-auto"
              value="Register"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { add_user })(Register);
