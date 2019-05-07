import React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles/index';

import LogoStyles from '../../styles/LogoStyles';

const Logo = (props) => (
  <h1 className={props.classes.logo}>
    <span className={classnames({
      [props.classes.appText]: props.type !== 'black-white',
      [props.classes.bwAppText]: props.type === 'black-white',
    })}>App</span>
    <span className={classnames({
      [props.classes.ointmentsText]: props.type === 'normal',
      [props.classes.inverseOintmentsText]: props.type !== 'normal',
    })}>ointments</span>
  </h1>
);

Logo.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf([
    'normal',
    'inverse',
    'black-white'
  ])
};

Logo.defaultProps = {
  type: 'normal'
};

export default withStyles(LogoStyles)(Logo);