import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import Card from '@material-ui/core/Card/index';
import CardContent from '@material-ui/core/CardContent/index';
import Button from '@material-ui/core/Button/index';
import FormControlLabel from '@material-ui/core/FormControlLabel/index';
import TextField from '@material-ui/core/TextField/index';
import FormHelperText from '@material-ui/core/FormHelperText/index';
import Checkbox from '@material-ui/core/Checkbox/index';
import Typography from '@material-ui/core/Typography/index';
import { Link } from 'react-router-dom';
import SessionStyles from '../../styles/Session';
import {signup} from "../../ducks/auth";
import {validation} from "../../helpers/reduxState";
import Translate from '../../components/Translate/Translate';
import {addError} from "../../ducks/validationErrors";

const Signup = (props) => {
  const { classes } = props;
  const [formData, setFormData] = useState({});
  const [submitted, isSubmitted] = useState(false);
  const useChangeField = name => e => {
    formData[name] = !!e.target.value ? e.target.value : undefined;
    setFormData({ ...formData });
  };
  const errorsFields = props.errors.getFields();

  useEffect(() => {
    if (!submitted) return;
    if (errorsFields.filter(field => field.path === 'cpassword').length > 0) return;

    if (!!formData.cpassword === false) {
      props.addError({
        path: 'cpassword',
        type: 'required',
        message: <Translate content="form.cpassword.error.required"/>
      });
    } else if (formData.cpassword !== formData.password) {
      props.addError({
        path: 'cpassword',
        type: 'notMatch',
        message: <Translate content="form.cpassword.error.notMatch" />
      });
    }
  }, [errorsFields]);

  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form onSubmit={e => {
                e.preventDefault();
                props.signup(formData);
                isSubmitted(true);
              }}>
                <div className="text-xs-center pb-xs">
                  {/*<img src="/static/images/logo-dark.svg" alt=""/>*/}
                </div>
                <TextField
                  id="name"
                  label={<Translate content="form.name.label" />}
                  className={classes.textField}
                  error={props.errors.has('name')}
                  fullWidth
                  margin="normal"
                  onChange={useChangeField('name')}
                />
                {props.errors.has('name') && <FormHelperText error={true}>
                  {props.errors.get('name')}
                </FormHelperText>}
                <TextField
                  id="email"
                  label={<Translate content="form.email.label" />}
                  className={classes.textField}
                  error={props.errors.has('email')}
                  fullWidth
                  margin="normal"
                  onChange={useChangeField('email')}
                />
                {props.errors.has('email') && <FormHelperText error={true}>
                  {props.errors.get('email')}
                </FormHelperText>}
                <TextField
                  id="password"
                  label={<Translate content="form.password.label" />}
                  className={classes.textField}
                  error={props.errors.has('password')}
                  type="password"
                  fullWidth
                  margin="normal"
                  onChange={useChangeField('password')}
                />
                {props.errors.has('password') && <FormHelperText error={true}>
                  {props.errors.get('password')}
                </FormHelperText>}
                <TextField
                  id="cpassword"
                  label={<Translate content="form.cpassword.label" />}
                  className={classes.textField}
                  error={props.errors.has('cpassword')}
                  type="password"
                  fullWidth
                  margin="normal"
                  onChange={useChangeField('cpassword')}
                />
                {props.errors.has('cpassword') && <FormHelperText error={true}>
                  {props.errors.get('cpassword')}
                </FormHelperText>}
                <FormControlLabel
                  control={
                    <Checkbox
                      value="checkedA"
                      required
                    />
                  }
                  label={<Translate content="form.terms.label" />}
                  className={classes.fullWidth}
                />
                <Button variant="contained" color="primary" fullWidth type="submit">
                  <Translate content="form.signup.button" />
                </Button>
                <div className="pt-1 text-xs-center">
                  <Link to="/forgot">
                    <Button>
                      <Translate content="form.forgotPassword.link" />
                    </Button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/signin">
                    <Button>
                      <Translate content="form.signin.link" />
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(SessionStyles)(
  connect(state => ({
    ...validation(state)
  }), {
    addError,
    signup
  })(Signup)
);