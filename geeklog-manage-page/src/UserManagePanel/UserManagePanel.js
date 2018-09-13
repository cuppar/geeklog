import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import classNames from 'classnames'
import UserListItem from './UserListItem'
import UserPagination from './UserPagination'

const styles = theme => ({
  root: {
    color: "red"
  }
});

class UserManagePanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classNames({
        [classes.root]: true
      })}>
        <Typography
          color="primary"
          variant="display4">
          UserManagePanel
        </Typography>
        <UserPagination
          token={this.props.token}
        />
      </div>
    )
  }
}

export default withStyles(styles)(UserManagePanel);