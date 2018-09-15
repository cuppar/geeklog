import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  // Typography,
  withStyles,
} from '@material-ui/core'
// import classNames from 'classnames'
import TitleBar from '../utils/TitleBar'
import MsgBar from '../utils/MsgBar'
import AddCategoryForm from './AddCategoryForm'

const styles = theme => ({

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
    const { token } = this.props;
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