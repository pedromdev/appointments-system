import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index';
import Card from '@material-ui/core/Card/index';
import CardContent from '@material-ui/core/CardContent/index';
import CardMedia from '@material-ui/core/CardMedia/index';
import Typography from '@material-ui/core/Typography/index';
import WidgetStyles from '../../styles/Widget';

const ImageStatCard = (props) => {
  const { classes, title, image, imageHeight, stats } = props;
  return (
    <Card>
      <CardMedia
        title={title}
        image={image}
        className={classes.media}
        style={{paddingTop: imageHeight}}
      />
      <CardContent className={classes.content}>
        <Grid
          container
          spacing={0}
          alignItems={'center'}
          direction={'row'}
          justify={'space-between'}
        >
          { stats.map((stat, index) => (
            <Grid item xs className={classes.center} key={index} >
              <Typography variant="title" gutterBottom>{stat.value}</Typography>
              <Typography variant="caption">{stat.title}</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

ImageStatCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.number
    })
  ).isRequired
};

export default withStyles(WidgetStyles)(ImageStatCard);