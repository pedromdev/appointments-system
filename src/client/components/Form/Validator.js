import React, {useState} from 'react';
import * as PropTypes from 'prop-types';

import FormContext from './FormContext'

const Validator = (props) => {
  const [value, setValue] = useState(null);
  const [onChangeListeners, setOnChangeListeners] = useState([]);
  return (
    <FormContext.Consumer>
      {handlers => {
        handlers.onSubmit((e) => {
          for (var i in props.validators) {
            let result = props.validators[i](
              value,
              props.children.props.name
            );

            if (!result.valid) {
              return handlers.addError(props.children.props.name, result.type, result.message);
            }

            handlers.addError(props.children.props.name, undefined);
          }
        }, props.children, (handler) => setOnChangeListeners([
          ...onChangeListeners,
          handler
        ]));

        let additionalProps = {};

        props.validators.forEach(validator => {
          const validatorProps = validator.additionalProps;
          additionalProps = {
            ...additionalProps,
            ...validatorProps,
          }
        });

        return <props.children.type {...props.children.props} {...additionalProps} onChange={e => {
          if (props.children.props.onChange instanceof Function) {
            props.children.props.onChange(e);
          }
          setValue(e.target.value);
          // onChangeListeners.forEach(handler => handler(e));
        }} />
      }}
    </FormContext.Consumer>
  );
};

Validator.propTypes = {
  validators: PropTypes.arrayOf(PropTypes.func).isRequired,
  children: PropTypes.element.isRequired
};

export default Validator;