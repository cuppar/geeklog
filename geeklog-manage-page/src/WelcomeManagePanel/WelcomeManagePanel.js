import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  blue, red
} from '@material-ui/core/colors'
import {
  Typography,
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import classNames from 'classnames'
import {
  PrimaryButton,
  DangerButton,
  PinkButton,
} from '../utils/Buttons'
import UserListItem from '../UserManagePanel/UserListItem'


const styles = theme => ({
  center: {
    textAlign: 'center',
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});

class WelcomeManagePanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    login: PropTypes.bool.isRequired,
    username: PropTypes.string,
    loginMessage: PropTypes.string,
  }

  render() {
    const { classes, login } = this.props;
    let welcomePanel;

    if (login) {
      welcomePanel = (
        <div>
          <Typography
            className={classes.center}
            color="primary"
            variant="display2">
            {this.props.loginMessage}
          </Typography>
        </div>
      );
    } else {
      welcomePanel = (
        <div>
          <Typography
            className={classes.center}
            color="secondary"
            variant="display2">
            {this.props.loginMessage}
          </Typography>
        </div>
      );
    }

    return (
      <div className={classNames({
        [classes.root]: true
      })}>
        <MuiThemeProvider theme={theme}>
          {welcomePanel}
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(WelcomeManagePanel);