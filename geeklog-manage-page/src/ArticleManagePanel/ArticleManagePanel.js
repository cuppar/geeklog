import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import classNames from 'classnames'
import ArticlePagination from './ArticlePagination'


const styles = theme => ({
  root: {
    // color: "red"
  }
});

const theme = createMuiTheme({
  // palette: {
  //     primary: {
  //       main: "#0000ff",
  //     },
  //   secondary: {
  //     main: "#FE6B8B",
  //   }
  // }
});

class ArticleManagePanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }

  state = {
    categoryId: 1,
  }

  render() {
    const { classes } = this.props;
    const { categoryId } = this.state;

    return (
      <div className={classNames({
        [classes.root]: true
      })}>
        <MuiThemeProvider theme={theme}>
          <Typography
            color="primary"
            variant="display4">
            ArticleManagePanel
          </Typography>
          <ArticlePagination
            token={this.props.token}
            categoryId={categoryId}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(ArticleManagePanel);