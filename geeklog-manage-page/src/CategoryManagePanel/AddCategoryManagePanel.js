import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import classNames from 'classnames'
import TitleBar from '../utils/TitleBar'
import MsgBar from '../utils/MsgBar'
import AddCategoryForm from './AddCategoryForm'

const styles = theme => ({
  root: {
    color: "red"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0000ff",
    },
    secondary: {
      main: "#FE6B8B",
    }
  }
});

class AddCategoryManagePanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }

  state = {
    message: '',
    messageDisplay: false,
  }

  handleChangeMessage = (message) => {
    this.setState({
      message: message,
      messageDisplay: true,
    })
  }

  render() {
    const { classes, token } = this.props;
    const { message, messageDisplay } = this.state;

    return (
      <div>
        <TitleBar title="添加分类" />
        <AddCategoryForm
          onChangeMessage={this.handleChangeMessage}
          token={token}
        />
        <MsgBar message={message} display={messageDisplay} />
      </div>
    )
  }
}

export default withStyles(styles)(AddCategoryManagePanel);