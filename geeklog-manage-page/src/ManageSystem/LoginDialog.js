import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import {
  withStyles
} from '@material-ui/core';


const styles = theme => ({
  fontSize24: {
    fontSize: 24,
  },
});

class LoginDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onLoginDialogClose: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLoginMessage: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    password: '',
  };

  handleUserNameInputChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordInputChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = () => {
    axios.post('http://47.106.158.254/admin/login', {
      "username": this.state.username,
      "password": this.state.password,
    })
      .then(res => {
        console.log(res)
        if (res.data.code === 200 && res.data.data) {
          this.props.onLogin(this.state.username, res.data.data.token);
          this.props.onLoginMessage(`管理员: ${this.state.username}, 欢迎!`)
          this.props.onLoginDialogClose();
        }
        else {
          this.props.onLoginMessage(res.data.message)
          this.props.onLoginDialogClose();
          console.log('Error: login fail, ' + res.data.message)
        }
      })
      .catch(err => {
        this.props.onLoginDialogClose();
        console.log(err)
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onLoginDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle
            color="primary"
            className={classes.fontSize24}
            id="form-dialog-title">
            管理员登录
          </DialogTitle>
          <DialogContent>
            <TextField
              className={classes.fontSize24}
              color="primary"
              fullWidth
              id="username-input"
              label="用户名"
              value={this.state.username}
              onChange={e => this.handleUserNameInputChange(e)}
              margin="normal"
            />
            <TextField
              className={classes.fontSize24}
              color="primary"
              fullWidth
              id="password-input"
              label="密码"
              type="password"
              autoComplete="current-password"
              onChange={e => this.handlePasswordInputChange(e)}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.fontSize24}
              onClick={this.props.onLoginDialogClose}
              color="primary">
              取消
            </Button>
            <Button
              className={classes.fontSize24}
              onClick={this.handleLogin}
              color="primary">
              登录
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(LoginDialog);