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

class MsgBar extends Component {
  static propTypes = {
    message: PropTypes.string,
    classes: PropTypes.object.isRequired,
    display: PropTypes.bool.isRequired,
  }

  render() {
    const { classes, display, message } = this.props;

    return (!display
      ?
      <div></div>
      :
      (
        <div>
          <Paper>
            <Typography
              color="primary"
              className={classes.title}
              variant="display1">
              {message}
            </Typography>
          </Paper>
        </div>
      )
    )
  }

}

export default withStyles(styles)(MsgBar);