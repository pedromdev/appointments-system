import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

const Signin = (props) => {
  const { classes } = props;
  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form>
                <div className="text-xs-center pb-xs">
                  <img src="/static/images/logo-dark.svg" alt=""/>
                  <Typography variant="caption">Sign in with your app id to continue.</Typography>
                </div>
                <TextField
                  id="username"
                  label="Username"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="checkedA"
                    />
                  }
                  label="Stayed logged in"
                  className={classes.fullWidth}
                />
                <Button variant="contained" color="primary" fullWidth type="submit">Login</Button>
                <div className="pt-1 text-md-center">
                  <Link to="/forgot">
                    <Button>Forgot password?</Button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/signup">
                    <Button>Create new account.</Button>
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

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(SessionStyles)(Signin);