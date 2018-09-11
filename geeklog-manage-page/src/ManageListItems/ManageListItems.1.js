import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Divider, ListItem,
  ListItemIcon, ListItemText, Collapse, List,
} from '@material-ui/core';
import {
  AccountBox, CollectionsBookmark, AddBox, Delete,
  Drafts, ExpandLess, ExpandMore
} from '@material-ui/icons'
import { Pencil } from 'mdi-material-ui';

// type verify
// const propTypes = {
//   classes: PropTypes.object.isRequired
// };

// // css
// const styles = theme => ({
//   root: {
//     color: theme.palette.primary.main,
//     backgroundColor: theme.palette.background.paper,
//   },
//   nested: {
//     paddingLeft: theme.spacing.unit * 4,
//   },
// });

// manage list items
// author: hezhiying
// time: 2018-9-10
const ManageListItems = (
  // state = {
  //   // centent manage list item open or close
  //   contentSubListOpen: false,
  //   selectedIndex: -1
  // };

  // toggleChildList = () => {
  //   this.setState(state => ({ contentSubListOpen: !state.contentSubListOpen }))
  // };

  // handleListItemClick = (e, index) => {
  //   this.setState({
  //     selectedIndex: index,
  //   })
  // }

  // render() {
  //   // style's class names
  //   const { classes } = this.props;

  //   return (
  <div>

    {/* user manage list item */}
    <ListItem
      // selected={this.state.selectedIndex === 0}
      // onClick={e => this.handleListItemClick(e, 0)}
      button
    >
      <ListItemIcon>
        <AccountBox />
      </ListItemIcon>
      <ListItemText primary="用户管理"></ListItemText>
    </ListItem>

    {/* category manage list items */}
    <ListItem
      // selected={this.state.selectedIndex === 1}
      button
    // onClick={this.toggleChildList}
    >
      <ListItemIcon>
        <CollectionsBookmark />
      </ListItemIcon>
      <ListItemText primary="分类管理"></ListItemText>
      {/* {this.state.contentSubListOpen ? <ExpandLess /> : <ExpandMore />} */}
    </ListItem>

    {/* children list */}
    <Collapse
    // in={this.state.contentSubListOpen} 
    // timeout="auto"
    >
      <List component="div" disablePadding>

        {/* add category */}
        <ListItem
          // selected={this.state.selectedIndex === 2}
          // onClick={e => this.handleListItemClick(e, 2)}
          button
        // className={classes.nested}
        >
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          <ListItemText primary="添加分类" />
        </ListItem>

        {/* modify category */}
        <ListItem
          // selected={this.state.selectedIndex === 3}
          // onClick={e => this.handleListItemClick(e, 3)}
          button
        // className={classes.nested}
        >
          <ListItemIcon>
            <Pencil />
          </ListItemIcon>
          <ListItemText primary="编辑分类" />
        </ListItem>

        {/* delete category */}
        <ListItem
          // selected={this.state.selectedIndex === 4}
          // onClick={e => this.handleListItemClick(e, 4)}
          button
        // className={classes.nested}
        >
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="删除分类" />
        </ListItem>
      </List>
    </Collapse>

    {/* content manage list item */}
    <ListItem
      // selected={this.state.selectedIndex === 5}
      // onClick={e => this.handleListItemClick(e, 5)}
      button>
      <ListItemIcon>
        <Drafts />
      </ListItemIcon>
      <ListItemText primary="内容管理"></ListItemText>
    </ListItem>
  </div>
);

// ManageListItems.propTypes = propTypes;


export default ManageListItems;
