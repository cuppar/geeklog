import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    color: "red"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0000ff",
    },
    secondary: {
      main: "#FE6B8B",
    }
  }
});

class WelcomeManagePanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes, location } = this.props;
    return (
      <div className={classNames({
        [classes.root]: true
      })}>
        <MuiThemeProvider theme={theme}>
          <Typography
            color="primary"
            variant="title">
            {location.state && location.state.login ? 'login ok' : 'sorry, please login.'}
          </Typography>
          <div>
            styled text
            <br />
            {`root: { color: "red" }`}
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(WelcomeManagePanel);