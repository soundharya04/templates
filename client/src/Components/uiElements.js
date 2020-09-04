import React from "react";
export const FormContainer = (props) => (
  <div
    className="form-container text-black"
    style={{
      ...props.formStyle,
    }}
  >
    {props.children}
  </div>
);
