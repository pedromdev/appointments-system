import React, {useState, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';

import FormContext from './FormContext';
import {connect} from "react-redux";
import {addError, updateValidationErrors} from "../../ducks/validationErrors";

const Form = (props) => {
  const [submitted, isSubmitted] = useState(false);
  const [submitListeners, setSubmitListeners] = useState([]);
  const [fields, setFields] = useState([]);
  const dispatchValidators = (e) => {
    submitListeners.forEach(listener => listener(e));
  };
  const handlers = {
    addError(path, type, message) {
      props.addError({ path, type, message });
    },
    onSubmit(listener, field) {
      if (fields.filter(f => f === field).length) return;
      setFields([ ...fields, field ]);
      setSubmitListeners([ ...submitListeners, listener ]);
    }
  };

  useEffect(() => {
    if (props.errors.length === 0) {
      if (submitted) props.onSubmit();

      return;
    }

    let errors = {};

    props.errors.forEach(error => errors[error.path] = error.message);
    props.onError(errors)
  }, [props.errors, submitted]);

  return (
    <form {...props} onSubmit={e => {
      e.preventDefault();
      dispatchValidators(e);
      isSubmitted(true);
    }}>
      <FormContext.Provider value={handlers}>
        {props.children}
      </FormContext.Provider>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  onError: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: () => {},
  onError: () => {},
};

export default connect(
  state => ({
    errors: state.validationErrors.fields ? state.validationErrors.fields : []
  }), {
    addError
  }
)(Form);