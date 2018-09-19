import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
  Paper,
} from '@material-ui/core'
import classNames from 'classnames'
import ArticlePagination from './ArticlePagination'
import CategorySelecter from '../utils/CategorySelecter'
import axios from 'axios'


const styles = theme => ({
  fullWidthAndCenter: {
    width: '100%',
    textAlign: 'center',
  },
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
    categoryId: '',
    total: 0,
    page: 0,
    rowsPerPage: 5,
    articleAndAuthors: null,
  }

  componentWillUnmount = () => {
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    source.cancel()
  }

  // change the article category
  handleChangeArticleCategory = (categoryId) => {
    this.handleGetArticles(
      this.state.page,
      this.state.rowsPerPage,
      categoryId,
    )
  }

  handleChangePage = (event, page) => {
    this.handleGetArticles(
      page,
      this.state.rowsPerPage,
      this.state.categoryId,
    )
  }

  handleChangeRowsPerPage = (rowsPerPage) => {
    this.handleGetArticles(
      this.state.page,
      rowsPerPage,
      this.state.categoryId,
    )
  }


  handleGetArticles = (page, rowsPerPage, categoryId) => {
    this.setState({
      articleAndAuthors: [],
    })
    axios.get(
      `/admin/articles?category_id=${categoryId}&page=${page + 1}&size=${rowsPerPage}`)
      .then(res => {
        if (res.data && res.data.code === 200 && res.data.data) {
          console.log(res)
          res.data.data.entities.forEach(article => {
            axios.get(`/users/${article.user_id}`)
              .then(res => {
                if (res.data && res.data.code === 200 && res.data.data) {
                  this.setState(preState => ({
                    articleAndAuthors: preState.articleAndAuthors.concat({
                      article: article,
                      author: res.data.data,
                    })
                  }))
                } else {
                  console.log(`Fail: GET /users/${article.user_id}`)
                  console.log(res.data)
                }
              })
              .catch(err => {
                console.log(`Fail: GET /users/${article.user_id}`)
                console.log(err)
              })
          });
          this.setState({
            total: res.data.data.total,
            categoryId: String(categoryId),
            page: page,
            rowsPerPage: rowsPerPage,
          })
        } else if (res.data) {
          console.log(`Fail: GET /admin/articles?category_id=${categoryId}&page=${page + 1}&size=${rowsPerPage}`)
          console.log(res.data.message)
          console.log(res)
        } else {
          console.log(`Fail: GET /admin/articles?category_id=${categoryId}&page=${page + 1}&size=${rowsPerPage}`)
          console.log(res)
        }
      })
      .catch(err => {
        console.log(`Fail: GET /admin/articles?category_id=${categoryId}&page=${page + 1}&size=${rowsPerPage}`)
        console.log(err)
      })
  }

  render() {
    const { classes, token } = this.props;
    const { categoryId, total, page, rowsPerPage, articleAndAuthors } = this.state;
    console.log('categoryId in ArticleManagePanel: ' + categoryId)

    let articleList = categoryId !== ''
      ?
      <ArticlePagination
        token={token}
        categoryId={categoryId}
        rows={articleAndAuthors}
        total={total}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      :
      <Typography
        color="primary"
        variant="display2"
        className={classes.fullWidthAndCenter}
      >
        请选择文章类别
      </Typography>

    return (
      <div className={classNames({
        [classes.root]: true
      })}>
        <MuiThemeProvider theme={theme}>
          <Paper>
            <Typography
              color="primary"
              className={classes.fullWidthAndCenter}
              variant="display1">
              文章管理
            </Typography>
          </Paper>

          {/* category selecter */}
          <CategorySelecter
            categoryId={categoryId}
            onChangeArticleCategory={this.handleChangeArticleCategory}
            token={token}
          />

          {/* article list */}
          {articleList}

        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(ArticleManagePanel);