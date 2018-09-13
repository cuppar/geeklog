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
  PinkButton,
} from '../utils/Buttons'
import axios from 'axios'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'



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
    width: 100,
    height: 100,
    backgroundColor: 'yellow',
    color: 'red',
    fontSize: 80,
  },
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
    axios.defaults.timeout = 3000;
    axios.defaults.baseURL = 'http://47.106.158.254/';
  }

  static propTypes = {
    article: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }

  state = {
    auther: null,
    resMsg: null, // response of ajax post forbidden
    isDeleted: false,
    confirmDeleteDialogOpen: false,
    articleDisplay: this.props.article.display,
  }

  // init auther state
  componentDidMount = () => {
    axios.get(`/users/${this.props.article.user_id}`)
      .then(res => {
        if (res.data && res.data.code === 200 && res.data.data) {
          this.setState({
            auther: res.data.data,
          });
        } else {
          console.log('Fail: GET /users/${this.props.article.user_id}')
          console.log(res)
        }
      })
      .catch(err => {
        console.log('Fail: GET /users/${this.props.article.user_id}')
        console.log(err)
      })
  }

  // res the comment manage button click
  handleCommentManageButtonClick = () => {

  }

  // res the delete article button click
  handleDeleteArticleButtonClick = () => {
    this.setState({
      confirmDeleteDialogOpen: true,
    });
  }

  // res the confirm delete dialog close
  handleConfirmDeleteDialogClose = () => {
    this.setState({
      confirmDeleteDialogOpen: false,
    });
  }

  // res the confirmed delete article req
  handleConfirmedDeleteArticle = () => {
    axios.delete(`/admin/articles/${this.props.article.article_id}`)
      .then(res => {
        console.log(res)
        if (res.data && res.data.code === 200 && res.data.data) {
          this.setState(preState => ({
            resMsg: res.data.message,
            isDeleted: true,
          }));
        } else if (res.data) {
          this.setState({
            resMsg: res.data.code + ': ' + res.data.message,
          });
        } else {
          console.log(
            `Fail: delete /admin/articles/${this.props.article.article_id}`)
          console.log(res)
        }
      })
      .catch(err => {
        if (err.data) {
          this.setState({
            resMsg: err.toString(),
          });
          console.log(
            `Fail: delete /admin/articles/${this.props.article.article_id}`)
        } else {
          this.setState({
            resMsg: err.toString(),
          });
          console.log(
            `Fail: delete /admin/articles/${this.props.article.article_id}`)
        }
      })
    this.handleConfirmDeleteDialogClose()
  }

  // res the toggle article's display attribute
  toggleDisplayArticle = (display) => {
    axios.put(`/admin/articles/${this.props.article.article_id}`, {
      display: display,
    })
      .then(res => {
        if (res.data && res.data.code === 200 && res.data.data) {
          this.setState({
            articleDisplay: display,
            resMsg: display
              ? `设置文章显示: ${res.data.message}`
              : `设置文章隐藏: ${res.data.message}`,
          });
        } else if (res.data) {
          this.setState({
            resMsg: res.data.message,
          });
        } else {
          this.setState({
            resMsg: display ? '修改为显示的操作失败' : '修改为隐藏的操作失败',
          });
        }
      })
      .catch(err => {
        this.setState({
          resMsg: err.toString(),
        });
      })
  }

  render() {
    const { classes, article } = this.props;
    const { auther, confirmDeleteDialogOpen, articleDisplay } = this.state;

    // auther's avatar
    let avatar = auther && auther.avatar ?
      <Avatar
        className={classes.avatar}
        alt={auther.nickname}
        src={auther.avatar}></Avatar>
      :
      <Avatar
        className={classes.avatar}
      >{auther ? auther.nickname[0].toUpperCase() : 'A'}</Avatar>

    // delete article button
    let deleteArticleButton = (
      <DangerButton
        onClick={() => this.handleDeleteArticleButtonClick()
        }>
        删除
      </DangerButton >)

    // display / hidden article button
    let displayArticleButton = articleDisplay ?
      <DangerButton
        onClick={() => this.toggleDisplayArticle(false)}
      >
        隐藏
      </DangerButton>
      :
      <PrimaryButton
        onClick={() => this.toggleDisplayArticle(true)}
      >
        显示
      </PrimaryButton>;

    // display response message
    let msgBar = this.state.resMsg ? (
      <Paper className={classes.paper}>
        <Typography color="primary" variant="title">
          {this.state.resMsg}
        </Typography>
      </Paper>
    )
      :
      <div></div>;

    return (
      this.state.isDeleted ? <div>{msgBar}</div> :
        <div>
          <MuiThemeProvider theme={theme}>
            <Paper className={classes.paper}>
              <Grid
                container
                alignItems="center"
                spacing={16}
                wrap="nowrap"
              >

                {/* avatar */}
                <Grid item xs={2}>
                  {avatar}
                </Grid>

                {/* article title, createdAt and auther */}
                <Grid
                  className={classes.grow}
                  item
                  container
                  direction="column"
                  spacing={16}
                  zeroMinWidth
                >
                  <Grid item>
                    <Typography color="primary" variant="display1">
                      {article.title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="secondary" variant="title">
                      {`创建时间: ${article.created_at}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="secondary" variant="title">
                      {auther ? `作者: ${auther.nickname}` : '作者: '}
                    </Typography>
                  </Grid>
                </Grid>

                {/* comment manage */}
                <Grid item container spacing={16}>
                  <Grid item>
                    <PinkButton
                      onClick={() => this.handleCommentManageButtonClick()}
                    >
                      评论管理
                  </PinkButton>
                  </Grid>
                </Grid>

                {/* delete / hidden article */}
                <Grid item container direction="column" spacing={16}>

                  {/* delete article */}
                  <Grid item alignItems="center" container spacing={16}>
                    <Grid item xs={6}>
                      <Typography variant="title" color="primary">
                        删除文章
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {deleteArticleButton}
                    </Grid>
                  </Grid>

                  {/* hidden article */}
                  <Grid item alignItems="center" container spacing={16}>
                    <Grid item xs={6}>
                      <Typography variant="title" color="primary">
                        隐藏/显示
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {displayArticleButton}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            {msgBar}
            <ConfirmDeleteDialog
              open={confirmDeleteDialogOpen}
              onConfirmDeleteDialogClose={this.handleConfirmDeleteDialogClose}
              onConfirmedDeleteArticle={this.handleConfirmedDeleteArticle}
              confirmedArticleTitle={article.title}
            />
          </MuiThemeProvider>
        </div>
    )
  }
}

export default withStyles(styles)(UserListItem);
