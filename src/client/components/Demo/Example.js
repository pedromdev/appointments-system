import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import IconButton from '@material-ui/core/IconButton/index';
import Typography from '@material-ui/core/Typography/index';
import Tooltip from '@material-ui/core/Tooltip/index';
import Card from '@material-ui/core/Card/index';
import CardContent from '@material-ui/core/CardContent/index';
import LinkIcon from '@material-ui/icons/Link';

const styles = (theme) => ({
  root: {
    paddingBottom: theme.spacing.unit,
  },
  card: {
    position: 'relative',
    clear: 'both'
  },
  appBar: {
    boxShadow: theme.shadows[0]
  }
});

const Example = (props) => {
  const { classes, index, title, js: DemoComponent, docs } = props;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography color="inherit" className="flexSpacer">{title}</Typography>
            <Tooltip
              id={`${index}`}
              title={'View official documentation'}
              placement="top"
            >
              <IconButton
                onClick={() => window.open(docs, '_blank')}
                aria-labelledby={index}
              >
                <LinkIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <CardContent className={classes.content}>
          <DemoComponent />
        </CardContent>
      </Card>
    </div>
  );
}

Example.prototypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  js: PropTypes.node.isRequired,
  docs: PropTypes.string.isRequired
};

export default withStyles(styles)(Example);
