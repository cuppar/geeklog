import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, MuiThemeProvider,
  Typography, createMuiTheme, Button,
  withStyles, IconButton, List, Drawer,
  CssBaseline
} from '@material-ui/core';
import {
  Menu, ChevronLeft
} from '@material-ui/icons'
import ManageListItems from './ManageListItems'
import classNames from 'classnames';
import PanelContainer from '../PanelContainer/PanelContainer';
import LoginDialog from './LoginDialog';


// left menu opened width
const drawerWidth = 240;

// type verify
const propTypes = {
  classes: PropTypes.object.isRequired
};

// css
const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hidden: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharpManageListItems,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 8,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 10
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  loginButton: {
    fontSize: 20,
  },
  logoutButton: {
    fontSize: 20,
  },
  link: {
    textDecoration: "none"
  },
});

const theme = createMuiTheme({

});

// manage system main UI
// author: hezhiying
// time: 2018-9-10
class ManageSystem extends Component {
  state = {
    drawerOpen: true,
    login: false,
    loginDialogOpen: false,
    username: null,
    token: '', // logined user token 
    loginMessage: '请先登录，才能使用相关博客系统管理功能。', // login tips message (ok, fail, username or password err etc.)
  }

  handleDrawerOpen = () => {
    this.setState({
      drawerOpen: true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      drawerOpen: false,
    });
  };

  handleLoginDialogOpen = () => {
    this.setState({
      loginDialogOpen: true
    });
  }

  handleLoginDialogClose = () => {
    this.setState({
      loginDialogOpen: false
    });
  }

  handleLogin = (username, token) => {
    this.setState({
      login: true,
      username: username,
      token: token,
    });
  };

  handleLogout = () => {
    this.setState({
      login: false,
      username: null,
      token: '',
      loginMessage: '请先登录，才能使用相关博客系统管理功能。', // login tips message (ok, fail, username or password err etc.)
    });
  };

  handleLoginMessage = msg => {
    this.setState({
      loginMessage: msg,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <MuiThemeProvider theme={theme}>
            {/* header bar */}
            <AppBar
              position="absolute"
              className={classNames(
                classes.appBar,
                this.state.drawerOpen && classes.appBarShift
              )}
            >
              <Toolbar
                disableGutters={!this.state.drawerOpen}
                className={classes.toolbar}
              >

                {/* menu icon button */}
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.drawerOpen && classes.hidden
                  )}
                >
                  <Menu />
                </IconButton>

                {/* title */}
                <Typography
                  variant="title"
                  color="inherit"
                  noWrap
                  className={classes.grow}
                >
                  Geeklog 管理系统
                </Typography>

                {/* login / logout button */}
                <Button
                  color="inherit"
                  onClick={this.handleLoginDialogOpen}
                  className={classNames({
                    [classes.loginButton]: true,
                    [classes.hidden]: this.state.login,
                  })}
                >
                  登录
                </Button>
                <Button
                  color="inherit"
                  onClick={this.handleLogout}
                  className={classNames({
                    [classes.logoutButton]: true,
                    [classes.hidden]: !this.state.login,
                  })}
                >
                  注销
                </Button>
              </Toolbar>
            </AppBar>

            {/* login dialog */}
            <LoginDialog
              onLogin={this.handleLogin}
              open={this.state.loginDialogOpen}
              onLoginDialogClose={this.handleLoginDialogClose}
              onLoginMessage={this.handleLoginMessage}
            />

            {/* left opened menu */}
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !this.state.drawerOpen && classes.drawerPaperClose
                )
              }}
              open={this.state.drawerOpen}
            >
              <div className={classes.toolbarIcon}>
                <IconButton
                  onClick={this.handleDrawerClose}
                >
                  <ChevronLeft />
                </IconButton>
              </div>
              <List>
                <ManageListItems
                  login={this.state.login}
                />
              </List>
            </Drawer>

            {/* right main panel */}
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <PanelContainer
                login={this.state.login}
                username={this.state.username}
                loginMessage={this.state.loginMessage}
                token={this.state.token}
              />
            </main>
          </MuiThemeProvider>
        </div>
      </React.Fragment>
    );
  }
}


ManageSystem.propTypes = propTypes;


export default withStyles(styles)(ManageSystem);

