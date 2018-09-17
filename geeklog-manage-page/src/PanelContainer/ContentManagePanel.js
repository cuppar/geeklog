import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import CommentManagePanel from '../CommentManagePanel/CommentManagePanel';
import ArticleManagePanel from '../ArticleManagePanel/ArticleManagePanel';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'


const styles = theme => ({

});

class PanelContainer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Switch>
        <Route
          path="/content-manage/article"
          render={props => (
            <ArticleManagePanel
              token={this.props.token} />
          )}></Route>
        <Route
          path="/content-manage/comment/:article_id"
          render={props => (
            <CommentManagePanel
              token={this.props.token}
              {...props} />
          )}
        ></Route>
        <Redirect from="*" to="/welcome"></Redirect>
      </Switch>
    );
  }
}

export default withStyles(styles)(PanelContainer);