import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import WelcomeManagePanel from '../WelcomeManagePanel/WelcomeManagePanel';
import UserManagePanel from '../UserManagePanel/UserManagePanel';
import AddCategoryManagePanel from '../CategoryManagePanel/AddCategoryManagePanel';
import ModifyCategoryManagePanel from '../CategoryManagePanel/ModifyCategoryManagePanel';
import DeleteCategoryManagePanel from '../CategoryManagePanel/DeleteCategoryManagePanel';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import ContentManagePanel from './ContentManagePanel';


const styles = theme => ({

});

class PanelContainer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    login: PropTypes.bool.isRequired,
    username: PropTypes.string,
    loginMessage: PropTypes.string,
    token: PropTypes.string.isRequired,
  }

  render() {
    let container;

    if (!this.props.login) {
      container = (
        <Switch>
          <Route
            path="/welcome"
            render={props => (
              <WelcomeManagePanel
                username={this.props.username}
                loginMessage={this.props.loginMessage}
                login={this.props.login}
                token={this.props.token}
              />
            )}></Route>
          <Redirect to="/welcome"></Redirect>
        </Switch>
      );
    } else {
      container = (
        <Switch>
          <Route
            path="/welcome"
            render={props => (
              <WelcomeManagePanel
                username={this.props.username}
                loginMessage={this.props.loginMessage}
                login={this.props.login} />
            )}></Route>
          <Route
            path="/user-manage"
            render={props => (
              <UserManagePanel
                token={this.props.token} />
            )}></Route>
          <Route
            path="/category-manage/add"
            render={props => (
              <AddCategoryManagePanel
                token={this.props.token} />
            )}></Route>
          <Route
            path="/category-manage/modify"
            render={props => (
              <ModifyCategoryManagePanel
                token={this.props.token} />
            )}></Route>
          <Route
            path="/category-manage/delete"
            render={props => (
              <DeleteCategoryManagePanel
                token={this.props.token} />
            )}></Route>
          <Route
            path="/content-manage"
            render={props => (
              <ContentManagePanel
                token={this.props.token} />
            )}
          ></Route>
          <Redirect from="*" to="/welcome"></Redirect>
        </Switch>
      );
    }
    return container;
  }
}

export default withStyles(styles)(PanelContainer);