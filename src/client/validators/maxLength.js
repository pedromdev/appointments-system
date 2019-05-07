import React from "react";
import Translate from "../components/Translate/Translate";

const maxLength = (max) => (value) => {
  const valid = value.length <= max;

  return {
    valid,
    type: 'maxLength',
    message: !valid ? <Translate content="form.validators.maxLength" with={{ max }} /> : null
  }
};

export default maxLength;