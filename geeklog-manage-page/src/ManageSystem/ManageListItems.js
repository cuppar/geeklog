import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Divider, ListItem,
  ListItemIcon, ListItemText, Collapse, List,
} from '@material-ui/core';
import {
  AccountBox, CollectionsBookmark, AddBox, Delete,
  Drafts, ExpandLess, ExpandMore, Favorite
} from '@material-ui/icons'
import { Pencil } from 'mdi-material-ui';
import {
  Link,
} from 'react-router-dom'

// type verify
const propTypes = {
  classes: PropTypes.object.isRequired
};

// css
const styles = theme => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  link: {
    textDecoration: "none"
  }
});

// manage list items
// author: hezhiying
// time: 2018-9-10
class ManageListItems extends Component {
  state = {
    // centent manage list item open or close
    contentSubListOpen: false,
    selectedIndex: 0
  };

  toggleChildList = () => {
    this.setState(state => ({ contentSubListOpen: !state.contentSubListOpen }))
  };

  handleListItemClick = (e, index) => {
    this.setState({
      selectedIndex: index,
    })
  }

  render() {
    // style's class names
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Divider />

        {/* welcome list item */}
        <Link
          className={classes.link}
          to="/welcome">
          <ListItem
            selected={this.state.selectedIndex === 0}
            onClick={e => this.handleListItemClick(e, 0)}
            button>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="欢迎使用"></ListItemText>
          </ListItem>
        </Link>
        <Divider />

        {/* user manage list item */}
        <Link
          className={classes.link}
          to='/user-manage'>
          <ListItem
            selected={this.state.selectedIndex === 1}
            onClick={e => this.handleListItemClick(e, 1)}
            button>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="用户管理"></ListItemText>
          </ListItem>
        </Link>
        <Divider />

        {/* category manage list items */}
        <ListItem
          button
          onClick={this.toggleChildList}>
          <ListItemIcon>
            <CollectionsBookmark />
          </ListItemIcon>
          <ListItemText primary="分类管理"></ListItemText>
          {this.state.contentSubListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        {/* children list */}
        <Collapse in={this.state.contentSubListOpen} timeout="auto">
          <List component="div" disablePadding>

            {/* add category */}
            <Divider />
            <Link
              className={classes.link}
              to="/category-manage/add">
              <ListItem
                selected={this.state.selectedIndex === 2}
                onClick={e => this.handleListItemClick(e, 2)}
                button
                className={classes.nested}>
                <ListItemIcon>
                  <AddBox />
                </ListItemIcon>
                <ListItemText primary="添加分类" />
              </ListItem>
            </Link>

            {/* modify category */}
            <Divider />
            <Link
              className={classes.link}
              to="/category-manage/modify">
              <ListItem
                selected={this.state.selectedIndex === 3}
                onClick={e => this.handleListItemClick(e, 3)}
                button
                className={classes.nested}>
                <ListItemIcon>
                  <Pencil />
                </ListItemIcon>
                <ListItemText primary="编辑分类" />
              </ListItem>
            </Link>

            {/* delete category */}
            <Divider />
            <Link
              className={classes.link}
              to="/category-manage/delete">
              <ListItem
                selected={this.state.selectedIndex === 4}
                onClick={e => this.handleListItemClick(e, 4)}
                button
                className={classes.nested}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary="删除分类" />
              </ListItem>
            </Link>

            <Divider />
          </List>
        </Collapse>
        <Divider />

        {/* article manage list item */}
        <Link
          className={classes.link}
          to="/article-manage">
          <ListItem
            selected={this.state.selectedIndex === 5}
            onClick={e => this.handleListItemClick(e, 5)}
            button>
            <ListItemIcon>
              <Drafts />
            </ListItemIcon>
            <ListItemText primary="内容管理"></ListItemText>
          </ListItem>
        </Link>
        <Divider />
      </React.Fragment>
    );
  }
}


ManageListItems.propTypes = propTypes;


export default withStyles(styles)(ManageListItems);
