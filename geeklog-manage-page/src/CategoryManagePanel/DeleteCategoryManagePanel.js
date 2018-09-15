import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  // Typography,
  withStyles,
} from '@material-ui/core'
// import classNames from 'classnames'
import TitleBar from '../utils/TitleBar'
import MsgBar from '../utils/MsgBar'
import CategorySelecter from '../utils/CategorySelecter';
import DeleteCategoryForm from './DeleteCategoryForm';

const styles = theme => ({

});

class DeleteCategoryManagePanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }

  state = {
    message: '',
    messageDisplay: false,
    categoryId: '',
  }

  handleChangeMessage = (message) => {
    this.setState({
      message: message,
      messageDisplay: true,
    })
  }

  handleChangeArticleCategory = (categoryId) => {
    this.setState({
      categoryId: String(categoryId),
    })
  }

  render() {
    const { token } = this.props;
    const { message, messageDisplay, categoryId } = this.state;

    return (
      <div>
        <TitleBar title="删除分类" />
        <CategorySelecter
          token={token}
          onChangeArticleCategory={this.handleChangeArticleCategory}
          categoryId={categoryId}
        />
        <DeleteCategoryForm
          token={token}
          categoryId={categoryId}
          onChangeMessage={this.handleChangeMessage}
        />
        <MsgBar message={message} display={messageDisplay} />
      </div>
    )
  }
}

export default withStyles(styles)(DeleteCategoryManagePanel);