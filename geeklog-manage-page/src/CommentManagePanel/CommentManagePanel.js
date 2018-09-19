import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import classNames from 'classnames'
import axios from 'axios'
import CommentPagination from './CommentPagination';
import TitleBar from '../utils/TitleBar';
import ArticleInfo from './ArticleInfo';


const styles = theme => ({

});

const theme = createMuiTheme({

});

class ArticleManagePanel extends Component {
  constructor(props) {
    super(props)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.baseURL = 'http://47.106.158.254/';
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }

  state = {
    total: '0',
    page: '0',
    rowsPerPage: '5',
    commentAndAuthors: [],
    article: {
      "article_id": 1,
      "title": "文章标题",
      "created_at": 12211033,
      "modified_at": 16125652,
      "content": "文章内容",
      "user_id": 1,
      "category_id": 2,
      "tags": "java,python,sql",
      "display": true
    },
  }


  handleChangePage = (page) => {
    this.getRows(this.props.match.params.article_id, page, this.state.rowsPerPage)
  }

  handleChangeRowsPerPage = (rowsPerPage) => {
    this.getRows(this.props.match.params.article_id, this.state.page, rowsPerPage)
  }


  componentWillMount = () => {
    this.getRows(this.props.match.params.article_id, this.state.page, this.state.rowsPerPage)
    axios.get(`/admin/articles/${this.props.match.params.article_id}`)
      .then(res => {
        if (res.data && res.data.code === 200 && res.data.data) {
          this.setState({
            article: res.data.data,
          })
        } else if (res.data) {
          console.log(`Fail: get /admin/articles/${this.props.match.params.article_id}`)
          console.log(res.data.code + ': ' + res.data.message)
        } else {
          console.log(`Fail: get /admin/articles/${this.props.match.params.article_id}`)
          console.log(res)
        }
      })
      .catch(err => {
        console.log(`Fail: get /admin/articles/${this.props.match.params.article_id}`)
        console.log(err)
      })
  }

  componentWillUnmount = () => {
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    source.cancel()
  }

  getRows = (articleId, page, rowsPerPage) => {
    this.setState({
      commentAndAuthors: [],
    })
    axios.get(`/admin/comments?article_id=${articleId}&page=${Number(page)+1}&size=${rowsPerPage}`)
      .then(res => {
        if (res.data && res.data.code === 200 && res.data.data) {
          this.setState({
            total: String(res.data.data.total),
            rowsPerPage: String(rowsPerPage),
            page: String(page),
          })
          res.data.data.entities.forEach(comment => {
            axios.get(`/users/${comment.user_id}`)
              .then(res => {
                if (res.data && res.data.code === 200 && res.data.data) {
                  this.setState(preState => ({
                    commentAndAuthors: preState.commentAndAuthors.concat({
                      comment: comment,
                      author: res.data.data,
                    }),
                  }))
                } else if (res.data) {
                  console.log(`Fail: get /users/${comment.user_id}`)
                  console.log(res.data.code + ': ' + res.data.message)
                } else {
                  console.log(`Fail: get /users/${comment.user_id}`)
                  console.log(res)
                }
              })
              .catch(err => {
                console.log(`Fail: get /users/${comment.user_id}`)
                console.log(err)
              })
          })

        } else if (res.data) {
          console.log(`Fail: get /admin/comments?article_id=${articleId}&page=${Number(page)+1}&size=${rowsPerPage}`)
          console.log(res.data.code + ': ' + res.data.message)
        } else {
          console.log(`Fail: get /admin/comments?article_id=${articleId}&page=${Number(page)+1}&size=${rowsPerPage}`)
          console.log(res)
        }
      })
      .catch(err => {
        console.log(`Fail: get /admin/comments?article_id=${articleId}&page=${Number(page)+1}&size=${rowsPerPage}`)
        console.log(err)
      })
  }

  render() {
    const { classes, token } = this.props;
    const { article, total, page, rowsPerPage, commentAndAuthors } = this.state;

    return (
      <div className={classNames({
        [classes.root]: true
      })}>
        <MuiThemeProvider theme={theme}>
          <TitleBar title="评论管理"></TitleBar>

          {/* article content */}
          <Typography>原文章:</Typography>
          <ArticleInfo article={article}></ArticleInfo>

          {/* comment pagination */}
          <Typography>评论列表:</Typography>
          <CommentPagination
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            token={token}
            page={page}
            rowsPerPage={rowsPerPage}
            total={total}
            rows={commentAndAuthors}
          ></CommentPagination>

        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(ArticleManagePanel);