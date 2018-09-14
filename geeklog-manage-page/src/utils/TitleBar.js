import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  withStyles,
  Paper,
} from '@material-ui/core'

const styles = theme => ({
  title: {
    width: '100%',
    textAlign: 'center',
  }
});

class TitleBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper>
          <Typography
            color="primary"
            className={classes.title}
            variant="display1">
            {title}
          </Typography>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(TitleBar);