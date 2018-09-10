import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Divider, ListItem,
  ListItemIcon, ListItemText, Collapse, List,
  createMuiTheme, MuiThemeProvider
} from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import {
  AccountBox, CollectionsBookmark, AddBox, Delete,
  Drafts, ExpandLess, ExpandMore
} from '@material-ui/icons'
import { Pencil } from 'mdi-material-ui';

// type verify
const propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    color: theme.palette.primary.main
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

// manage list items
// author: hezhiying
// time: 2018-9-10
class ManageListItems extends Component {
  state = {
    // centent manage list item open or close
    contentListItemOpen: false
  };

  toggleChildList = () => {
    this.setState(state => ({ contentListItemOpen: !state.contentListItemOpen }))
  };

  render() {
    // style's class names
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Divider />

          {/* user manage list item */}
          <ListItem button>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="用户管理"></ListItemText>
          </ListItem>
          <Divider />

          {/* category manage list items */}
          <ListItem button onClick={this.toggleChildList}>
            <ListItemIcon>
              <CollectionsBookmark />
            </ListItemIcon>
            <ListItemText primary="分类管理"></ListItemText>
            {this.state.contentListItemOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          {/* children list */}
          <Collapse in={this.state.contentListItemOpen} timeout="auto">
            <List component="div" disablePadding>

              {/* add category */}
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AddBox />
                </ListItemIcon>
                <ListItemText primary="添加分类" />
              </ListItem>

              {/* modify category */}
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Pencil />
                </ListItemIcon>
                <ListItemText primary="编辑分类" />
              </ListItem>

              {/* delete category */}
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary="删除分类" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />

          {/* content manage list item */}
          <ListItem button>
            <ListItemIcon>
              <Drafts />
            </ListItemIcon>
            <ListItemText primary="内容管理"></ListItemText>
          </ListItem>
          <Divider />
        </div>
      </MuiThemeProvider>
    );
  }
}


ManageListItems.propTypes = propTypes;


export default withStyles(styles)(ManageListItems);
