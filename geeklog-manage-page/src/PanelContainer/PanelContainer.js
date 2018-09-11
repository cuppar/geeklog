import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import WelcomeManagePanel from '../WelcomeManagePanel/WelcomeManagePanel';
import UserManagePanel from '../UserManagePanel/UserManagePanel';
import AddCategoryManagePanel from '../CategoryManagePanel/AddCategoryManagePanel';
import ModifyCategoryManagePanel from '../CategoryManagePanel/ModifyCategoryManagePanel';
import DeleteCategoryManagePanel from '../CategoryManagePanel/DeleteCategoryManagePanel';
import ArticleManagePanel from '../ArticleManagePanel/ArticleManagePanel';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'


const styles = theme => ({

});

class ContentPanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {


    return (
      !this.props.login ?
        <Switch>
          <Route path="/welcome" component={WelcomeManagePanel}></Route>
          <Redirect to="/welcome"></Redirect>
        </Switch>
        :
        <Switch>
          <Route path="/welcome" component={WelcomeManagePanel}></Route>
          <Route path="/user-manage" component={UserManagePanel}></Route>
          <Route path="/category-manage/add" component={AddCategoryManagePanel}></Route>
          <Route path="/category-manage/modify" component={ModifyCategoryManagePanel}></Route>
          <Route path="/category-manage/delete" component={DeleteCategoryManagePanel}></Route>
          <Route path="/article-manage" component={ArticleManagePanel}></Route>
          <Redirect from="*" to="/welcome"></Redirect>
        </Switch>
    )
  }
}

export default withStyles(styles)(ContentPanel);