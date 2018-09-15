import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  // Typography,
  withStyles,
} from '@material-ui/core'
// import classNames from 'classnames'
import ModifyCategoryForm from './ModifyCategoryForm'
import TitleBar from '../utils/TitleBar'
import MsgBar from '../utils/MsgBar'
import CategorySelecter from '../utils/CategorySelecter'

const styles = theme => ({

});

class ModifyCategoryManagePanel extends Component {
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
        <TitleBar title="编辑分类" />
        <CategorySelecter
          categoryId={String(categoryId)}
          onChangeArticleCategory={this.handleChangeArticleCategory}
          token={token}
        />
        {
          !categoryId
            ? <div></div>
            :
            <ModifyCategoryForm
              onChangeMessage={this.handleChangeMessage}
              token={token}
              categoryId={categoryId}
            />
        }
        <MsgBar
          message={categoryId ? message : '请选择文章分类'}
          display={categoryId ? messageDisplay : true}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ModifyCategoryManagePanel);