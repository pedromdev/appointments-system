import React from "react";
import Translate from "../components/Translate/Translate";

const notEmpty = () => (value) => {
  const valid = value !== null && !isNaN(value) ? true : !!value;

  return {
    valid,
    type: 'required',
    message: !valid ? <Translate content="form.validators.notEmpty" /> : null
  }
};

export default notEmpty;