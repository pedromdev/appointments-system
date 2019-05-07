import React from "react";
import Translate from "../components/Translate/Translate";

const minLength = (min) => (value) => {
  const valid = value.length >= min;

  return {
    valid,
    type: 'minLength',
    message: !valid ? <Translate content="form.validators.minLength" with={{ min }}/> : null
  }
};

export default minLength;