import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArticleListItem from './ArticleListItem';
import axios from 'axios'

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class ArticlePagination extends React.Component {
  constructor(props) {
    super(props)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.timeout = 3000;
    axios.defaults.baseURL = 'http://47.106.158.254/';
  }

  state = {
    total: 0,
    page: 0,
    rowsPerPage: 5,
    rows: [],
  };

  handleGetRows = (page, rowsPerPage) => {
    this.setState({
      rows: [],
    });
    axios.get(
      `/admin/articles?category_id=${this.props.categoryId}&page=${page + 1}&size=${rowsPerPage}`)
      .then(res => {
        if (res.data && res.data.code === 200 && res.data.data) {
          console.log(res)
          this.setState({
            page: page,
            rowsPerPage: rowsPerPage,
            total: res.data.data.total,
            rows: res.data.data.entities,
          })
        } else if (res.data) {
          console.log(`Fail: GET /admin/articles?category_id=${this.props.categoryId}&page=${page + 1}&size=${rowsPerPage}`)
          console.log(res.data.message)
          console.log(res)
        } else {
          console.log(`Fail: GET /admin/articles?category_id=${this.props.categoryId}&page=${page + 1}&size=${rowsPerPage}`)
          console.log(res)
        }
      })
      .catch(err => {
        console.log(`Fail: GET /admin/articles?category_id=${this.props.categoryId}&page=${page + 1}&size=${rowsPerPage}`)
        console.log(err)
      })
  }

  componentDidMount = () => {
    this.handleGetRows(this.state.page, this.state.rowsPerPage)
  }

  handleChangePage = (event, page) => {
    this.handleGetRows(page, this.state.rowsPerPage)
  };

  handleChangeRowsPerPage = event => {
    this.handleGetRows(0, event.target.value)
  };

  render() {
    const { classes, token } = this.props;
    const { rows, rowsPerPage, page, total } = this.state;
    const emptyRows = rows ? rowsPerPage - rows.length : rowsPerPage;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {rows ? rows.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <ArticleListItem
                        article={row}
                        token={token}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
                :
                <TableRow>
                  <TableCell>
                    {'Error'}
                  </TableCell>
                </TableRow>
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 200 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

ArticlePagination.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
};

export default withStyles(styles)(ArticlePagination);
