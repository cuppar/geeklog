import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  withStyles,
  Paper,
} from '@material-ui/core'
import classNames from 'classnames'
import UserPagination from './UserPagination'

const styles = theme => ({
  root: {
    color: "red",
  },
  title: {
    width: '100%',
    textAlign: 'center',
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
        <Paper>
          <Typography
            color="primary"
            className={classes.title}
            variant="display1">
            用户管理
        </Typography>
        </Paper>
        <UserPagination
          token={this.props.token}
        />
      </div>
    )
  }
}

export default withStyles(styles)(UserManagePanel);