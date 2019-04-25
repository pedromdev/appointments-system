import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import Card from '@material-ui/core/Card/index';
import CardContent from '@material-ui/core/CardContent/index';
import Button from '@material-ui/core/Button/index';
import FormControlLabel from '@material-ui/core/FormControlLabel/index';
import TextField from '@material-ui/core/TextField/index';
import Checkbox from '@material-ui/core/Checkbox/index';
import Typography from '@material-ui/core/Typography/index';
import { Link } from 'react-router-dom';
import SessionStyles from '../../styles/Session';
import {signup} from "../../ducks/auth";

const Signup = (props) => {
  const { classes } = props;
  const [formData, setFormData] = useState({});
  const useChangeField = name => e => {
    setFormData({
      ...formData,
      [name]: !!e.target.value ? e.target.value : undefined
    })
  };

  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form onSubmit={e => {
                e.preventDefault();
                props.signup(formData);
              }}>
                <div className="text-xs-center pb-xs">
                  {/*<img src="/static/images/logo-dark.svg" alt=""/>*/}
                </div>
                <TextField
                  id="name"
                  label="Name"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  onChange={useChangeField('name')}
                />
                <TextField
                  id="email"
                  label="Email address"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  onChange={useChangeField('email')}
                />
                <TextField
                  id="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                  onChange={useChangeField('password')}
                />
                <TextField
                  id="cpassword"
                  label="Confirm Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="checkedA"
                      required
                    />
                  }
                  label="I have read and agree to the terms of service."
                  className={classes.fullWidth}
                />
                <Button variant="contained" color="primary" fullWidth type="submit">Create your account</Button>
                <div className="pt-1 text-xs-center">
                  <Link to="/forgot">
                    <Button>Forgot password?</Button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/signin">
                    <Button>Access your account.</Button>
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
  connect(null, { signup })(Signup)
);