import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
  Avatar,
  Grid,
  withStyles,
  Typography,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import {
  PrimaryButton,
  DangerButton,
} from '../utils/Buttons'
import axios from 'axios'


const styles = theme => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    textAlign: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    fontSize: 60,
  },
  bold: {
    fontWeight: 'bold',
  }
});

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#aaaaaa",
    }
  }
});

class UserListItem extends Component {
  constructor(props) {
    super(props)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.baseURL = 'http://47.106.158.254/';
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    writeArticleAuthId: PropTypes.string.isRequired,
    commentAuthId: PropTypes.string.isRequired,
  }

  state = {
    user: this.props.user,
    authResMsg: null, // response of ajax post forbidden
  }

  randomColor = () => {
    let hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
    let rand, hexColor = '#';
    for (let i = 0; i < 6; i++) {
      rand = Math.floor(Math.random() * 16)
      hexColor += hex[rand];
    }
    return hexColor;
  }

  handleForbidden = (authName, authId) => {
    this.setState({
      authResMsg: null,
    });
    axios.post('/admin/forbiddens', {
      "user_id": this.props.user.user_id,
      "authority_id": authId,
    })
      .then(res => {
        // console.log(res)
        let new_user = Object.assign({}, this.state.user, { [authName]: false });
        if (res.data && res.data.code === 200 && res.data.data) {
          this.setState(preState => ({
            authResMsg: res.data.message,
            user: new_user,
          }));
        } else if (res.data) {
          this.setState({
            authResMsg: res.data.code + ': ' + res.data.message,
          });
        } else {
          // console.log('Fail: post /admin/forbiddens ')
          // console.log(res)
        }
      })
      .catch(err => {
        if (err.data) {
          this.setState({
            authResMsg: err.toString(),
          });
          // console.log('Fail: post /admin/forbiddens ')
        } else {
          this.setState({
            authResMsg: err.toString(),
          });
          // console.log('Fail: post /admin/forbiddens ')
        }
      })
  }

  handleAllow = (authName, authId) => {
    this.setState({
      authResMsg: null,
    });
    axios.delete(`/admin/forbiddens/${this.props.user.user_id}/${authId}`)
      .then(res => {
        if (res.data && res.data.code === 200 && res.data.data) {
          let new_user = Object.assign({}, this.state.user, { [authName]: true })
          this.setState({
            authResMsg: res.data.message,
            user: new_user,
          });
        } else if (res.data) {
          // console.log(res.data)
          this.setState({
            authResMsg: res.data.code + ': ' + res.data.message,
          });
        } else {
          // console.log('Fail: delete /admin/forbiddens/:user_id/:authority_id ')
          // console.log(res)
        }
      })
      .catch(err => {
        if (err.data) {
          this.setState({
            authResMsg: err.toString(),
          });
          // console.log('Fail: delete /admin/forbiddens/:user_id/:authority_id ')
        } else {
          this.setState({
            authResMsg: err.toString(),
          });
          // console.log('Fail: delete /admin/forbiddens/:user_id/:authority_id ')
        }
      })
  }

  componentWillUnmount = () => {
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    source.cancel()
  }

  render() {
    const { classes, writeArticleAuthId, commentAuthId } = this.props;
    const { authResMsg, user } = this.state;

    let avatar = user.avatar ?
      <Avatar
        className={classes.avatar}
        alt={user.nickname}
        src={user.avatar}></Avatar>
      :
      <Avatar
        className={classes.avatar}
        style={{
          backgroundColor: this.randomColor(),
          color: this.randomColor(),
        }}
      >
        {user.nickname[1].toUpperCase()}
      </Avatar>


    let articleAuthorityButton = user['can_write_article'] ?
      <DangerButton
        onClick={() => this.handleForbidden(
          'can_write_article',
          writeArticleAuthId
        )
        }>
        禁止
      </DangerButton >
      :
      <PrimaryButton
        onClick={() => this.handleAllow(
          'can_write_article',
          writeArticleAuthId
        )}>
        允许
      </PrimaryButton>;

    let commentAuthorityButton = user['can_comment'] ?
      <DangerButton
        onClick={() => this.handleForbidden(
          'can_comment',
          commentAuthId)}>
        禁止
      </DangerButton>
      :
      <PrimaryButton
        onClick={() => this.handleAllow(
          'can_comment',
          commentAuthId
        )}>
        允许
      </PrimaryButton>;

    let msgBar = authResMsg ? (
      <Paper className={classes.paper}>
        <Typography
          color="primary"
          variant="body1"
          className={classes.bold}
        >
          {authResMsg}
        </Typography>
      </Paper>
    )
      :
      <div></div>;


    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Paper className={classes.paper}>
            <Grid container alignItems="center" spacing={16} wrap="nowrap">
              {/* avatar */}
              <Grid item xs={2}>
                {avatar}
              </Grid>
              {/* user id and username */}
              <Grid
                className={classes.grow}
                item
                container
                direction="column"
                spacing={16}
                zeroMinWidth>
                <Grid item>
                  <Typography
                    variant="title"
                    color="primary"
                    className={classes.bold}
                  >
                    {user.nickname}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    color="secondary"
                    className={classes.bold}
                  >
                    {`用户名: ${user.username}`}
                  </Typography>
                </Grid>
              </Grid>
              {/* authority */}
              <Grid item container direction="column" spacing={16}>
                {/* can write */}
                <Grid item alignItems="center" container spacing={16}>
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      color="primary"
                      className={classes.bold}
                    >
                      发表文章
                     </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {articleAuthorityButton}
                  </Grid>
                </Grid>
                {/* can comment */}
                <Grid item alignItems="center" container spacing={16}>
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      color="primary"
                      className={classes.bold}
                    >
                      发表评论
                     </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {commentAuthorityButton}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          {msgBar}
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(UserListItem);
